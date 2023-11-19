import { FC } from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { PrimeReactProvider } from 'primereact/api';

import Home from './pages/Home/Home';
import ShowPage from './pages/Show/ShowPage';
import { Provider } from 'jotai';



const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "show/:id",
    Component: ShowPage,
  },

]);

const App: FC = () => {
  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <PrimeReactProvider >
          <RouterProvider router={router} />
        </PrimeReactProvider>
      </QueryClientProvider>
    </Provider>


  )
}

export default App
