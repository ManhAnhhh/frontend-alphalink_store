import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { getOrdersByCustomerID } from "../../../services/Api";
import ItemOrder from "./ItemOrder";

const Processing = () => {
  const onCancelOrder = useOutletContext()[0];
  const NoItemInOrder = useOutletContext()[1];
  const { id } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrdersByCustomerID(id)
      .then(({ data }) => {
        if (data.data)
          setOrders(
            data.data.filter(
              (order) => order.status.toLowerCase() === "processing"
            )
          );
      })
      .catch(() => {});
  }, [id]);

  return (
    <div id="processing">
      <div className="list-order-items">
        {orders.length === 0 ? (
          <NoItemInOrder />
        ) : (
          orders.map((order, i) => (
            <ItemOrder
              key={order._id}
              order={order}
              onCancelOrder={onCancelOrder}
              id={id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Processing;
