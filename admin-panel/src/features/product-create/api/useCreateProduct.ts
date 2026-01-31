import { useMutation } from "@tanstack/react-query";
import { productApi } from "@/entities/product/api/productApi";
import type { TypeCreateProductSchema } from "../model/schema";
import { queryClient } from "@/libs/queryClient";

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: (data: TypeCreateProductSchema) => productApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    }
  })
}