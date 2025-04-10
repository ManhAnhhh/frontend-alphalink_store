import { Link, NavLink, useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { cancelOrder, getOrdersByCustomerID } from "../../services/Api";
import Swal from "sweetalert2";

const PurchaseOrder = () => {
  const { id } = useParams();
  const orderTitle = useRef(null);
  const [orders, setOrders] = useState([]);
  const [showNav, setShowNav] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    if (orders.length > 0) {
      if (showNav) {
        const heightOfAllItems = "280px";
        orderTitle.current.style.height = heightOfAllItems;
      } else {
        const heightOfFirstItem = "50px";
        orderTitle.current.style.height = heightOfFirstItem;
      }
    }
  }, [orders.length, showNav]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      if (windowSize.width > 1050) {
        setShowNav(false);
      }
    };

    // Lắng nghe sự kiện resize
    window.addEventListener("resize", handleResize);

    // Cleanup để gỡ bỏ listener khi component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowSize.width]);

  useEffect(() => {
    getOrdersByCustomerID(id)
      .then(({ data }) => {
        if (data.data) setOrders(data.data);
      })
      .catch((err) => {});
  }, [id]);

  const handleToggle = (e) => {
    if (window.innerWidth > 1050) return setShowNav(false);
    setShowNav(!showNav);
  };

  const NoOrders = () => {
    return (
      <div className="text-center py-5">
        <i className="icon fa-solid fa-shopping-bag fa-5x"></i>
        <h3 className="text-muted">No orders yet.</h3>
        <Link to="/">Return Home</Link>
      </div>
    );
  };

  const NoItemInOrder = () => (
    <div className="text-center my-5">
      <img width={140} src="/img/no-item.png" alt="no-items" />
      <p className="text-center my-1 fs-4">No items in order</p>
    </div>
  );
  const onCancelOrder = async (id, orderId) => {
    cancelOrder(id, { orderId })
      .then(async ({ data }) => {
        await Swal.fire({
          title: "Canceled!",
          text: "Your order has been canceled.",
          icon: "success",
        });
        window.location.reload();
        // console.log(data);
      })
      .catch((err) => {});
  };

  return (
    <div id="purchase-order" className="h-100">
      {orders.length === 0 ? (
        <NoOrders />
      ) : (
        <>
          <div ref={orderTitle} className="order-title position-relative w-100">
            <NavLink className="order-title-item position-relative" to="all">
              Tất cả
            </NavLink>

            <NavLink
              onClick={handleToggle}
              className="order-title-item position-relative"
              to="pending"
            >
              Chờ xử lý
            </NavLink>

            <NavLink
              onClick={handleToggle}
              className="order-title-item position-relative"
              to="processing"
            >
              Đang xử lý
            </NavLink>

            <NavLink
              onClick={handleToggle}
              className="order-title-item position-relative"
              to="shipping"
            >
              Đang vận chuyển
            </NavLink>

            <NavLink
              onClick={handleToggle}
              className="order-title-item position-relative"
              to="success"
            >
              Hoàn thành
            </NavLink>

            <NavLink
              onClick={handleToggle}
              className="order-title-item position-relative"
              to="canceled"
            >
              Đã hủy
            </NavLink>

            {/* cần font-size thì mới hiện được chữ */}
            <i
              onClick={handleToggle}
              className={`fs-5 toggle-order-item icon fa-solid fa-chevron-${
                showNav ? "up" : "down"
              } `}
            ></i>

            <div className="animation position-absolute start-home"></div>
          </div>
          <div className="my-2">
            <Outlet context={[onCancelOrder, NoItemInOrder]} />
          </div>
        </>
      )}
    </div>
  );
};

export default PurchaseOrder;
