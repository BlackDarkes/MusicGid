import { createApiClient } from "@/libs/api"
import { useMemo } from "react"

export const useApi = () => {
  const api = useMemo(() => createApiClient(), []);

  return api;
}