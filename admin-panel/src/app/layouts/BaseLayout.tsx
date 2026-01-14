import { Header } from "@/widgets/header/ui/Header";
import { Outlet } from "react-router";

export const BaseLayout = () => {
  return (
    <>
      <Header />
      
      <main>
        <Outlet />
      </main>
    </>
  );
}