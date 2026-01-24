import { QueryRouter } from "./routers/QueryRouter";
import { RouterProvider } from "react-router";
import { AppRouter } from "./routers/AppRouter";
import { Toaster } from "sonner";
function App() {
  return (
    <QueryRouter>
      <RouterProvider router={AppRouter} />
      <Toaster position="bottom-right" closeButton duration={4000} theme="dark" />
    </QueryRouter>
  );
}

export default App;
