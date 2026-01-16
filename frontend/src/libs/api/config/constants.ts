export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  TIMEOUT: 30000,
  MAX_RETRIES: 3,
  // VERSION: "v1" Для версионизации
} as const;