import type {
  IFilterProduct,
  IMessageResponse,
  IProductData,
} from "@/libs/api/types";
import type { IProduct, IProductResponse } from "../model/types";
import { apiClient } from "@/libs/api";

const extractData = <T>(promise: Promise<{ data: T }>) =>
  promise.then((res) => res.data);

export const productApi = {
  getAll: async (
    filter: IFilterProduct,
    signal?: AbortSignal,
  ): Promise<IProductResponse> => {
    // Искусственная задержка
    await new Promise((resolve) => setTimeout(resolve, 700));
    return extractData(apiClient.products.getAll(filter, { signal }));
  },

  getById: async (id: number, signal?: AbortSignal): Promise<IProduct> =>
    extractData(apiClient.products.getById(id, { signal })),

  getByCategory: async (
    category: string,
    signal?: AbortSignal,
  ): Promise<IProduct[]> =>
    extractData(apiClient.products.getByCategory(category, { signal })),

  getByBrand: async (
    brand: string,
    signal?: AbortSignal,
  ): Promise<IProduct[]> =>
    extractData(apiClient.products.getByBrand(brand, { signal })),
  create: async (data: IProductData): Promise<IMessageResponse> =>
    extractData(apiClient.products.create(data, )),

  update: async (id: string, data: IProductData) =>
    extractData(apiClient.products.update(id, data)),

  delete: async (id: string) => extractData(apiClient.products.delete(id)),
};
