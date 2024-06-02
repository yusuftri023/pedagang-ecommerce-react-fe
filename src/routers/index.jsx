import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Home";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import Cart from "../pages/Cart";
import CheckoutPage from "../pages/Checkout";
import BasketProduct from "../components/molecules/BasketProduct";
import Wishlist from "../pages/Wishlist";
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
