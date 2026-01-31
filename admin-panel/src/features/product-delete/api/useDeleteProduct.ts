import { productApi } from "@/entities/product/api/productApi"
import { queryClient } from "@/libs/queryClient"
import { useMutation } from "@tanstack/react-query"

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: (id: string) => productApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    }
  })
}