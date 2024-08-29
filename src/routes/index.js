import Cart from "../pages/Cart";
import Categoty from "../pages/Category";
import Home from "../pages/Home";
import Payment from "../pages/Payment";
import Success from "../pages/Success";
import ProductDetail from "../pages/ProductDetail";
import NotFound from "../pages/NotFound";
const publicRoutes = [
  { path: "/product-detail", element: <ProductDetail/> },
  { path: "/cart", element: <Cart/> },
  { path: "/category", element: <Categoty /> },
  { path: "/payment", element: <Payment /> },
  { path: "/success", element: <Success /> },
  { path: "/", element: <Home/> },
  { path: "*", element: <NotFound/> },
];
export default publicRoutes;
