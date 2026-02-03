// "use server";
import { apiFetch } from "@/services/apiInstance";
import { generalStore } from "@/store/generalStore";
import { handleResponse } from "./services/handleResponse";
import { checkRateLimit } from "./lib/ratelimit";

export async function GET_PROJECTS() {
  generalStore.getState().updateGeneral({ loadingKey: "projects" });
  const response = await apiFetch("/projects", {
    method: "GET",
    next: {
      tags: ["projects"],
      revalidate: 60,
    },
  });
  return handleResponse({ response });
}


export async function REGISTER({ data }: { data: any }) {
  generalStore.getState().updateGeneral({ loadingKey: "register" });

  const ratelimitResponse = await checkRateLimit({
    virtualEndpoint: "register",
    email: data?.email,
  });
  if (ratelimitResponse) return handleResponse({ response: ratelimitResponse });

  const response = await apiFetch("/register", {
    method: "POST",
    body: data,
    next: {
      tags: ["register"],
      revalidate: 60,
    },
  });

  return handleResponse({ response });
}
