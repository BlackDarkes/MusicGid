import { API_ENDPOINTS } from "../config/endpoints";
import { createAuthClient } from "./auth";
import { createBaseClient } from "./baseClient";

const createApiClient = () => {
  const baseClient = createBaseClient();

  return {
    auth: createAuthClient(),

    products: {
      all: baseClient.get(API_ENDPOINTS.products.all),
    }
  };
};


export type TypeApiClient = ReturnType<typeof createApiClient>;
export { createApiClient, createAuthClient, createBaseClient };