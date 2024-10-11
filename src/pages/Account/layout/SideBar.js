import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const SideBar = () => {
  const location = useLocation();
  const isPurchasePath = location.pathname.includes("purchase");

  const customer_id = useSelector(
    (state) => state.Auth.login.currentCustomer.id
  );

  return (
    <div id="side-bar" className="d-none d-lg-block">
      <div className="wrapper h-100">
        <div className="side-bar-top d-flex align-items-center py-2 gap-3 border-2 border-bottom border-secondary-subtle">
          <img className="my-img" src="/img/linhh.jpg" alt="true" />
          <div>
            <div className="fw-bold text-nowrap">Ngo Manh Anh</div>
            <p className="m-0 fs-12">Manage my profiles</p>
          </div>
        </div>
        <ul className="side-bar-bottom list-unstyled">
          <li>
            <NavLink
              className="side-bar-item fw-bold text-decoration-none d-inline-block"
              to={`/customer/${customer_id}/profiles`}
            >
              <i className="icon fa-regular fa-circle-user text-center me-1" />
              My Profiles
            </NavLink>
          </li>
          <li>
            <NavLink
              className="side-bar-item fw-bold text-decoration-none d-inline-block"
              to={`/customer/${customer_id}/message`}
            >
              <i className="icon fa-regular fa-comments text-center me-1" />
              Message
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
              Purchase Order
            </NavLink>
          </li>
          <li>
            <NavLink
              className="side-bar-item fw-bold text-decoration-none d-inline-block"
              to={`/customer/${customer_id}/change_password`}
            >
              <i className="icon fa-solid fa-lock text-center me-1" />
              Change Password
            </NavLink>
          </li>
          <li>
            <span className="delete-acc d-inline-block fw-bold text-decoration-none text-danger">
              <i className="icon fa-solid fa-ban text-center me-1 text-danger"></i>
              Delete Account
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
