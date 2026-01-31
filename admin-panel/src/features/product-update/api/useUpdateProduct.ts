import { useMutation } from "@tanstack/react-query";
import { productApi } from "@/entities/product/api/productApi";
import type { TypeUpdateProductSchema } from "../model/schema";
import { queryClient } from "@/libs/queryClient";

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: (data: TypeUpdateProductSchema) => productApi.update(data.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  })
}