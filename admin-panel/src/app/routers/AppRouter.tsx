import { createBrowserRouter, Navigate, redirect } from "react-router";
import { BaseLayout } from "../layouts/BaseLayout";
import { AccountPage, HomePage, LoginPage, ProductsPage, UsersPage } from "@/pages/index";
import { useAuthStore } from "@/features/login";

const loginLoader = async () => {
  const store = useAuthStore.getState();

  if (store.isAuth) return redirect("/admin");
  
  return null;
};

const adminLoader = async () => {
  const store = useAuthStore.getState();
  
  if (store.isAuth) return null;

  const isOk = await store.fetchUser();
  
  if (!isOk) {
    return redirect("/admin/login");
  }
  return null;
};

export const AppRouter = createBrowserRouter([
  {
    loader: loginLoader,
    HydrateFallback: () => <div>Загрузка...</div>,
    path: "/admin/login",
    element: <LoginPage />
  },
  {
    path: "/admin",
    loader: adminLoader,
    HydrateFallback: () => <div>Загрузка...</div>,
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
    element: <Navigate to={"/admin/login"} replace /> 
  }
])