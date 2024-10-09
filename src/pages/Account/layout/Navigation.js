import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navigation = () => {
  const navigate = useNavigate();
  const customer_id = useSelector(
    (state) => state.Auth.login.currentCustomer.id
  );
  
  return (
    <>
      <Navbar id="nav-account" key="false" expand="false" className="mb-2">
        <Container fluid>
          <div
            style={{ fontSize: "18px", color: "var(--main-color) " }}
            className="title cursor-pointer"
            onClick={() => navigate(`/customer/${customer_id}/profiles`)}
          >
            <i className="fa-solid fa-house-user me-1" /> My Account
          </div>
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-false" />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-false"
            aria-labelledby="offcanvasNavbarLabel-expand-false"
            placement="start"
          >
            <Offcanvas.Header
              closeButton
              className="border-2 border-bottom border-primary-subtle"
            >
              <Offcanvas.Title
                style={{ color: "var(--main-color) " }}
                id="offcanvasNavbarLabel-expand-false"
                className="fw-bold "
              >
                My Account
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavLink to={`/customer/${customer_id}/profiles`} className="nav-item-account text-decoration-none">
                  Profiles
                </NavLink>
                <NavLink to={`/customer/${customer_id}/message`} className="nav-item-account text-decoration-none">
                  Message
                </NavLink>
                <NavLink
                  to={`/customer/${customer_id}/purchase_order`}
                  className="nav-item-account text-decoration-none"
                >
                  Purchase Order
                </NavLink>
                <NavLink
                  to={`/customer/${customer_id}/change_password`}
                  className="nav-item-account text-decoration-none"
                >
                  Change Password
                </NavLink>
                <span className="delete-acc text-danger">Delete Account</span>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
