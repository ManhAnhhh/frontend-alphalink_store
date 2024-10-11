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

import Profiles from "../pages/Account/Profiles";
import Message from "../../src/pages/Account/Message";
import PurchaseOrder from "../../src/pages/Account/PurchaseOrder";
import ChangePassword from "../../src/pages/Account/ChangePassword";
import Account from "../pages/Account";

import All from "../pages/Account/order_status/All";
import Pending from "../pages/Account/order_status/Pending";
import Processing from "../pages/Account/order_status/Processing";
import SuccessOrder from "../pages/Account/order_status/Success";
import Canceled from "../pages/Account/order_status/Canceled";
import Shipping from "../pages/Account/order_status/Shipping";

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

const accountRoutes = [
  {
    path: "",
    element: <PrivateRoute element={<Account />} />,
    children: [
      { path: "profiles", element: <Profiles /> },
      { path: "change_password", element: <ChangePassword /> },
      { path: "message", element: <Message /> },
      {
        path: "purchase_order",
        element: <PurchaseOrder />,
        children: [
          { path: "all", element: <All /> },
          { path: "pending", element: <Pending /> },
          { path: "processing", element: <Processing /> },
          { path: "shipping", element: <Shipping /> },
          { path: "success", element: <SuccessOrder /> },
          { path: "pending", element: <Pending /> },
          { path: "canceled", element: <Canceled /> },
        ],
      },
    ],
  },
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
  {
    path: "/customer/:id",
    children: accountRoutes,
  },
]);

export default router;
