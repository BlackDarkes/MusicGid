import {
  ProductTable,
  ProductTableSkeleton,
  useProducts,
} from "@/entities/product";
import { CustomPagination } from "@/shared/ui";
import { useState } from "react";

export const ProductList = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isPending, isPlaceholderData } = useProducts({
    page,
    limit: 10,
  });

  const showSkeleton = isPending && !isPlaceholderData;

  if (showSkeleton) return <ProductTableSkeleton />;

  return (
    <div className="flex flex-col gap-4">
      <div className={isPlaceholderData ? "opacity-50" : ""}>
        <ProductTable products={data?.products || []} />
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Всего: {data?.pagination.total}
        </p>

        <CustomPagination
          page={page}
          totalPages={data?.pagination.total || 1}
          onPageChange={setPage}
          isLoading={isPlaceholderData}
        />
      </div>
    </div>
  );
};
