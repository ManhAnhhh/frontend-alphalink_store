import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { getOrdersByCustomerID } from "../../../services/Api";
import ItemOrder from "./ItemOrder";

const All = () => {
  const onCancelOrder = useOutletContext()[0];
  const NoItemInOrder = useOutletContext()[1];

  const [orders, setOrders] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    getOrdersByCustomerID(id)
      .then(({ data }) => {
        if (data.data) setOrders(data.data);
      })
      .catch(() => {});
  }, [id]);

  return (
    <div id="all-purchase">
      <div className="list-order-items">
        {orders.length === 0 ? (
          <NoItemInOrder />
        ) : (
          orders.map((order) => (
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

export default All;
