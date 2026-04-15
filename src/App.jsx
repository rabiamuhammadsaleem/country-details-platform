import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CountryDetails from './pages/CountryDetails'
import NotFound from './pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFound />,
  },
  {
    path: '/country/:name',
    element: <CountryDetails />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])