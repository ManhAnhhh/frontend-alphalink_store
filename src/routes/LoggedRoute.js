import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

//? Check xem đã login vào chưa => nếu rồi thì không cho vào và bắn ra Home Page
const LoggedRoute = ({ element }) => {
  const isLoggedIn = useSelector((state) => state.Auth.login.isLoggedIn);
  return !isLoggedIn ? element : <Navigate to="/" />;
};

export default LoggedRoute;
