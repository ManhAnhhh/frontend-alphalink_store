import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";

import { getOrdersByCustomerID } from "../../../services/Api";
import {
  GetImageProduct,
  capitalizeFirstLetter,
} from "../../../share/utilities";
import Swal from "sweetalert2";

const All = () => {
  const onCancelOrder = useOutletContext()[0];
  const NoItemInOrder = useOutletContext()[1];

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  const stateOrder = {
    pending: "warning",
    processing: "info",
    shipping: "primary",
    success: "success",
    canceled: "canceled",
  };

  const { id } = useParams();

  useEffect(() => {
    getOrdersByCustomerID(id)
      .then(({ data }) => {
        if (data.data) setOrders(data.data);
      })
      .catch((err) => {});
  }, [id]);

  const isCancellBtn = useMemo(() => ["pending", "processing"], []);

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
    <div id="all-purchase">
      <div className="list-order-items">
        {orders.length === 0 ? (
          <NoItemInOrder />
        ) : (
          orders.map((order) => {
            return (
              <div key={order._id} className="item table-responsive">
                <div className="text-end">
                  {isCancellBtn.includes(order.status.toLowerCase()) && (
                    <div
                      className="cancel-state-item m-2 d-inline-block btn btn-outline-danger"
                      onClick={() => handleCancelOrder(order._id)}
                    >
                      Cancel Order
                    </div>
                  )}

                  <div
                    className={`state-item d-inline-block btn btn-${
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
                        <tr
                          key={Date.now() + index}
                          className="border-bottom boder-1"
                        >
                          <td className="item-img">
                            <img
                              src={GetImageProduct(item.img)}
                              alt={GetImageProduct(item.img)}
                            />
                          </td>
                          <td>
                            <div
                              className="mb-2 fw-bold item-name"
                              onClick={() =>
                                navigate(`/product-detail/${item.prd_id}`)
                              }
                            >
                              {item.name}
                            </div>
                            <div className="d-flex gap-4">
                              <div className="fs-14">
                                Quantity:
                                <span className="ms-1 text-danger fw-bold">
                                  {item.qty}
                                </span>
                              </div>
                              <div className="fs-14">
                                Color:
                                <span className="ms-1 fw-bold">
                                  {item.color}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="ms-1 text-end text-danger fw-bold text-nowrap">
                            $ {item.price}
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      {order.note && (
                        <td className="text-nowrap">Note: {order.note}</td>
                      )}
                      <td colSpan={order.note ? 2 : 3} className="text-end">
                        Voucher:
                        <span className="ms-1 text-danger fw-bold">$ 0</span>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="text-end">
                        Shipping fee:
                        <span className="ms-1 text-danger fw-bold">
                          $ {order.deleveryPrice}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={order.reasonCanceled ? 2 : 3}
                        className="text-end"
                      >
                        Total cost of goods:
                        <span
                          className="ms-1 text-danger fw-bold"
                          style={{ fontSize: "21px" }}
                        >
                          $ {order.totalPriceInCart}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      {order.reasonCanceled && (
                        <td className="text-nowrap text-danger">
                          {capitalizeFirstLetter(order.reasonCanceled)}
                        </td>
                      )}
                      <td
                        colSpan={order.reasonCanceled ? 2 : 3}
                        className="text-end"
                      >
                        Total:
                        <span
                          className="ms-1 text-danger fw-bold"
                          style={{ fontSize: "21px" }}
                        >
                          ${" "}
                          {parseFloat(
                            (
                              order.totalPriceInCart + order.deleveryPrice
                            ).toFixed(2)
                          )}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button className="btn-custom py-1 my-2">Repuchase</button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default All;
