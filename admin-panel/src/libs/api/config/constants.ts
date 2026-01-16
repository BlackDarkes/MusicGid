import { ENV } from "@/shared/config";

export const API_CONFIG = {
  base_url: ENV.VITE_API_URL,
  timeout: 30000,
  max_retries: 3,
  // version: "v1" Для версионизации
}