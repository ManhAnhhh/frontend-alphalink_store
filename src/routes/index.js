import Cart from "../pages/Cart";
import Category from "../pages/Category";
import Home from "../pages/Home";
import Payment from "../pages/Payment";
import Success from "../pages/Success";
import ProductDetail from "../pages/ProductDetail";
import NotFound from "../pages/NotFound";
const publicRoutes = [
  { path: "/product-detail/:id", element: <ProductDetail/> },
  { path: "/category/:id", element: <Category /> },
  { path: "/cart", element: <Cart/> },
  { path: "/payment", element: <Payment /> },
  { path: "/success", element: <Success /> },
  { path: "/", element: <Home/> },
  { path: "*", element: <NotFound/> },
];
export default publicRoutes;
