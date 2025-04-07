import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
const Success = () => {
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.Loading.isLoading);

  if (isLoading) {
    return (
      <div className="bg-white d-flex justify-content-center align-items-center h-100vh p-5">
        <SyncLoader size={20} color="#d6d7d7" />
      </div>
    );
  }

  return (
    <section id="success">
      <div className="container-fluid text-center ">
        <div className="bg-white rounded my-2">
          <div style={{ width: "50%" }} className="mx-auto">
            <img className="img-fluid" src=" /img/success.png" alt="acer" />
          </div>
          <button
            className="mx-auto btn-custom mb-3"
            type="button"
            onClick={() => navigate("/")}
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    </section>
  );
};

export default Success;
