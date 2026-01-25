import type { ReactNode } from "react";
import type { IProduct } from "../../model/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui";
interface IProductTableProps {
  products: IProduct[] | [];
  renderAction?: (product: IProduct) => ReactNode;
}
  
export const ProductTable = ({ products, renderAction }: IProductTableProps) => {
  console.log(products);
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[25%]">Название</TableHead>
            <TableHead className="w-[25%] text-center">Цена</TableHead>
            <TableHead className="w-[25%] text-center">Количество</TableHead>
            { renderAction && <TableHead className="w-[25%] text-right">Действия</TableHead> }
          </TableRow>
        </TableHeader>
        
        <TableBody>
          { products && products.length ? (
            products.map((product) => (
              <TableRow>
                <TableCell className="mr-auto">{ product.name }</TableCell>
                <TableCell className="mx-auto">{ product.price } ₽</TableCell>
                <TableCell className=" mx-auto">{ product.count }</TableCell>
                { renderAction && <TableCell className="ml-auto">{ renderAction(product) }</TableCell> }
              </TableRow>
          ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                Продукты не найдены.
              </TableCell>
            </TableRow>
          ) }
        </TableBody>
      </Table>
    </div>
  );
}