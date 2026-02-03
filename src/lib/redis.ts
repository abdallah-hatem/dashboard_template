import Redis from "ioredis";

declare global {
    var redis: Redis | undefined;
}

let redis: Redis;

if (!global.redis) {
    global.redis = new Redis(process.env.REDIS_URL || "redis://127.0.0.1:6379/0");

    global.redis.on("error", (err) => console.error("Redis error:", err));
    global.redis.on("connect", () => console.log("Redis connected"));
    global.redis.on("ready", () => console.log("Redis ready"));
    global.redis.on("close", () => console.log("Redis connection closed"));
    global.redis.on("reconnecting", () => console.log("Redis reconnecting"));
}

redis = global.redis;

export default redis;
