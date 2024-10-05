import { useNavigate } from "react-router-dom";
const Success = () => {
  const navigate = useNavigate();

  return (
    <section id="success">
      <div className="container-fluid text-center ">
        <div className="bg-white rounded">
          <div style={{ width: "50%" }} className="mx-auto">
            <img className="img-fluid" src=" /img/success.png" alt="acer" />
          </div>
          <button
            class="mx-auto btn-custom mb-3"
            type="button"
            onClick={() => navigate("/")}
          >
            Return Home
          </button>
        </div>
      </div>
    </section>
  );
};

export default Success;
