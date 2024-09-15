import { useNavigate, Link } from "react-router-dom";
import { PopUp } from "../../share/utilities";
import { useState, useRef, useEffect } from "react";
import { registerCustomer } from "../../services/Api";
import { useSelector } from "react-redux";
const Register = () => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const defaultObjectInputs = {
    isValidFullName: true,
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objectInputs, setObjectInputs] = useState(defaultObjectInputs);

  const isValidateField = () => {
    setObjectInputs(defaultObjectInputs);
    if (fullName === "") {
      PopUp({
        type: "error",
        content: "Username is required",
      });
      setObjectInputs({ ...defaultObjectInputs, isValidFullName: false });
      inputRef.current.focus();
      return false;
    }

    if (email === "") {
      PopUp({
        type: "error",
        content: "Email is required",
      });
      setObjectInputs({ ...defaultObjectInputs, isValidEmail: false });
      return false;
    }

    const patternEmail = /^\S+@\S+\.\S+$/;
    if (!patternEmail.test(email)) {
      PopUp({
        type: "error",
        content: "Invalid email",
      });
      setObjectInputs({ ...objectInputs, isValidEmail: false });
      return false;
    }

    if (phone === "") {
      PopUp({
        type: "error",
        content: "Phone is required",
      });
      setObjectInputs({ ...defaultObjectInputs, isValidPhone: false });
      return false;
    }

    const patternPhone = /^\d{10}$/;
    if (!patternPhone.test(phone)) {
      PopUp({
        type: "error",
        content: "Phone must be numeric and have 10 digits",
      });
      setObjectInputs({ ...objectInputs, isValidPhone: false });
      return false;
    }

    if (password === "") {
      PopUp({
        type: "error",
        content: "Password is required",
      });
      setObjectInputs({ ...defaultObjectInputs, isValidPassword: false });
      return false;
    }
    if (confirmPassword === "") {
      PopUp({
        type: "error",
        content: "Confirm Password is required",
      });
      setObjectInputs({
        ...defaultObjectInputs,
        isValidConfirmPassword: false,
      });
      return false;
    }

    if (password !== confirmPassword) {
      PopUp({
        type: "error",
        content: "Password is not the same",
      });
      setObjectInputs({ ...objectInputs, isValidConfirmPassword: false });
      return false;
    }
    return true;
  };

  const isLoggedIn = useSelector((state) => state.Auth.login.isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
      return;
    }
  }, [navigate, isLoggedIn]);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!isValidateField()) return;

    const data = { fullName, email, phone, password };
    registerCustomer(data)
      .then((res) => {
        // console.log(res);
        PopUp({
          type: "success",
          content: res.data.message,
        });
        navigate("/login");
      })
      .catch((err) => {
        // console.log(err);
        PopUp({
          type: "error",
          content: err.response.data.message,
        });
      });
  };
  return (
    <div className="container" id="auth-container">
      <section id="register">
        <form method="post">
          <h1 className="title">Register</h1>
          <div className="icon">
            <span>
              <i className="fa-regular fa-user fa-2xl" />
            </span>
            <input
              className={
                objectInputs.isValidFullName
                  ? "border-none custom-shadow-none"
                  : "border border-danger error"
              }
              type="text"
              name="fullName"
              placeholder="User Name"
              id="full_name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              ref={inputRef}
            />
          </div>
          <div className="icon">
            <span>
              <i className="fa-regular fa-envelope fa-2xl" />
            </span>
            <input
              className={
                objectInputs.isValidEmail
                  ? "boder-none custom-shadow-none"
                  : "border border-danger error"
              }
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              name="email"
              placeholder="Email"
              id="email"
            />
          </div>
          <div className="icon">
            <span>
              <i className="fa-solid fa-phone-volume fa-2xl"></i>
            </span>
            <input
              className={
                objectInputs.isValidPhone
                  ? "boder-none custom-shadow-none"
                  : "border border-danger error"
              }
              type="text"
              name="phone"
              placeholder="Phone"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="icon">
            <span>
              <i className="fa-solid fa-lock fa-2xl" />
            </span>
            <input
              className={
                objectInputs.isValidPassword
                  ? "boder-none custom-shadow-none"
                  : "border border-danger error"
              }
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="icon">
            <span>
              <i className="fa-solid fa-lock fa-2xl" />
            </span>
            <input
              className={
                objectInputs.isValidConfirmPassword
                  ? ""
                  : "border border-danger error"
              }
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              className="ms-0"
              onClick={handleRegister}
              type="submit"
              value="Register"
            />
          </div>
          <div>
            <Link to="/login" className="float-none me-0 mb-2 fs-14">
              Already've an account
            </Link>
          </div>
        </form>

        <div className="button">
          <span>Customer</span>
        </div>
      </section>
    </div>
  );
};
export default Register;
