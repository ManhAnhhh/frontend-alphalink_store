import { PopUp } from "../../share/utilities";
import { useNavigate, Link } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    PopUp({
      type: "success",
      content: "Login successful",
    });
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  return (
    <div className="container" id="auth-container">
      <section id="login" className="">
        <form method="post">
          <h1 className="title">Log In</h1>
          <div className="icon">
            <span>
              <i className="fa-regular fa-user fa-2xl" />
            </span>
            <input type="text" name="email" placeholder="Email" id="username" />
          </div>
          <div className="icon">
            <span>
              <i className="fa-solid fa-lock fa-2xl" />
            </span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              id="password"
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
