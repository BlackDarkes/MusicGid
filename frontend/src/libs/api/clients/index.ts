import { API_ENDPOINTS } from "../config/endpoints";
import { createAuthClient } from "./auth";
import { createBaseClient } from "./base";

const createApiClient = () => {
  const baseClient = createBaseClient();

  return {
    auth: createAuthClient(),

    user: {
      getProfile: () => baseClient.get(API_ENDPOINTS.USERS.PROFILE),
    },

    cart: {
      get: () => baseClient.get(API_ENDPOINTS.CART.BASE),
    },

    comments: {
      getAll: (productId?: string) => baseClient.get(
        API_ENDPOINTS.COMMENTS.BASE,
        productId ? { params: { productId } } : undefined,
      )
    },

    product: {
      getAll: () => baseClient.get(API_ENDPOINTS.PRODUCT.BASE),
      getById: (id: string) => baseClient.get(
        API_ENDPOINTS.PRODUCT.ITEM.replace(":id", id),
      )
    },

    category: {
      getAll: () => baseClient.get(API_ENDPOINTS.CATEGORY.BASE),
    },
    
    brand: {
      getAll: () => baseClient.get(API_ENDPOINTS.BRANDS.BASE),
    },

    order: {
      getAll: () => baseClient.get(API_ENDPOINTS.ORDER.BASE),
      getById: (id: string) => baseClient.get(
        API_ENDPOINTS.ORDER.ITEM.replace(":id", id),
      )
    },

    base: baseClient,
  };
};

const apiClient = createApiClient();

export type TypeApiClient = ReturnType<typeof createApiClient>;
export { createApiClient, apiClient, createAuthClient, createBaseClient };