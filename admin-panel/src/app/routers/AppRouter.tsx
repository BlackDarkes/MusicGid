import { createBrowserRouter, Navigate, redirect } from "react-router";
import { BaseLayout } from "../layouts/BaseLayout";
import { AccountPage, HomePage, LoginPage, ProductsPage, UsersPage } from "@/pages/index";
import { useAuthStore } from "@/features/login";
import { ProductCreatePage } from "@/pages/ProductCreatePage/ProductCreatePage";

const loginLoader = async () => {
  const store = useAuthStore.getState();

  const isOk = await store.fetchUser();
  
  if (isOk) return redirect("/admin");
  
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
        children: [
          {
            path: "",
            element: <ProductsPage />,
          },
          {
            path: ":id",
            element: <div>ffffff:2</div>
          },
          {
            path: "create",
            element: <ProductCreatePage />
          },
          {
            path: "edit/:id",
            element: <div>ffffffedit</div>
          }
        ]
      },
      {
        path: "users",
        children: [
          {
            path: "",
            element: <UsersPage />
          },
          {
            path: ":id",
            element: <div>ffffff:2</div>
          }
        ]
      },
      {
        path: "orders",
        children: [
          {
            path: "",
            element: <div>ffffff</div>
          },
          {
            path: ":id",
            element: <div>ffffff:2</div>
          }
        ]
      }
    ]
  },
  {
    path: "/",
    element: <Navigate to={"/admin/login"} replace /> 
  }
])