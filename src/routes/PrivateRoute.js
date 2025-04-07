import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

//? Khai báo PrivateRoute để đảm bảo chỉ người đã đăng nhập mới có thể truy cập vào đường dẫn đã đặt

const PrivateRoute = ({ element }) => {
  const isLoggedIn = useSelector((state) => state.Auth.login.isLoggedIn);
  return isLoggedIn ? element : <Navigate to="/" />;
};

export default PrivateRoute;
