import { createAuthClient } from "./auth";
import { createBaseClient } from "./base";

export const createApiClient = () => {
  const baseClient = createBaseClient();

  return {
    auth: createAuthClient(),

    user: {
      getProfile: () => baseClient.get("/user"),
    },

    base: baseClient,
  };
};

export type ApiClient = ReturnType<typeof createApiClient>;
export { createAuthClient, createBaseClient };