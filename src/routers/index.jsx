import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import Cart from "../pages/cart";
import CheckoutPage from "../pages/checkout";
import BasketProduct from "../components/molecules/BasketProduct";
import Wishlist from "../pages/wishlist";
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
    path: "/products/:product-title/:id",
    element: <BasketProduct />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
]);
