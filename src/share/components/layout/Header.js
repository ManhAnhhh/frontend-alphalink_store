import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loggedOut } from "../../../redux/reducers/auth";
import Swal from "sweetalert2";
import {
  GetImageProduct,
  GetImageCustomer,
  PopUp,
  HandlePriceWithDiscount,
} from "../../utilities";
import { useState, useEffect, useRef } from "react";
import {
  getProducts,
  getCustomers,
  deleteHeartItem, 
} from "../../../services/Api";
import Modal from "react-bootstrap/Modal";
import { updateHeart } from "../../../redux/reducers/heart";
const HeartModal = (props) => {
  const dispatch = useDispatch();
  const customerId = useSelector(
    (state) => state.Auth.login.currentCustomer.id
  );
  const navigate = useNavigate();
  const { heart, handleClose } = props;
  const handleClickNameItem = (prd_id) => {
    handleClose();
    navigate(`/product-detail/${prd_id}`);
  };
  const HandleDeleteItem = (prd_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        deleteHeartItem({ customerId, productId: prd_id })
          .then(({ data }) => {
            dispatch(updateHeart(data.data));
          })
          .catch((err) => {
            //console.log(err);
          });
      }
    });
  };
  return (
    <table id="modal-heart-body" className="w-100">
      <thead className="text-center">
        <tr>
          <th className="d-flex align-items-center gap-2 justify-content-center">
            <input type="checkbox" name="select-all" id="select-all" />
            <label className="text-capitalize" htmlFor="select-all">
              select all
            </label>
          </th>
          <th>Products</th>
          <th>
            <button
              type="button"
              className="btn-delete-selected bg-danger-subtle border border-danger mx-1"
            >
              Delete
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {heart?.map((item) => {
          return (
            <tr>
              <td className="text-center">
                <input type="checkbox" name="item-1" id="item-1" />
              </td>
              <td className="item d-flex gap-3 align-items-center">
                <div className="img-item">
                  <img
                    src={GetImageProduct(item.img[0])}
                    alt={GetImageProduct(item.img[0])}
                  />
                </div>
                <div>
                  <p
                    className="name m-0 fw-bold"
                    onClick={() => handleClickNameItem(item.prd_id)}
                  >
                    {item.name}
                  </p>
                  <div className="info d-flex my-1 fs-12">
                    <p className="discount text-secondary m-0 me-2">
                      <del>
                        $ {HandlePriceWithDiscount(item.price, item.discount)}
                      </del>
                    </p>
                    <p className="price text-danger fw-bold m-0 me-4">$1639</p>
                    <p className="color m-0">
                      Color: <b>{item.color[0]}</b>
                    </p>
                  </div>
                  <p className="text-success fw-bold m-0 fs-14">
                    <i
                      style={{ color: "#198754" }}
                      className="fa-regular fa-circle-check me-1"
                    />
                    In stock
                  </p>
                </div>
              </td>
              <td className="text-center delete-item">
                <i
                  className="fa-solid fa-trash-can"
                  onClick={() => HandleDeleteItem(item.prd_id)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const Header = () => {
  const suggestBoxRef = useRef(null);
  const [keyword, setKeyword] = useState("");
  const [customerLogin, setCustomerLogin] = useState({});
  const [products, setProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const [isShowSuggestBox, setIsShowSuggestBox] = useState(false);
  const [showHeartModal, setShowHeartModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const register = () => {
    navigate("/register");
  };
  const login = () => {
    navigate("/login");
  };
  const customer = useSelector((state) => state.Auth.login.currentCustomer);
  const heart = useSelector((state) => state?.Heart?.items);
  const totalProducsIncart =
    useSelector((state) => state?.Cart?.items?.length) || 0;
  const handleLogout = () => {
    dispatch(loggedOut());
    PopUp({
      type: "success",
      content: "Logout successfully",
    });
  };
  useEffect(() => {
    if (customer) {
      getCustomers().then(({ data }) => {
        setCustomerLogin(() => {
          return data.data.find((cus) => cus.email === customer.email);
        });
      });
    }
  }, [customer]);

  useEffect(() => {
    getProducts().then(({ data }) => setProducts(data.data));
  }, [keyword]);

  useEffect(() => {
    // Lắng nghe sự kiện nhấp chuột toàn trang
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Gỡ sự kiện khi component bị hủy
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOnClickProduct = (product) => {
    navigate(`/product-detail/${product._id}`, {
      state: { product },
    });
    setIsShowSuggestBox(false);
    // setKeyword("");
  };
  const handleInput = (value) => {
    setKeyword(value);
    if (value === "" || value === " ") {
      setIsShowSuggestBox(false);
      return;
    }
    const isProduct = products.some((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    if (isProduct) {
      setIsShowSuggestBox(true);
      setSearchProducts(() => {
        const results = products.filter((product) =>
          product.name.toLowerCase().includes(value.toLowerCase())
        );
        return results.sort((a, b) => b.sold - a.sold);
      });
    } else {
      setIsShowSuggestBox(false);
    }
  };

  const searchItems = (e) => {
    e.preventDefault();
    if (keyword === "" || keyword === " ") {
      PopUp({
        type: "warning",
        position: "top-center",
        content: "Please enter a search keyword",
      });
      return;
    }
    setIsShowSuggestBox(false);
    return navigate(`/search?keyword=${keyword}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsShowSuggestBox(false);
      return navigate(`/search?keyword=${keyword}`);
    }
  };

  const handleClickOutside = (e) => {
    // Kiểm tra xem có click ra ngoài suggest-search hay không
    if (suggestBoxRef.current && !suggestBoxRef.current.contains(e.target)) {
      setIsShowSuggestBox(false); // Ẩn hộp gợi ý khi bấm ra ngoài
    }
  };

  const handleClose = () => setShowHeartModal(false);
  return (
    <header>
      <section id="helper">
        <div className="container-fluid py-2 d-flex justify-content-end align-items-center gap-4">
          <div>
            <p>Help</p>
          </div>
          <div>
            <p>Vietnamese</p>
          </div>
          {customer != null && (
            <div className="full-name d-flex align-items-center gap-2 position-relative">
              <div className="img-customer d-none d-sm-inline-block">
                <img
                  src={GetImageCustomer(customerLogin?.picture)}
                  alt={customerLogin?._id}
                />
              </div>
              <p>
                <span className="d-none d-sm-inline-block me-1">Hello,</span>
                <span>{customer.fullName}</span>
                <i className="fa-solid fa-chevron-down fa-2xs ms-1" />
              </p>

              <ul className="sub-menu p-0 p-2 position-absolute top-100 end-0 border border-1">
                <li>
                  <a href="#">My Account</a>
                </li>
                <li>
                  <a href="#">My Orders</a>
                </li>
                <li>
                  <Link to="/" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </section>
      <section id="main-header">
        <div className="container-fluid py-4">
          <div className="row align-items-end">
            <div className="logo-top col-lg-4 col-md-12 col-sm-12 text-center text-lg-start mb-4 mb-lg-0">
              <Link to="/">
                <img
                  className="img-fluid"
                  src="/img/logo-top.png"
                  alt="logo-top"
                />
              </Link>
            </div>
            <div className="search-box position-relative col-lg-5 col-md-6 col-sm-12 mb-4 mb-md-0 d-flex justify-content-center">
              <input
                value={keyword}
                id="search"
                className="input py-2 px-3"
                type="search"
                name="search"
                placeholder="Search . . ."
                onChange={(e) => handleInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                id="btn-search"
                className="py-1 btn-custom"
                type="button"
                onClick={searchItems}
              >
                Search
              </button>
              {isShowSuggestBox && (
                <div
                  id="suggest-search"
                  className="position-absolute"
                  ref={suggestBoxRef}
                >
                  {searchProducts.map((product, index) => {
                    return (
                      index < 5 && (
                        <div
                          key={product._id}
                          className="item d-flex gap-2"
                          onClick={() => handleOnClickProduct(product)}
                        >
                          <div className="img-item d-flex align-items-center">
                            <img
                              src={GetImageProduct(product.img[0])}
                              alt={GetImageProduct(product.img[0])}
                            />
                          </div>
                          <div className="info-item w-100">
                            <p className="m-0 fw-bold">{product.name}</p>
                            <p className="m-0 fs-14">
                              <span className="text-decoration-line-through me-2">
                                $ {product.price}
                              </span>
                              <span className="text-danger fw-bold">
                                ${" "}
                                {product.price -
                                  (product.price * product.discount) / 100}
                              </span>
                            </p>
                          </div>
                        </div>
                      )
                    );
                  })}
                </div>
              )}
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 icon-home d-flex gap-4 justify-content-center">
              {customer ? (
                <>
                  <div
                    className="heart-icon py-1 mx-2"
                    onClick={() => setShowHeartModal(true)}
                  >
                    <i className="fa-regular fa-heart fa-2xl">
                      <span className="badge-custom badge-top-right">
                        {heart?.length || 0}
                      </span>
                    </i>
                  </div>

                  <div
                    className="cart-icon py-1 mx-2"
                    onClick={() => navigate(`/customer/${customer.id}/cart`)}
                  >
                    <i className="fa-solid fa-cart-shopping fa-2xl">
                      <span className="badge-custom badge-top-right">
                        {totalProducsIncart}
                      </span>
                    </i>
                  </div>
                </>
              ) : (
                <div>
                  <button
                    onClick={register}
                    className="btn-custom py-2 px-2 mx-2"
                  >
                    Sign Up
                  </button>
                  <button onClick={login} className="btn-custom py-2 px-2 mx-2">
                    Log in
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Modal
        size="lg"
        show={showHeartModal}
        onHide={() => setShowHeartModal(false)}
        dialogClassName="modal-90w"
        id="heart-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">
            My favorite products list
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="table-responsive wrapper-table">
          <HeartModal heart={heart} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </header>
  );
};

export default Header;
