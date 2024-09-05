import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Success = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.login.isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
  }, [navigate, isLoggedIn]);
  return (
    <section id="success">
      <div className="container-fluid text-center ">
        <div className="bg-white rounded">
          <div style={{ width: "50%" }} className="mx-auto">
            <img className="img-fluid" src=" /img/success.png" alt="acer" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Success;
