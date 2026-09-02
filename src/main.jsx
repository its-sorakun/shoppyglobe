import { StrictMode, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { store } from './redux/store'
import './index.css'

import App from './App.jsx'
const ProductList = lazy(() => import('./components/ProductList.jsx'))
const ProductDetail = lazy(() => import('./components/ProductDetail.jsx'))
const Cart = lazy(() => import('./components/Cart.jsx'))
const Checkout = lazy(() => import('./components/Checkout.jsx'))
const NotFound = lazy(() => import('./components/NotFound.jsx'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <ProductList />,
      },
      {
        path: '/product/:id',
        element: <ProductDetail />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      }
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
