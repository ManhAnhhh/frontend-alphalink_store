import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loggedOut } from "../../../redux/reducers/auth";
import Swal from "sweetalert2";
import { SyncLoader } from "react-spinners";
import {
  GetImageProduct,
  GetImageCustomer,
  PopUp,
  HandlePriceWithDiscount,
  LOADING_TIME,
  formattedPriceVND,
} from "../../utilities";
import { useState, useEffect, useRef } from "react";
import {
  getProducts,
  getCustomers,
  deleteHeartItem,
  deleteManyHeartItem,
} from "../../../services/Api";
import Modal from "react-bootstrap/Modal";
import { updateHeart, clearHeart } from "../../../redux/reducers/heart";
import { clearCart } from "../../../redux/reducers/cart";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const suggestBoxRef = useRef(null);
  let [searchParams] = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [customerLogin, setCustomerLogin] = useState({});
  const [products, setProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const [isShowSuggestBox, setIsShowSuggestBox] = useState(false);
  const [showHeartModal, setShowHeartModal] = useState(false);
  const [isLoadingSubMenu, setIsLoadingSubMenu] = useState(true);

  const customer = useSelector((state) => state.Auth.login.currentCustomer);
  const heart = useSelector((state) => state?.Heart?.items);

  const totalProducsIncart =
    useSelector((state) => state?.Cart?.cart?.items?.length) || 0;

  useEffect(() => {
    if (customer) {
      getCustomers()
        .then(({ data }) => {
          setCustomerLogin(() => {
            return data?.data?.find((cus) => cus.email === customer.email);
          });
        })
        .catch((err) => {});
    }
  }, [customer]);

  useEffect(() => {
    getProducts()
      .then(({ data }) => setProducts(data.data))
      .catch((err) => {});
  }, [keyword]);

  useEffect(() => {
    // Lắng nghe sự kiện nhấp chuột toàn trang
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Gỡ sự kiện khi component bị hủy
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    // Kiểm tra xem có click ra ngoài suggest-search hay không
    if (suggestBoxRef.current && !suggestBoxRef.current.contains(e.target)) {
      setIsShowSuggestBox(false); // Ẩn hộp gợi ý khi bấm ra ngoài
    }
  };

  const handleLogout = () => {
    dispatch(loggedOut());
    dispatch(clearHeart());
    dispatch(clearCart());
    PopUp({
      type: "success",
      content: "Đăng nhập thành công",
    });
  };

  const handleOnClickSearchProduct = (product) => {
    navigate(`/product-detail/${product._id}`);
    setIsShowSuggestBox(false);
    // setKeyword("");
  };

  const handleInput = (value) => {
    setIsLoadingSubMenu(true);
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

      setTimeout(() => {
        setIsLoadingSubMenu(false);
      }, LOADING_TIME);

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
    if (keyword.trim() === "") {
      PopUp({
        type: "warning",
        position: "top-center",
        content: "Hãy điền từ khóa",
      });
      return;
    }
    setIsShowSuggestBox(false);
    return navigate(`/search?keyword=${keyword}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (keyword.trim() === "") {
        PopUp({
          type: "warning",
          position: "top-center",
          content: "Hãy điền từ khóa",
        });
        return;
      }
      setIsShowSuggestBox(false);
      return navigate(`/search?keyword=${keyword}`);
    }
  };

  const handleClose = () => setShowHeartModal(false);

  return (
    <header>
      <section id="helper">
        <div className="container-fluid py-2 d-flex justify-content-end align-items-center gap-4">
          <div>
            <p>Hỗ trợ</p>
          </div>
          <div>
            <p>Tiếng Việt</p>
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
                <i className="icon fa-solid fa-chevron-down fa-2xs ms-1" />
              </p>

              <ul className="sub-menu p-0 p-2 position-absolute top-100 end-0 border border-1">
                <li>
                  <Link
                    to={`/customer/${customerLogin?._id}/profiles`}
                    className="d-flex align-items-center gap-2"
                  >
                    Tài khoản của tôi
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/customer/${customerLogin?._id}/purchase_order/all`}
                    className="d-flex align-items-center gap-2"
                  >
                    Đơn mua
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={handleLogout}>
                    Đăng xuất
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
                autoComplete="off"
                value={keyword}
                id="search"
                className="input py-2 px-3"
                type="search"
                name="search"
                placeholder="Nhập từ khóa . . ."
                onChange={(e) => handleInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                id="btn-search"
                className="py-1 btn-custom"
                type="button"
                onClick={searchItems}
              >
                Tìm kiếm
              </button>
              {isShowSuggestBox && (
                <div
                  id="suggest-search"
                  className={`position-absolute ${
                    isLoadingSubMenu ? "text-center" : ""
                  }`}
                  ref={suggestBoxRef}
                >
                  {isLoadingSubMenu ? (
                    <SyncLoader color="#ebebeb" size={10} />
                  ) : (
                    <>
                      {searchProducts.map((product, index) => {
                        return (
                          index < 5 && (
                            <div
                              key={product._id}
                              className="item d-flex gap-2"
                              onClick={() =>
                                handleOnClickSearchProduct(product)
                              }
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
                                    {formattedPriceVND(product.price)}
                                  </span>
                                  <span className="text-danger fw-bold">
                                    {formattedPriceVND(
                                      HandlePriceWithDiscount(
                                        product.price,
                                        product.discount
                                      )
                                    )}
                                  </span>
                                </p>
                              </div>
                            </div>
                          )
                        );
                      })}
                    </>
                  )}
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
                    <i className="icon fa-solid fa-heart fa-2xl"></i>
                    <span className="badge-custom badge-top-right">
                      {heart?.length || 0}
                    </span>
                  </div>

                  <div
                    className="cart-icon py-1 mx-2"
                    onClick={() => navigate(`/customer/${customer.id}/cart`)}
                  >
                    <i className="icon fa-solid fa-cart-shopping fa-2xl"></i>
                    <span className="badge-custom badge-top-right">
                      {totalProducsIncart}
                    </span>
                  </div>
                </>
              ) : (
                <div>
                  <button
                    onClick={() => navigate("customer/login")}
                    className="btn-custom py-2 px-2 mx-2"
                  >
                    Đăng nhập
                  </button>
                  <button
                    onClick={() => navigate("customer/register")}
                    className="btn-custom py-2 px-2 mx-2"
                  >
                    Đăng ký
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
          <Modal.Title className="modal-title">Sản phẩm yêu thích</Modal.Title>
        </Modal.Header>
        <Modal.Body className="table-responsive wrapper-table">
          <HeartModal heart={heart} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </header>
  );
};

const HeartModal = (props) => {
  const { heart, handleClose } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [checkedListItems, setCheckedListItems] = useState([]);

  const customerId = useSelector(
    (state) => state.Auth.login.currentCustomer.id
  );

  const handleClickNameItem = (prd_id) => {
    handleClose();
    navigate(`/product-detail/${prd_id}`);
  };

  const HandleDeleteItem = (prd_id) => {
    Swal.fire({
      title: "Bạn có muốn xóa không ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
      cancelButtonText: "Không",
    }).then((result) => {
      if (result.isConfirmed) {
        setCheckedListItems((prev) => prev.filter((item) => item !== prd_id));
        deleteHeartItem({ customerId, productId: prd_id })
          .then(({ data }) => {
            dispatch(updateHeart(data.data));
          })
          .catch((err) => {
            //console.log(err);
          });
        Swal.fire({
          title: "Xóa thành công!",
          icon: "success",
        });
      }
    });
  };

  const handleCheckedItemCart = (e) => {
    const isChecked = e.target.checked;
    const value = e.target.value;
    if (isChecked) {
      setCheckedListItems((prev) => [...prev, value]);
    } else {
      setCheckedListItems((prev) => prev.filter((item) => item !== value));
    }
  };

  const handleCheckedAll = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setCheckedListItems(heart.map((item) => item.prd_id));
    } else setCheckedListItems([]);
  };

  const handleDeleteManyItems = (e) => {
    e.preventDefault();
    if (checkedListItems.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Hãy chọn sản phẩm để xóa",
      });
      return;
    }

    Swal.fire({
      title: "Bạn có muốn xóa không ?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
      cancelButtonText: "Không",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteManyHeartItem(customerId, checkedListItems)
          .then(({ data }) => {
            dispatch(updateHeart(data.data));
            Swal.fire({
              icon: "success",
              title: "Xóa thành công",
            });
            setCheckedListItems([]);
          })
          .catch((err) =>
            Swal.fire({
              icon: "success",
              title: "Xóa thất bại",
              text: err.message || err,
            })
          );
      }
    });
  };

  if (heart.length === 0) {
    return (
      <div className="text-center">Không có sản phẩm nào được yêu thích</div>
    );
  }

  return (
    <table id="modal-heart-body" className="w-100">
      <thead className="text-center">
        <tr>
          <th className="d-flex align-items-center gap-2 justify-content-center">
            <input
              checked={checkedListItems.length === heart.length}
              type="checkbox"
              name="select-all-heart"
              id="select-all-heart"
              onChange={handleCheckedAll}
            />
            <label
              className="text-capitalize text-nowrap"
              htmlFor="select-all-heart"
            >
              Chọn tất cả
            </label>
          </th>
          <th>Sản phẩm</th>
          <th>
            <button
              type="button"
              className={`border mx-1 ${
                checkedListItems.length > 0
                  ? "btn-delete-selected bg-danger-subtle border-danger"
                  : "btn-not-delete-selected bg-secondary-subtle border-secondary"
              }`}
              onClick={handleDeleteManyItems}
            >
              Xóa
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {heart?.map((item, index) => {
          return (
            <tr key={item._id}>
              <td className="text-center">
                <input
                  checked={checkedListItems.includes(item.prd_id)}
                  value={item.prd_id}
                  type="checkbox"
                  name={`chk-heart-${index}`}
                  id={`chk-heart-${index}`}
                  onChange={handleCheckedItemCart}
                />
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
                        {formattedPriceVND(
                          HandlePriceWithDiscount(item.price, item.discount)
                        )}
                      </del>
                    </p>
                    <p className="price text-danger fw-bold m-0 me-4">
                      {formattedPriceVND(item.price)}
                    </p>
                    <p className="color m-0">
                      Màu sắc: <b>{item.color[0]}</b>
                    </p>
                  </div>
                  <p className="text-success fw-bold m-0 fs-14">
                    <i
                      style={{ color: "#198754" }}
                      className="fa-regular fa-circle-check me-1"
                    />
                    Còn hàng
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
export default Header;
