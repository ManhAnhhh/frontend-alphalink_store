import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteCartItem,
  getProducts,
  updateCartItems,
  deleteManyCartItem,
} from "../../services/Api";
import { GetImageProduct, LOADING_TIME } from "../../share/utilities";
import { HandlePriceWithDiscount } from "../../share/utilities";
import Swal from "sweetalert2";
import { updateCart } from "../../redux/reducers/cart";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import CartSkeleton from "../../share/components/Skeleton/CartSkeleton";

const Cart = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [deleveryPrice, setDeleveryPrice] = useState(15);
  const [isUpdateActive, setIsUpdateActive] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [discountCodePrice, setDiscountCodePrice] = useState(0);
  const [totalPriceInCart, setTotalPriceInCart] = useState(0);
  const [products, setProducts] = useState([]);
  const [checkedListItems, setCheckedListItems] = useState([]);
  const [total, setTotal] = useState(0);
  const customerId = params.id;
  const customerLogin = useSelector(
    (state) => state.Auth.login.currentCustomer
  );
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.Auth.login.isLoggedIn);
  let cart = useSelector((state) => state.Cart.items);

  // check user đã đăng nhập hay chưa
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
  }, [navigate, isLoggedIn]);

  useEffect(() => {
    getProducts()
      .then(({ data }) => {
        setTimeout(() => {
          setIsLoading(false);
        }, LOADING_TIME);
        setProducts(data.data);
      })
      .catch(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setTotalPriceInCart(() =>
      cart
        ?.reduce(
          (total, item) =>
            total +
            HandlePriceWithDiscount(item.price, item.discount) * item.qty,
          0
        )
        .toFixed(2)
    );
    setDeleveryPrice(() => {
      return cart?.length > 3 ? 0 : 15;
    });
  }, [cart]);

  useEffect(() => {
    const result =
      Number(totalPriceInCart) +
      Number(deleveryPrice) +
      Number(discountCodePrice);
    setTotal(parseFloat(result).toFixed(2));
  }, [totalPriceInCart, deleveryPrice, discountCodePrice]);
  console.log(checkedListItems);
  const handleDeleteItem = (prd_id, colorIndex) => {
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
        deleteCartItem(
          { customerId: customerLogin.id, productId: prd_id },
          { colorIndex }
        )
          .then(({ data }) => {
            dispatch(updateCart(data.data));
          })
          .catch((err) => {
            //console.log(err);
          });
        setCheckedListItems((prev) =>
          prev.filter((item) => item !== `${prd_id}&${colorIndex}`)
        );
        setIsUpdateActive(true);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleChangeQuantityItem = (id, value, colorIndex) => {
    if ((value === "" && value.length === 0) || value === 0) {
      handleDeleteItem(id, colorIndex);
      setIsUpdateActive(false);
      return;
    }
    if (value < 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid quantity",
      });
      setIsUpdateActive(false);
      return;
    }
    const product = products.find((p) => p._id === id);
    if (value >= product.stock) {
      Swal.fire({
        icon: "error",
        title: "Invalid quantity",
        text: `Quantity must be less than ${product.stock}`,
      });
      setIsUpdateActive(false);
      return;
    }
    setIsUpdateActive(true);
    cart = cart.map((item) => {
      if (item.prd_id === id && item.colorIndex === colorIndex) {
        return { ...item, qty: Number(value) };
      }
      return item;
    });
  };

  const handleUpdateCart = () => {
    updateCartItems(customerId, { cart }).then(({ data }) => {
      dispatch(updateCart(data.data));
      Swal.fire({
        icon: "success",
        title: "Update Cart Successfully",
      });
    });
  };

  const handleNoUpdateCart = () => {
    Swal.fire({
      icon: "error",
      title: "Invalid Value Item Cart",
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
      setCheckedListItems(
        cart.map((item) => `${item.prd_id}&${item.colorIndex}`)
      );
    } else setCheckedListItems([]);
  };

  const handleDeleteManyItems = (e) => {
    e.preventDefault();
    if (checkedListItems.length === 0) {
      Swal.fire({
        icon: "error",
        title: "No item selected",
      });
      return;
    }

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
        const data = JSON.stringify(
          checkedListItems.map((item) => {
            return {
              prd_id: item.slice(0, item.indexOf("&")),
              colorIndex: item.slice(item.indexOf("&") + 1),
            };
          })
        );
        const result = JSON.parse(data);
        deleteManyCartItem(customerId, result)
          .then(({ data }) => {
            dispatch(updateCart(data.data));
            Swal.fire({
              icon: "success",
              title: "Delete Items Successfully",
            });
            setCheckedListItems([]);
          })
          .catch((err) =>
            Swal.fire({
              icon: "success",
              title: "Error deleting",
              text: err.message || err,
            })
          );
      }
    });
  };
  if (cart?.length <= 0 || !cart) {
    return (
      <div className="container-fluid ">
        <div className="m-0 text-center pt-3 pb-2 bg-white rounded">
          <p>No items in cart</p>
          <button
            className="mx-auto btn-custom mb-3"
            type="button"
            onClick={() => navigate("/")}
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) return <CartSkeleton />;
  return (
    <>
      <section id="cart">
        <div className="container-fluid">
          <div className="title-cart mb-3 text-uppercase">
            <h4>Cart</h4>
          </div>
          <div className="wrapper-cart-item table-responsive">
            <table id="cart-items" className="w-100">
              <thead className="text-center">
                <tr>
                  <th className="d-flex align-items-center gap-2 justify-content-center select-all">
                    <input
                      checked={checkedListItems.length === cart.length}
                      type="checkbox"
                      name="select-all-cart"
                      id="select-all-cart"
                      onChange={handleCheckedAll}
                    />
                    <label
                      className="text-capitalize"
                      htmlFor="select-all-cart"
                    >
                      select all
                    </label>
                  </th>
                  <th>Products</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th className="text-nowrap">
                    {isUpdateActive ? (
                      <button
                        onClick={handleUpdateCart}
                        type="button"
                        className="btn-update bg-primary-subtle border border-primary mx-1"
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        onClick={handleNoUpdateCart}
                        type="button"
                        className="btn-no-update bg-secondary-subtle border border-secondary mx-1"
                      >
                        Update
                      </button>
                    )}

                    <button
                      type="button"
                      className={`border mx-1 ${
                        checkedListItems.length > 0
                          ? "btn-delete-selected bg-danger-subtle border-danger"
                          : "btn-not-delete-selected bg-secondary-subtle border-secondary"
                      }`}
                      onClick={handleDeleteManyItems}
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart?.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td className="text-center">
                        <input
                          checked={checkedListItems.includes(
                            `${item.prd_id}&${item.colorIndex}`
                          )}
                          value={`${item.prd_id}&${item.colorIndex}`}
                          type="checkbox"
                          name={`cbo-${item._id}`}
                          id={`cbo-${item._id}`}
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
                            className="name fw-bold"
                            onClick={() =>
                              navigate(`/product-detail/${item.prd_id}`)
                            }
                          >
                            {item.name}
                          </p>
                          <div className="info d-flex my-1 fs-12 text-nowrap">
                            <p className="discount text-secondary me-2">
                              <del>$ {item.price}</del>
                            </p>
                            <p className="price text-danger fw-bold me-4">
                              ${" "}
                              {HandlePriceWithDiscount(
                                item.price,
                                item.discount
                              )}
                            </p>
                            <p className="color">
                              Color: <b>{item.color[item.colorIndex]}</b>
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <input
                          onChange={(e) =>
                            handleChangeQuantityItem(
                              item.prd_id,
                              e.target.value,
                              item.colorIndex
                            )
                          }
                          name={`qty-${item.prd_id}`}
                          className="qty"
                          type="number"
                          min={1}
                          defaultValue={item.qty}
                        />
                      </td>
                      <td className="price text-danger fw-bold text-center text-nowrap">
                        ${" "}
                        {(
                          HandlePriceWithDiscount(item.price, item.discount) *
                          item.qty
                        ).toFixed(2)}
                      </td>
                      <td className="text-center delete-item">
                        <i
                          className="fa-solid fa-trash-can"
                          onClick={() =>
                            handleDeleteItem(item.prd_id, item.colorIndex)
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="confirm">
        <div className="container-fluid">
          <div className="d-flex justify-content-between flex-wrap">
            <div className="d-flex flex-fill fa-2xl return-home-icon align-items-center justify-content-center p-4 p-lg-0">
              <OverlayTrigger
                key={"bottom"}
                placement={"bottom"}
                overlay={
                  <Tooltip id={`tooltip-${"bottom"}`} className="fw-bold">
                    <span>Return Home</span>
                  </Tooltip>
                }
              >
                <i
                  onClick={() => navigate("/")}
                  className="fa-solid fa-arrow-rotate-left"
                ></i>
              </OverlayTrigger>
            </div>
            <div>
              <div className="d-flex align-items-center justify-content-center justify-content-lg-between flex-wrap gap-2 gap-lg-4 mb-2 ">
                <p className="mb-0">
                  <b>Buy more 3 items to get free shipping</b>
                </p>
                <div className="d-flex">
                  <input
                    type="text"
                    className="voucher"
                    placeholder="Voucher"
                    name="voucher"
                  />
                  <button
                    type="button"
                    className="btn-custom btn-apply text-uppercase"
                  >
                    APPLY
                  </button>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center justify-content-md-between flex-wrap gap-2 gap-lg-5">
                <div className="text-center">
                  <p className="mb-0">
                    Total: &nbsp;
                    <span className="text-danger fw-bold">
                      $ {totalPriceInCart}
                    </span>
                  </p>
                  <p className="mb-0">
                    (
                    {cart.length === 1
                      ? `${cart.length} item`
                      : `${cart.length} items`}
                    )
                  </p>
                </div>
                <div className="fs-4">
                  <p className="mb-0">+</p>
                </div>
                <div className="text-center">
                  <p className="mb-0">Delivery</p>
                  <p className="text-danger fw-bold mb-0">$ {deleveryPrice}</p>
                </div>
                <div className="fs-4">
                  <p className="mb-0">+</p>
                </div>
                <div className="text-center">
                  <p className="mb-0">Discount</p>
                  <p className="text-danger fw-bold mb-0">
                    $ {discountCodePrice}
                  </p>
                </div>
                <p className="fs-4">=</p>
                <p className="text-danger fw-bold mb-0">$ {total}</p>
                <button
                  type="button"
                  className="btn-custom btn-buy text-uppercase"
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
