import { PopUp } from "../../share/utilities";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { loginCustomer } from "../../services/Api";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFalse } from "../../redux/reducers/auth";
import { updateCart } from "../../redux/reducers/cart";
import { updateHeart } from "../../redux/reducers/heart";
const Login = () => {
  const dispatch = useDispatch();
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const defaultObjectInputs = {
    isValidEmail: true,
    isValidPassword: true,
  };
  const [objectInputs, setObjectInputs] = useState(defaultObjectInputs);
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.Auth.login.isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
      return;
    }
  }, [navigate, isLoggedIn]);

  const isValidField = () => {
    setObjectInputs(defaultObjectInputs);
    if (emailLogin === "") {
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
    if (passwordLogin === "") {
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
          content: err.response.data.message,
        });
      });
  };
  return (
    <div className="container" id="auth-container">
      <section id="login">
        <form method="post">
          <h1 className="title">Log In</h1>
          <div className="icon">
            <span>
              <i className="fa-regular fa-user fa-2xl" />
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
          <div className="icon">
            <span>
              <i className="fa-solid fa-lock fa-2xl" />
            </span>
            <input
              className={
                objectInputs.isValidPassword ? "" : "border border-danger error"
              }
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              value={passwordLogin}
              onChange={(e) => setPasswordLogin(e.target.value)}
            />
          </div>
          <div>
            <input onClick={handleLogin} type="submit" value="Log in" />
            <Link to="/forget">Forget Password?</Link>
            <Link to="/register">Register</Link>
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
