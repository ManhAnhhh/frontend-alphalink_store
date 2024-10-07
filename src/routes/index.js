import Cart from "../pages/Cart";
import Category from "../pages/Category";
import Home from "../pages/Home";
import Payment from "../pages/Payment";
import Success from "../pages/Success";
import ProductDetail from "../pages/ProductDetail";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Search from "../pages/Search";

import MainLayout from "../share/components/layout/MainLayout";

import PrivateRoute from "./PrivateRoute";
import LoggedRoute from "./LoggedRoute";

import { createBrowserRouter } from "react-router-dom";

const routesItem = [
  { path: "product-detail/:id", element: <ProductDetail /> },
  { path: "category/:id", element: <Category /> },
  { path: "customer/:id/cart", element: <PrivateRoute element={<Cart />} /> },
  { path: "payment/:id", element: <PrivateRoute element={<Payment />} /> },
  { path: "success", element: <PrivateRoute element={<Success />} /> },
  { path: "search", element: <Search /> },
  { path: "/", element: <Home /> },
  { path: "*", element: <NotFound /> },
];

const authRoutes = [
  {
    path: "register",
    element: <LoggedRoute element={<Register />} />,
  },
  { path: "login", element: <LoggedRoute element={<Login />} /> },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: routesItem,
  },
  {
    path: "/customer/",
    children: authRoutes,
  },
]);

export default router;
