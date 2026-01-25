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
            <TableHead>Название</TableHead>
            <TableHead>Цена</TableHead>
            <TableHead>Количество</TableHead>
            { renderAction && <TableHead>Действия</TableHead> }
          </TableRow>
        </TableHeader>
        
        <TableBody>
          { products && products.length ? (
            products.map((product) => (
              <TableRow>
                <TableCell>{ product.name }</TableCell>
                <TableCell>{ product.price } ₽</TableCell>
                <TableCell>{ product.count }</TableCell>
                { renderAction && <TableCell>{ renderAction(product) }</TableCell> }
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