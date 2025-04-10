import { GetImageProduct } from "../../../share/utilities";
import { useNavigate } from "react-router-dom";
import {
  capitalizeFirstLetter,
  formattedPriceVND,
} from "../../../share/utilities";
import Swal from "sweetalert2";
import { addManyItemsToCart } from "../../../services/Api";
import { useDispatch } from "react-redux";
import { updateCart } from "../../../redux/reducers/cart";

const ItemOrder = ({ order, onCancelOrder, id }) => {
  const dispatch = useDispatch();
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
      title: "Bạn có muốn hủy đơn hàng không?",
      //text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
      cancelButtonText: "Không",
    }).then((result) => {
      if (result.isConfirmed) {
        onCancelOrder(id, orderId);
      }
    });
  };

  const handleRepuchase = async () => {
    const items = order.items;
    await addManyItemsToCart(id, { items }).then(({ data }) => {
      dispatch(updateCart(data.data));
    });
    navigate(`/customer/${id}/cart`);
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
              Hủy đơn hàng
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
                      <div className="fs-12">
                        Số lượng:
                        <span className="ms-1 text-danger fw-bold">
                          {item.qty}
                        </span>
                      </div>
                      <div className="fs-12">
                        Màu sắc:
                        <span className="ms-1 fw-bold">{item.color}</span>
                      </div>
                    </div>
                  </td>
                  <td className="ms-1 text-end text-danger fw-bold text-nowrap">
                    {formattedPriceVND(item.price)}
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
            <div className="text-end fs-12">
              Mã giảm giá:
              <span className="ms-1 text-danger fw-bold">0 ₫</span>
            </div>
          </div>
          <div>
            <div className="text-end fs-12">
              Phí vận chuyển:
              <span className="ms-1 text-danger fw-bold">
                {formattedPriceVND(order.deleveryPrice)}
              </span>
            </div>
          </div>
          <div>
            <div className="text-end fs-12">
              Tổng tiền hàng:
              <span
                className="ms-1 text-danger fw-bold"
              >
                {formattedPriceVND(order.totalPriceInCart)}
              </span>
            </div>
          </div>
          <div
            className={`d-flex flex-wrap ${
              order.reasonCanceled
                ? "justify-content-between"
                : "justify-content-end"
            }`}
          >
            {order.reasonCanceled && (
              <div className="text-nowrap text-danger">
                {capitalizeFirstLetter(order.reasonCanceled)}
              </div>
            )}
            <div className="text-end fs-12">
              Tổng thanh toán:
              <span
                className="ms-1 text-danger fw-bold"
              >
                {formattedPriceVND(order.totalPriceInCart + order.deleveryPrice)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleRepuchase} className="btn-custom py-1 my-2">
        Mua lại
      </button>
    </div>
  );
};

export default ItemOrder;
