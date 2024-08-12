import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import Cart from "../pages/Cart/index.jsx";
import CheckoutPage from "../pages/Checkout/index.jsx";
import Wishlist from "../pages/Wishlist";
import ProductDetail from "../pages/ProductDetail";
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
