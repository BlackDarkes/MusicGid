import type { IFilterProduct } from "@/libs/api/types"
import { useQuery } from "@tanstack/react-query"
import { productApi } from "./productApi"

export const useProducts = (filter: IFilterProduct) => {
  return useQuery({
    queryKey: ["products", filter],
    queryFn: ({ signal }) => productApi.getAll(filter, signal),
    placeholderData: (prevData) => prevData // Чтобы таблица не моргала
  })
}