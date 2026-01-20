import { Header } from "@/widgets/header/ui/Header";
import { Outlet } from "react-router";

export const BaseLayout = () => {
  return (
    <>
      <Header />
      
      <main className="mx-auto pt-15 w-[min(100%-40px,1440px)]">
        <Outlet />
      </main>
    </>
  );
}