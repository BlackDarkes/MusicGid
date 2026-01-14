import { createBrowserRouter, Navigate } from "react-router";
import { BaseLayout } from "../layouts/BaseLayout";
import { AccountPage, HomePage, LoginPage, ProductsPage, UsersPage } from "@/pages/index";

export const AppRouter = createBrowserRouter([
  {
    index: true,
    path: "/admin/login",
    element: <LoginPage />
  },
  {
    path: "/admin",
    element: <BaseLayout />,
    children: [
      {
        path: "",
        element: <HomePage />
      },
      {
        path: "account",
        element: <AccountPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      }
    ]
  },
  {
    path: "/",
    element: <Navigate to={"/admin/login"} /> 
  }
])