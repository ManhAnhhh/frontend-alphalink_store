import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const PurchaseOrder = () => {
  const orderTitle = useRef(null);

  const [showNav, setShowNav] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    if (showNav) {
      const heightOfAllItems = "280px";
      orderTitle.current.style.height = heightOfAllItems;
    } else {
      const heightOfFirstItem = "50px";
      orderTitle.current.style.height = heightOfFirstItem;
    }
  }, [showNav]);

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

  const handleToggle = (e) => {
    if (window.innerWidth > 1050) return setShowNav(false);
    setShowNav(!showNav);
  };
  return (
    <div id="purchase-order" className="h-100">
      <div ref={orderTitle} className="order-title position-relative w-100">
        <NavLink className="order-title-item position-relative" to="all">
          All
        </NavLink>

        <NavLink
          onClick={handleToggle}
          className="order-title-item position-relative"
          to="pending"
        >
          Pending
        </NavLink>

        <NavLink
          onClick={handleToggle}
          className="order-title-item position-relative"
          to="processing"
        >
          Processing
        </NavLink>

        <NavLink
          onClick={handleToggle}
          className="order-title-item position-relative"
          to="shipping"
        >
          Shipping
        </NavLink>

        <NavLink
          onClick={handleToggle}
          className="order-title-item position-relative"
          to="success"
        >
          Success
        </NavLink>

        <NavLink
          onClick={handleToggle}
          className="order-title-item position-relative"
          to="canceled"
        >
          Canceled
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
        <Outlet />
      </div>
    </div>
  );
};

export default PurchaseOrder;
