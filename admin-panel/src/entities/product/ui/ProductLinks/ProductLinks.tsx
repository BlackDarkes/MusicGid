import { Link } from "react-router";
import { Edit, Eye } from "lucide-react";
import {  buttonVariants } from "@/shared/ui/button";
import type { ReactNode } from "react";

interface IProductLinksProps {
  id: string;
  buttons?: ReactNode;
}
  
export const ProductLinks = ({ id, buttons }: IProductLinksProps): ReactNode => {
  return (
    <>
      <Link
        to={`/admin/products/${id}`}
        className={buttonVariants({ variant: "outline", size: "icon" })}
      >
        <Eye className="h-4 w-4" />
      </Link>

      <Link
        to={`/admin/products/edit/${id}`}
        className={buttonVariants({ variant: "outline", size: "icon" })}
      >
        <Edit className="h-4 w-4" />
      </Link>

      { buttons }
    </>
  );
}