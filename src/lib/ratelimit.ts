"use server";

import redis from "./redis";
import { cookies, headers } from "next/headers";

const WINDOW_SIZE = 60 * 60; // 1 hour
const MAX_REQUESTS = 3;
// const MAX_REQUESTS = 3000;

export async function isRateLimited(
    signature: string,
    virtualEndpoint: string,
    email?: string
) {
    const key = `market_place_admin_panel:ratelimit:${virtualEndpoint}:${signature}:${email || "no-email"}`;

    try {
        // First request → set the key if not existing
        const set = await redis.set(key, 1, "EX", WINDOW_SIZE, "NX");
        if (set === "OK") return false;

        // Already exists → increment
        const current = await redis.incr(key);

        return current > MAX_REQUESTS;
    } catch (err) {
        console.error("Redis error:", err);
        return true; // block on failure for safety
    }
}

export async function getRateLimitResponse() {
    const cookieStore = await cookies();
    const lang = cookieStore.get("lang")?.value || "ar";

    const messages = {
        en: "Something went wrong please try again later.",
        ar: "حدث خطأ، برجاء المحاولة لاحقاً.",
    };

    return {
        success: false,
        message: messages[lang as keyof typeof messages] || messages.en,
        status: 429,
    };
}

export async function checkRateLimit({
    virtualEndpoint,
    email,
}: {
    virtualEndpoint: string;
    email?: string;
}) {
    const headersList = await headers();
    const signature =
        headersList.get("x-browser-signature") ||
        headersList.get("user-agent") ||
        "unknown";

    const blocked = await isRateLimited(signature, virtualEndpoint, email);

    if (blocked) {
        return await getRateLimitResponse();
    }

    return null;
}
