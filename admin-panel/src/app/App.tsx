import { QueryRouter } from "./routers/QueryRouter"
import { RouterProvider } from "react-router"
import { AppRouter } from "./routers/AppRouter"
function App() {
  return (
    <QueryRouter>
      <RouterProvider router={AppRouter}  />
    </QueryRouter>
  )
}

export default App
