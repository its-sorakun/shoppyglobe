// main.jsx: Application entry point. Initializes React, configures the global Redux store provider, and sets up the React Router hierarchy.
import { StrictMode, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { store } from './redux/store'
import './index.css'

import App from './App.jsx'

// Lazily load route chunks to ensure the initial JS bundle does not block the critical rendering path
// with views that have not yet been requested.
const ProductList = lazy(() => import('./components/ProductList.jsx'))
const ProductDetail = lazy(() => import('./components/ProductDetail.jsx'))
const Cart = lazy(() => import('./components/Cart.jsx'))
const Checkout = lazy(() => import('./components/Checkout.jsx'))
const NotFound = lazy(() => import('./components/NotFound.jsx'))

// createBrowserRouter is utilized here to opt into React Router v6's data APIs.
// Even though route loaders are not utilized here, this setup future-proofs the routing architecture.
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
