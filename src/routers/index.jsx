/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
// import Testing from "../pages/Testing.jsx";

const Homepage = lazy(() => import("../pages/index.jsx"));
const LoginPage = lazy(() => import("../pages/Login.jsx"));
const RegisterPage = lazy(() => import("../pages/Register.jsx"));
const Cart = lazy(() => import("../pages/Cart.jsx"));
const CheckoutPage = lazy(() => import("../pages/Checkout.jsx"));
const Wishlist = lazy(() => import("../pages/Wishlist.jsx"));
const ProductDetail = lazy(() => import("../pages/ProductDetail.jsx"));
const UserSetting = lazy(() => import("../pages/UserSetting.jsx"));

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
  // {
  //   path: "/testing",
  //   element: <Testing />,
  // },
]);
