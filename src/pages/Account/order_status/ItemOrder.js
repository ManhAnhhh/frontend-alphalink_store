import { GetImageProduct } from "../../../share/utilities";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../share/utilities";
import Swal from "sweetalert2";

const ItemOrder = ({ order, onCancelOrder, id }) => {
  const navigate = useNavigate();
  const isCancellBtn = ["pending", "processing"];
  const stateOrder = {
    pending: "warning",
    processing: "info",
    shipping: "primary",
    success: "success",
    canceled: "canceled",
  };

  const handleCancelOrder = (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        onCancelOrder(id, orderId);
      }
    });
  };

  return (
    <div className="item">
      <div>
        <div className="text-end border-bottom">
          {isCancellBtn.includes(order.status.toLowerCase()) && (
            <div
              className="cancel-state-item me-2 d-inline-block btn btn-outline-danger"
              onClick={() => handleCancelOrder(order._id)}
            >
              Cancel Order
            </div>
          )}

          <div
            className={`state-item me-2 d-inline-block btn btn-${
              stateOrder[order.status]
            } my-2 text-white`}
          >
            {capitalizeFirstLetter(order.status)}
          </div>
        </div>
        <table>
          <tbody>
            {order.items.map((item, index) => {
              return (
                <tr key={Date.now() + index} className="border-bottom boder-1">
                  <td className="item-img">
                    <img
                      src={GetImageProduct(item.img)}
                      alt={GetImageProduct(item.img)}
                    />
                  </td>
                  <td>
                    <div
                      className="mb-2 fw-bold item-name"
                      onClick={() => navigate(`/product-detail/${item.prd_id}`)}
                    >
                      {item.name}
                    </div>
                    <div className="d-flex gap-2 gap-md-4 flex-wrap">
                      <div className="fs-14">
                        Quantity:
                        <span className="ms-1 text-danger fw-bold">
                          {item.qty}
                        </span>
                      </div>
                      <div className="fs-14">
                        Color:
                        <span className="ms-1 fw-bold">{item.color}</span>
                      </div>
                    </div>
                  </td>
                  <td className="ms-1 text-end text-danger fw-bold text-nowrap">
                    $ {item.price}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="item-end">
          <div
            className={`d-flex flex-wrap ${
              order.note ? "justify-content-between" : "justify-content-end"
            }`}
          >
            {order.note && <div>Note: {order.note}</div>}
            <div className="text-end">
              Voucher:
              <span className="ms-1 text-danger fw-bold">$ 0</span>
            </div>
          </div>
          <div>
            <div className="text-end">
              Shipping fee:
              <span className="ms-1 text-danger fw-bold">
                $ {order.deleveryPrice}
              </span>
            </div>
          </div>
          <div>
            <div className="text-end">
              Total cost of goods:
              <span
                className="ms-1 text-danger fw-bold"
                style={{ fontSize: "21px" }}
              >
                $ {order.totalPriceInCart}
              </span>
            </div>
          </div>
          <div
            className={`d-flex flex-wrap ${
              order.reasonCanceled ? "justify-content-between" : "justify-content-end"
            }`}
          >
            {order.reasonCanceled && (
              <div className="text-nowrap text-danger">
                {capitalizeFirstLetter(order.reasonCanceled)}
              </div>
            )}
            <div className="text-end">
              Total:
              <span
                className="ms-1 text-danger fw-bold"
                style={{ fontSize: "21px" }}
              >
                ${" "}
                {parseFloat(
                  (order.totalPriceInCart + order.deleveryPrice).toFixed(2)
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      <button className="btn-custom py-1 my-2">Repuchase</button>
    </div>
  );
};

export default ItemOrder;
