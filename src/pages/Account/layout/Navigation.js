import { useState } from "react";
import { Navbar, Container, Offcanvas, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const customer_id = useSelector(
    (state) => state.Auth.login.currentCustomer.id
  );

  return (
    <Navbar id="nav-account" expand="false" className="mb-2">
      <Container fluid>
        <div
          style={{ fontSize: "18px", color: "var(--main-color) " }}
          className="title cursor-pointer"
          onClick={() => navigate(`/customer/${customer_id}/profiles`)}
        >
          <i className="icon fa-solid fa-house-user me-1" /> Quản lý tài khoản
        </div>
        <Navbar.Toggle
          aria-controls="offcanvasNavbar-expand-false"
          onClick={handleShow}
        />
        <Navbar.Offcanvas
          show={show}
          onHide={handleClose}
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
              className="fw-bold"
            >
              Quản lý tài khoản
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <NavLink
                to={`/customer/${customer_id}/profiles`}
                className="nav-item-account text-decoration-none"
                onClick={handleClose} // Đóng offcanvas khi click
              >
                Tài khoản của tôi
              </NavLink>
              <NavLink
                to={`/customer/${customer_id}/message`}
                className="nav-item-account text-decoration-none"
                onClick={handleClose} // Đóng offcanvas khi click
              >
                Tin nhắn
              </NavLink>
              <NavLink
                to={`/customer/${customer_id}/purchase_order`}
                className="nav-item-account text-decoration-none"
                onClick={handleClose} // Đóng offcanvas khi click
              >
                Đơn mua
              </NavLink>
              <NavLink
                to={`/customer/${customer_id}/change_password`}
                className="nav-item-account text-decoration-none"
                onClick={handleClose} // Đóng offcanvas khi click
              >
                Đổi mật khẩu
              </NavLink>
              <span className="delete-acc text-danger">Xóa tài khoản</span>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Navigation;
