import { useNavigate, Link } from "react-router-dom";
import { PopUp } from "../../share/utilities";
import { useState, useRef, useEffect } from "react";
import { getProducts, registerCustomer } from "../../services/Api";
import { useDispatch, useSelector } from "react-redux";
import AuthSkeleton from "../../share/components/Skeleton/AuthSkeleton";
import { setLoading } from "../../redux/reducers/loading";

const Register = () => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const numberInput = 2;
  const intialShowPassword = Array(numberInput).fill(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(intialShowPassword);

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

  const handleVisiblePassword = (i) => {
    setShowPassword((prev) =>
      prev.map((item, index) => (index === i ? !item : item))
    );
  };

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
    if (fullName.trim() === "") {
      PopUp({
        type: "error",
        content: "Họ và tên không được để trống",
      });
      setObjectInputs({ ...defaultObjectInputs, isValidFullName: false });
      inputRef.current.focus();
      return false;
    }

    if (email.trim() === "") {
      PopUp({
        type: "error",
        content: "Email không được để trống",
      });
      setObjectInputs({ ...defaultObjectInputs, isValidEmail: false });
      return false;
    }

    const patternEmail = /^\S+@\S+\.\S+$/;
    if (!patternEmail.test(email)) {
      PopUp({
        type: "error",
        content: "Email không hợp lệ",
      });
      setObjectInputs({ ...objectInputs, isValidEmail: false });
      return false;
    }

    if (phone === "") {
      PopUp({
        type: "error",
        content: "Số điện thoại không được để trống",
      });
      setObjectInputs({ ...defaultObjectInputs, isValidPhone: false });
      return false;
    }

    const patternPhone = /^\d{10}$/;
    if (!patternPhone.test(phone)) {
      PopUp({
        type: "error",
        content: "Số điện thoại không hợp lệ",
      });
      setObjectInputs({ ...objectInputs, isValidPhone: false });
      return false;
    }

    if (password.trim() === "") {
      PopUp({
        type: "error",
        content: "Mật khẩu không được để trống",
      });
      setObjectInputs({ ...defaultObjectInputs, isValidPassword: false });
      return false;
    }
    if (confirmPassword.trim() === "") {
      PopUp({
        type: "error",
        content: "Xác nhận mật khẩu không được để trống",
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
        content: "Mật khẩu không khớp",
      });
      setObjectInputs({ ...objectInputs, isValidConfirmPassword: false });
      return false;
    }
    return true;
  };

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
        navigate("/customer/login");
      })
      .catch((err) => {
        // console.log(err);
        PopUp({
          type: "error",
          content: err?.response.data.message,
        });
      });
  };

  if (isLoading) return <AuthSkeleton />;

  return (
    <div className="container" id="auth-container">
      <section id="register">
        <form method="post">
          <h1 className="title">Đăng ký</h1>
          <div className="wrapper-input-auth">
            <span>
              <i className="icon fa-regular fa-user fa-2xl" />
            </span>
            <input
              className={
                objectInputs.isValidFullName
                  ? "border-none custom-shadow-none"
                  : "border border-danger error"
              }
              type="text"
              name="fullName"
              placeholder="Họ và tên"
              id="full_name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              ref={inputRef}
            />
          </div>
          <div className="wrapper-input-auth">
            <span>
              <i className="icon fa-regular fa-envelope fa-2xl" />
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
          <div className="wrapper-input-auth">
            <span>
              <i className="icon fa-solid fa-phone-volume fa-2xl"></i>
            </span>
            <input
              className={
                objectInputs.isValidPhone
                  ? "boder-none custom-shadow-none"
                  : "border border-danger error"
              }
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="wrapper-input-auth">
            <span>
              <i className="icon fa-solid fa-lock fa-2xl" />
            </span>
            <input
              className={
                objectInputs.isValidPassword
                  ? "boder-none custom-shadow-none"
                  : "border border-danger error"
              }
              type={showPassword[0] ? "text" : "password"}
              name="password"
              placeholder="Mật khẩu"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i
              onClick={() => handleVisiblePassword(0)}
              className={`position-absolute me-2 icon icon-eyes fa-regular fa-eye${
                showPassword[0] ? "-slash" : ""
              } `}
            ></i>
          </div>
          <div className="wrapper-input-auth">
            <span>
              <i className="icon fa-solid fa-lock fa-2xl" />
            </span>
            <input
              className={
                objectInputs.isValidConfirmPassword
                  ? "boder-none custom-shadow-none"
                  : "border border-danger error"
              }
              type={showPassword[1] ? "text" : "password"}
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <i
              onClick={() => handleVisiblePassword(1)}
              className={`position-absolute me-2 icon icon-eyes fa-regular fa-eye${
                showPassword[1] ? "-slash" : ""
              } `}
            ></i>
          </div>
          <div>
            <input
              className="ms-0"
              onClick={handleRegister}
              type="submit"
              value="Đăng ký"
            />
          </div>
          <div>
            <Link to="/customer/login" className="float-none me-0 mb-2 fs-14">
              Đã có tài khoản
            </Link>
          </div>
        </form>

        <div className="button">
          <span className="fs-14">Đăng ký để có trải nghiệm tốt nhất ở Alphalink Store</span>
        </div>
      </section>
    </div>
  );
};
export default Register;
