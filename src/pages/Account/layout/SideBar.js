import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCustomers } from "../../../services/Api";
import { GetImageCustomer } from "../../../share/utilities";

const SideBar = () => {
  const location = useLocation();
  const isPurchasePath = location.pathname.includes("purchase");

  const [customer, setCustomer] = useState({});

  const customer_id = useSelector(
    (state) => state.Auth.login.currentCustomer.id
  );

  const customerName = useSelector(
    (state) => state.Auth.login.currentCustomer.fullName
  );
  useEffect(() => {
    getCustomers()
      .then(({ data }) =>
        setCustomer(() => data.data.find((c) => c._id === customer_id))
      )
      .catch((err) => {});
  }, [customer_id]);

  console.log(customer);

  return (
    <div id="side-bar" className="d-none d-lg-block">
      <div className="wrapper h-100">
        <div className="side-bar-top d-flex align-items-center py-2 gap-3 border-2 border-bottom border-secondary-subtle">
          <div>
            <img
              className="my-img"
              src={GetImageCustomer(customer?.picture)}
              alt="true"
            />
          </div>
          <div>
            <div className="fw-bold" style={{ lineHeight: "1.3" }}>
              {customerName}
            </div>
            <p className="m-0 fs-12">dynamic</p>
          </div>
        </div>
        <ul className="side-bar-bottom list-unstyled">
          <li>
            <NavLink
              className="side-bar-item fw-bold text-decoration-none d-inline-block"
              to={`/customer/${customer_id}/profiles`}
            >
              <i className="icon fa-regular fa-circle-user text-center me-1" />
              Tài khoản của tôi
            </NavLink>
          </li>
          <li>
            <NavLink
              className="side-bar-item fw-bold text-decoration-none d-inline-block"
              to={`/customer/${customer_id}/message`}
            >
              <i className="icon fa-regular fa-comments text-center me-1" />
              Tin nhắn
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`side-bar-item fw-bold text-decoration-none d-inline-block ${
                isPurchasePath && "active"
              } `}
              to={`/customer/${customer_id}/purchase_order/all`}
            >
              <i className="icon fa-solid fa-cart-arrow-down text-center me-1" />
              Đơn mua
            </NavLink>
          </li>
          <li>
            <NavLink
              className="side-bar-item fw-bold text-decoration-none d-inline-block"
              to={`/customer/${customer_id}/change_password`}
            >
              <i className="icon fa-solid fa-lock text-center me-1" />
              Đổi mật khẩu
            </NavLink>
          </li>
          <li>
            <span className="delete-acc d-inline-block fw-bold text-decoration-none text-danger">
              <i className="icon fa-solid fa-ban text-center me-1 text-danger"></i>
              Xóa tài khoản
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
