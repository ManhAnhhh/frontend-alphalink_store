import { useEffect, useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import { getOrdersByCustomerID } from "../../../services/Api";
import {
  GetImageProduct,
  capitalizeFirstLetter,
} from "../../../share/utilities";

const Shipping = () => {
  const NoItemInOrder = useOutletContext()[1];
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getOrdersByCustomerID(id)
      .then(({ data }) => {
        if (data.data)
          setOrders(
            data.data.filter(
              (order) => order.status.toLowerCase() === "shipping"
            )
          );
      })
      .catch((err) => {});
  }, [id]);
  return (
    <div id="shipping">
      <div className="list-order-items">
        {orders.length === 0 ? (
          <NoItemInOrder />
        ) : (
          orders.map((order, i) => (
            <div key={Date.now() + i} className="item table-responsive">
              <div className="text-end">
                <div className="state-item my-2 d-inline-block btn btn-primary text-white">
                  {capitalizeFirstLetter(order.status)}
                </div>
              </div>
              <table>
                <tbody>
                  {order.items.map((item, index) => (
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
                          className="mb-2 item-name fw-bold"
                          onClick={() =>
                            navigate(`/product-detail/${item.prd_id}`)
                          }
                        >
                          {capitalizeFirstLetter(item.name)}
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
                            <span className="ms-1 fw-bold">{item.color}</span>
                          </div>
                        </div>
                      </td>
                      <td className="ms-1 text-end text-danger fw-bold text-nowrap">
                        $ {item.price}
                      </td>
                    </tr>
                  ))}
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
                        $ {order.items.length > 3 ? 0 : 15}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="text-end">
                      Total:
                      <span
                        className="ms-1 text-danger fw-bold"
                        style={{ fontSize: "21px" }}
                      >
                        $ {order.totalPrice}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className="btn-custom py-1 my-2">Repuchase</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Shipping;
