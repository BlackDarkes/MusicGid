import { cn } from "@/shared/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

interface ICustomPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  className?: string;
}

export const CustomPagination = ({
  page,
  totalPages,
  onPageChange,
  isLoading,
  className,
}: ICustomPaginationProps) => {
  if (totalPages <= 10) return null;

  console.log(totalPages)

  return (
    <Pagination
      className={`${cn("justify-end")} ${className ? className : ""}`}
    >
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`
              ${cn("cursor-pointer")}
              ${(page <= 1 || isLoading) && "pointer-events-none opacity-50"}
            `}
            onClick={() => onPageChange(page - 1)}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink isActive className="cursor-default">
            {page}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            className={`
              ${cn("cursor-pointer")}
              ${(page > totalPages || isLoading) && "pointer-events-none opacity-50"}
            `}
            onClick={() => onPageChange(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
