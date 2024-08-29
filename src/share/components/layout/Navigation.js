import { NavLink } from "react-router-dom";
const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <button
          className="navbar-toggler my-2 ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav">
            <li className="nav-item rounded-pill">
              <NavLink className="nav-link fw-medium" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item rounded-pill fw-medium dropdown">
              <span
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Laptop
              </span>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/category">
                    Apple
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/">
                    ASUS
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/category">
                    Dell
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/category">
                    HP
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/category">
                    Lenovo
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/category">
                    Acer
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item rounded-pill fw-medium dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Phone
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="#">
                    Apple
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="#">
                    OPPO
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="#">
                    IPhone
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="#">
                    Samsung
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="#">
                    Huawei
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item rounded-pill">
              <NavLink className="nav-link fw-medium" to="#">
                Tablets
              </NavLink>
            </li>
            <li className="nav-item rounded-pill">
              <NavLink className="nav-link fw-medium" to="#">
                Mouse
              </NavLink>
            </li>
            <li className="nav-item rounded-pill">
              <NavLink className="nav-link fw-medium" to="#">
                Headphones
              </NavLink>
            </li>
            <li className="nav-item rounded-pill">
              <NavLink className="nav-link fw-medium" to="#">
                Keyboards
              </NavLink>
            </li>
            <li className="nav-item rounded-pill">
              <NavLink className="nav-link fw-medium" to="#">
                Smart Watches
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
