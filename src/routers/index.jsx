/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Order from "../pages/Order/index.jsx";
import Testing from "../pages/Testing.jsx";

const Homepage = lazy(() => import("../pages/index.jsx"));
const LoginPage = lazy(() => import("../pages/Login"));
const RegisterPage = lazy(() => import("../pages/Register"));
const Cart = lazy(() => import("../pages/Cart"));
const CheckoutPage = lazy(() => import("../pages/Checkout"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const UserSetting = lazy(() => import("../pages/UserSetting/index.jsx"));

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
  {
    path: "/user/settings",
    element: <UserSetting />,
  },
  {
    path: "/user/orders",
    element: <Order />,
  },

  {
    path: "/testing",
    element: <Testing />,
  },
]);
