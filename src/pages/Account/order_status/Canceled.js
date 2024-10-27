import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { getOrdersByCustomerID } from "../../../services/Api";
import ItemOrder from "./ItemOrder";

const Canceled = () => {
  const NoItemInOrder = useOutletContext()[1];
  const { id } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrdersByCustomerID(id)
      .then(({ data }) => {
        if (data.data)
          setOrders(
            data.data.filter(
              (order) => order.status.toLowerCase() === "canceled"
            )
          );
      })
      .catch(() => {});
  }, [id]);
  return (
    <div id="canceled">
      <div className="list-order-items">
        {orders.length === 0 ? (
          <NoItemInOrder />
        ) : (
          orders.map((order) => <ItemOrder order={order} id={id} />)
        )}
      </div>
    </div>
  );
};

export default Canceled;
