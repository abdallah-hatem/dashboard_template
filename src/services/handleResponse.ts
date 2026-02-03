// import { generalStore } from "../store/generalStore";
import { toast } from "react-toastify";

interface HandleResponseProps {
  response: any;
  showErrorToast?: boolean;
  showSuccessToast?: boolean;
}

// Flag to prevent multiple logout calls
let isLoggingOut = false;

export const handleResponse = async ({
  response,
  showErrorToast = true,
  showSuccessToast = true,
}: HandleResponseProps) => {
  if (response.unauthorized) {
    if (typeof window !== "undefined") {
      window.location.href = "/api/auth/deleteCookie";
    }
  }

  if (typeof window === "undefined") {
    return response;
  }


  // Show success toast
  if (response.success && showSuccessToast && response.message) {
    toast.success(response.message);
  }

  // Show error toast
  if (!response.success && showErrorToast) {
    const errorMessage =
      response.message || response.body?.message || "An error occurred";
    toast.error(errorMessage);
  }


  // Only logout on 401 if it's a clear authentication error and we're not already logging out
  if (response.status === 401 && !isLoggingOut) {
  }

  // generalStore.getState().setGeneral({ loadingKey: "" });

  return response;
};
