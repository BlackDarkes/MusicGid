import { Link } from "react-router";

export const ProductsPage = () => {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-[clamp(24px,4vw,32px)]">Товары</h2>
        <Link to={"create"}>Добавить</Link>
      </div>
    </>
  );
}