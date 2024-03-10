import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import Cart from "../pages/Cart";
import CheckoutPage from "../pages/Checkout";
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
    element: <Homepage />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
]);
