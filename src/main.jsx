import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { store } from './redux/store'
import './index.css'

import App from './App.jsx'
import ProductList from './components/ProductList.jsx'
import ProductDetail from './components/ProductDetail.jsx'
import Cart from './components/Cart.jsx'
import Checkout from './components/Checkout.jsx'
import NotFound from './components/NotFound.jsx'

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
