import { PopUp } from "../../share/utilities";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts, loginCustomer } from "../../services/Api";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFalse } from "../../redux/reducers/auth";
import { updateCart } from "../../redux/reducers/cart";
import { updateHeart } from "../../redux/reducers/heart";
import AuthSkeleton from "../../share/components/Skeleton/AuthSkeleton";
import { setLoading } from "../../redux/reducers/loading";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isLoading = useSelector((state) => state.Loading.isLoading);

  // Mượn tạm API để setLoading cho login page khi enter url login page thì
  // nó k set đc loading nên mất mạng nó vẫn render ra login page chứ không phải AuthSkeleton
  useEffect(() => {
    getProducts()
      .then((res) => {
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(true));
      });
  }, [dispatch]);

  const defaultObjectInputs = {
    isValidEmail: true,
    isValidPassword: true,
  };
  const [objectInputs, setObjectInputs] = useState(defaultObjectInputs);

  const isValidField = () => {
    setObjectInputs(defaultObjectInputs);
    if (emailLogin.trim() === "") {
      PopUp({
        type: "error",
        content: "Email is required",
      });
      setObjectInputs({ ...defaultObjectInputs, isValidEmail: false });
      return false;
    }
    const patternEmail = /^\S+@\S+\.\S+$/;
    if (!patternEmail.test(emailLogin)) {
      PopUp({
        type: "error",
        content: "Invalid email",
      });
      setObjectInputs({ ...defaultObjectInputs, isValidEmail: false });
      return false;
    }
    if (passwordLogin.trim() === "") {
      PopUp({
        type: "error",
        content: "Password is required",
      });
      setObjectInputs({ ...defaultObjectInputs, isValidPassword: false });
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isValidField()) return;

    const data = { email: emailLogin, password: passwordLogin };
    loginCustomer(data)
      .then((res) => {
        dispatch(
          loginSuccess({
            id: res.data.data.id,
            email: res.data.data.email,
            fullName: res.data.data.fullName,
            phone: res.data.data.phone,
            address: res.data.data.address,
          })
        );
        dispatch(updateCart(res.data.data.cart));
        dispatch(updateHeart(res.data.data.heart));
        PopUp({
          type: "success",
          content: res.data.message,
        });
        navigate("/");
      })
      .catch((err) => {
        // console.log(err);
        dispatch(loginFalse());
        PopUp({
          type: "error",
          content: err?.response?.data?.message,
        });
      });
  };

  if (isLoading) return <AuthSkeleton />;

  return (
    <div className="container" id="auth-container">
      <section id="login">
        <form method="post">
          <h1 className="title">Log In</h1>
          <div className="wrapper-input-auth">
            <span>
              <i className="icon fa-regular fa-user fa-2xl" />
            </span>
            <input
              className={
                objectInputs.isValidEmail ? "" : "border border-danger error"
              }
              type="text"
              name="email"
              placeholder="Email"
              id="username"
              value={emailLogin}
              onChange={(e) => setEmailLogin(e.target.value)}
            />
          </div>
          <div className="wrapper-input-auth">
            <span>
              <i className="icon fa-solid fa-lock fa-2xl" />
            </span>
            <input
              className={
                objectInputs.isValidPassword ? "" : "border border-danger error"
              }
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              id="password"
              value={passwordLogin}
              onChange={(e) => setPasswordLogin(e.target.value)}
            />
            <i
              onClick={() => setShowPassword(!showPassword)}
              className={`position-absolute icon icon-eyes fa-regular fa-eye${
                showPassword ? "-slash" : ""
              }`}
            ></i>
          </div>
          <div>
            <input onClick={handleLogin} type="submit" value="Log in" />
            <Link to="/customer/forget">Forget Password?</Link>
            <Link to="/customer/register">Register</Link>
          </div>
        </form>
        <div className="button">
          <span>Customer</span>
        </div>
      </section>
    </div>
  );
};
export default Login;
