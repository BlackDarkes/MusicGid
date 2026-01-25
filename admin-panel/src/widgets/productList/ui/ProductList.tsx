/* eslint-disable @typescript-eslint/no-unused-vars */

import { ProductTable, ProductTableSkeleton, useProducts } from "@/entities/product";
import { useState } from "react";

export const ProductList = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isPending, isPlaceholderData } = useProducts({ page, limit: 10 });

  const showSkeleton = isPending && !isPlaceholderData;

  if (showSkeleton) return <ProductTableSkeleton />

  return (
    <div className="flex flex-col gap-4">
      <div className={isPlaceholderData ? "opacity-50" : ""}>
        <ProductTable products={data?.products || []} />
      </div>
    </div>
  );
}