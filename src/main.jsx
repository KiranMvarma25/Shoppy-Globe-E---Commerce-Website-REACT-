import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter,RouterProvider } from 'react-router-dom';

// import ProductList from './components/ProductList.jsx'
// import Cart from './store/Cart.jsx';
import NotFound from './components/NotFound.jsx';
// import ProductDetails from './components/ProductDetail.jsx';
import { Provider } from 'react-redux';
import appStore from './store/store.js';
// import CartItems from './store/CartItems.jsx';
import { lazy, Suspense } from 'react';

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const ProductList = lazy(() => import("./components/ProductList.jsx"));
const ProductDetails = lazy(() => import("./components/ProductDetail.jsx"));
const Cart = lazy(() => import("./store/Cart.jsx"));
const CartItems = lazy(() => import("./store/CartItems.jsx"));

const appRouter = createBrowserRouter([
  {
    path : '/',
    element : <App />,
    children : [
      {
        path : '/',
        element : <Suspense fallback={<div>Loading Product List...</div>}><ProductList /></Suspense> 
      },
      {
        path : '/productdetails/:id',
        element : <Suspense fallback={<div>Loading Product Details...</div>}><ProductDetails /></Suspense> 
      },
      {
        path : '/cart',
        element : <Suspense fallback={<div>Loading Cart...</div>}><Cart /></Suspense> 
      },
      {
        path : '/cartitems/:id',
        element : <Suspense fallback={<div>Loading Cart Items...</div>}><CartItems /></Suspense>
      },
    ],
    errorElement : <NotFound /> 
  },
])

createRoot(document.getElementById('root')).render(
  
  <Provider store={appStore} >
      <RouterProvider router={appRouter} />
      <ToastContainer />
  </Provider>
  
)