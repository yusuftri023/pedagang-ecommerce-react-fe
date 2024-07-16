import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Home.jsx";
import LoginPage from "../pages/Login.jsx";
import RegisterPage from "../pages/Register.jsx";
import Cart from "../pages/Cart.jsx";
import CheckoutPage from "../pages/Checkout.jsx";
import BasketProduct from "../components/molecules/BasketProduct.jsx";
import Wishlist from "../pages/Wishlist.jsx";
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
