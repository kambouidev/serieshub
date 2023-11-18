import { FC } from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home/Home';


const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "show/:id",
    Component: Home,
  },

]);

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>

  )
}

export default App
