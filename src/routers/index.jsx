import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Index";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import Cart from "../pages/Cart";
import CheckoutPage from "../pages/Checkout";
import BasketProduct from "../components/molecules/BasketProduct";
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
    path: "/products/:product-title/:id",
    element: <BasketProduct />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
]);
