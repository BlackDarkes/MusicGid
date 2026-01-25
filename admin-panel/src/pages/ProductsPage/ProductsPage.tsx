import { ProductList } from "@/widgets/productList";
import { Link } from "react-router";

export const ProductsPage = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-[clamp(24px,4vw,32px)]">Товары</h2>
        <Link className="text-card-foreground hover:text-card-foreground/70" to={"create"}>Добавить</Link>
      </div>

      <ProductList />
    </div>
  );
}