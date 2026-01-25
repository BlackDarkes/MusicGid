import { Skeleton, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui";

interface IProductTableSkeletonProps {
  rows?: number;
}

export const ProductTableSkeleton = ({
  rows = 5,
}: IProductTableSkeletonProps) => {
  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead><Skeleton className="h-4 w-24 mr-auto" /></TableHead>
              <TableHead><Skeleton className="h-4 w-24 mx-auto" /></TableHead>
              <TableHead><Skeleton className="h-4 w-24 mx-auto" /></TableHead>
              <TableHead><Skeleton className="h-4 w-24 ml-auto" /></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            { Array.from({ length: rows }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-5 w-20 mr-auto" /></TableCell>
                <TableCell><Skeleton className="h-5 w-20 mx-auto" /></TableCell>
                <TableCell><Skeleton className="h-5 w-20 mx-auto" /></TableCell>
                <TableCell><Skeleton className="h-5 w-20 ml-auto" /></TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </div>
    </>
  );
};
