/* eslint-disable react-refresh/only-export-components */
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import { lazy } from "react";
import Order from "../pages/Order/index.jsx";
// import Testing from "../pages/Testing.jsx";

const Homepage = lazy(() => import("../pages/index.jsx"));
const LoginPage = lazy(() => import("../pages/Login"));
const RegisterPage = lazy(() => import("../pages/Register"));
const Cart = lazy(() => import("../pages/Cart"));
const CheckoutPage = lazy(() => import("../pages/Checkout"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const UserSetting = lazy(() => import("../pages/UserSetting/index.jsx"));
const PageNotFound = lazy(() => import("../pages/PageNotFound/index.jsx"));
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Homepage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="cart" element={<Cart />} />
      <Route path="wishlist" element={<Wishlist />} />
      <Route path="products/:product_title" element={<ProductDetail />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="user/orders" element={<Order />} />
      <Route path="user/settings" element={<UserSetting />} />
      <Route
        path="*"
        element={<Navigate replace to={"404-page-not-found"} />}
      />
      <Route path="/404-page-not-found" element={<PageNotFound />} />
    </>
  )
);
[
  // {
  //   path: "/testing",
  //   element: <Testing />,
  // },
];
