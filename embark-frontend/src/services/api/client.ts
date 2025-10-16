import axios, { AxiosError } from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { API_CONFIG } from "./config";

/**
 * Create and configure axios instance
 */
function createApiClient(): AxiosInstance {
  const client = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: API_CONFIG.HEADERS,
  });

  // Request interceptor
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Add timestamp to request
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    (error: AxiosError) => {
      console.error("[API] Request error:", error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  client.interceptors.response.use(
    (response) => {
      console.log(
        `[API] Response from ${response.config.url}:`,
        response.status
      );
      return response;
    },
    (error: AxiosError) => {
      if (error.response) {
        // Server responded with error status
        console.error(
          "[API] Response error:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        // Request made but no response
        console.error("[API] No response received:", error.request);
      } else {
        // Error in request setup
        console.error("[API] Request setup error:", error.message);
      }
      return Promise.reject(error);
    }
  );

  return client;
}

// Export singleton instance
export const apiClient = createApiClient();

/**
 * Generic error handler for API calls
 */
export function handleApiError(error: unknown, fallbackMessage: string): never {
  if (axios.isAxiosError(error)) {
    const message =
      error.response?.data?.detail || error.message || fallbackMessage;
    throw new Error(message);
  }

  if (error instanceof Error) {
    throw error;
  }

  throw new Error(fallbackMessage);
}
