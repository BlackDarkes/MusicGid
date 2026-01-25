import { Link } from "react-router";
import { Edit, Eye, Trash2 } from "lucide-react";
import { Button, buttonVariants } from "@/shared/ui/button";
import type { ReactNode } from "react";

interface IProductLinksProps {
  id: string
}
  
export const ProductLinks = ({ id }: IProductLinksProps): ReactNode => {
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

      <Button
        variant={"outline"}
        size={"icon"}
        className="text-destructive cursor-pointer"
        onClick={() => console.log("Удалить продукт: ", id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </>
  );
}