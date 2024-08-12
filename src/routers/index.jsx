import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import Cart from "../pages/Cart.jsx";
import CheckoutPage from "../pages/Checkout.jsx";
import Wishlist from "../pages/Wishlist.jsx";
import ProductDetail from "../pages/ProductDetail.jsx";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
  },
  {
    path: "/products/:product_title",
    element: <ProductDetail />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
]);
