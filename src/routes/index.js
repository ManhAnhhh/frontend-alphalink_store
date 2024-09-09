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
const publicRoutes = [
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/product-detail/:id", element: <ProductDetail /> },
  { path: "/category/:id", element: <Category /> },
  { path: "/customer/:id/cart", element: <Cart /> },
  { path: "/payment", element: <Payment /> },
  { path: "/success", element: <Success /> },
  { path: "/search", element: <Search /> },
  { path: "/", element: <Home /> },
  { path: "*", element: <NotFound /> },
];
export default publicRoutes;
