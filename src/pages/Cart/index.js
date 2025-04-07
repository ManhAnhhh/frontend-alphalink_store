import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  deleteCartItem,
  getProducts,
  updateCartItems,
  deleteManyCartItem,
} from "../../services/Api";
import {
  formattedPriceVND,
  GetImageProduct,
  HandlePriceWithDiscount,
} from "../../share/utilities";
import Swal from "sweetalert2";
import { updateCart } from "../../redux/reducers/cart";
import CartSkeleton from "../../share/components/Skeleton/CartSkeleton";

const Cart = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uniqueId = uuid();

  const [isUpdateActive, setIsUpdateActive] = useState(true);
  const [discountCodePrice, setDiscountCodePrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [checkedListItems, setCheckedListItems] = useState([]);

  const customerLogin = useSelector(
    (state) => state.Auth.login.currentCustomer
  );
  const cart = useSelector((state) => state.Cart.cart);
  const isLoading = useSelector((state) => state.Loading.isLoading);

  const customerId = params.id;
  let items = [...cart.items];
  useEffect(() => {
    getProducts()
      .then(({ data }) => {
        setProducts(data.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const value =
      parseFloat(cart.totalPriceInCart) +
      parseFloat(cart.deleveryPrice) +
      parseFloat(discountCodePrice);
    setTotal(parseFloat(value.toFixed(2)));
  }, [cart.deleveryPrice, cart.totalPriceInCart, discountCodePrice]);

  const handleDeleteItem = (prd_id, colorIndex) => {
    Swal.fire({
      title: "Bạn có muốn xóa không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
      cancelButtonText: "Không",
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
          title: "Xóa thành công!",
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
        title: "Số lượng không hợp lệ",
      });
      setIsUpdateActive(false);
      return;
    }
    const product = products.find((p) => p._id === id);
    if (value >= product.stock) {
      Swal.fire({
        icon: "error",
        title: "Số lượng không hợp lệ",
        text: `Số lượng phải nhỏ hơn ${product.stock}`,
      });
      setIsUpdateActive(false);
      return;
    }
    setIsUpdateActive(true);
    items = items.map((item) => {
      if (item.prd_id === id && item.colorIndex === colorIndex) {
        return { ...item, qty: Number(value) };
      }
      return item;
    });
  };

  const handleUpdateCart = () => {
    updateCartItems(customerId, { cart: items }).then(({ data }) => {
      dispatch(updateCart(data.data));
      Swal.fire({
        icon: "success",
        title: "Đơn hàng của bạn đã được cập nhật",
      });
    });
  };

  const handleNoUpdateCart = () => {
    Swal.fire({
      icon: "error",
      title: "Giá trị không hợp lệ",
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
        items.map((item) => `${item.prd_id}&${item.colorIndex}`)
      );
    } else setCheckedListItems([]);
  };

  const handleDeleteManyItems = (e) => {
    e.preventDefault();
    if (checkedListItems.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Không có sản phẩm nào được chọn",
      });
      return;
    }

    Swal.fire({
      title: "Bạn có muốn xóa không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
      cancelButtonText: "Không",
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
        const resultOfData = JSON.parse(data);
        deleteManyCartItem(customerId, resultOfData)
          .then(({ data }) => {
            dispatch(updateCart(data.data));
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

  if (isLoading) return <CartSkeleton />;

  if (items?.length <= 0) {
    return (
      <div className="container-fluid ">
        <div className="my-2 text-center pt-3 pb-2 bg-white rounded">
          <p>Không có sản phẩm nào trong giỏ hàng</p>
          <button
            className="mx-auto btn-custom mb-3"
            type="button"
            onClick={() => navigate("/")}
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <section id="cart" className="my-2">
        <div className="container-fluid">
          <div className="title-cart mb-3 text-uppercase">
            <h4>Giỏ hàng</h4>
          </div>
          <div className="wrapper-cart-item table-responsive">
            <table id="cart-items" className="w-100">
              <thead className="text-center">
                <tr>
                  <th className="d-flex align-items-center gap-2 justify-content-center select-all">
                    <input
                      checked={checkedListItems.length === items.length}
                      type="checkbox"
                      name="select-all-cart"
                      id="select-all-cart"
                      onChange={handleCheckedAll}
                    />
                    <label htmlFor="select-all-cart">
                      Chọn tất cả ({items.length})
                    </label>
                  </th>
                  <th>Sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Giá tiền</th>
                  <th className="text-nowrap">
                    {isUpdateActive ? (
                      <button
                        onClick={handleUpdateCart}
                        type="button"
                        className="btn-update bg-primary-subtle border border-primary mx-1"
                      >
                        Cập nhật
                      </button>
                    ) : (
                      <button
                        onClick={handleNoUpdateCart}
                        type="button"
                        className="btn-no-update bg-secondary-subtle border border-secondary mx-1"
                      >
                        Cập nhật
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
                      Xóa
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {items?.map((item) => {
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
                              Màu sắc: <b>{item.color[item.colorIndex]}</b>
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
                        {parseFloat(
                          (
                            HandlePriceWithDiscount(item.price, item.discount) *
                            item.qty
                          ).toFixed(2)
                        )}
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
          <div className="d-flex justify-content-center flex-wrap">
            <div>
              <div className="d-flex align-items-center justify-content-center justify-content-lg-between flex-wrap gap-2 gap-lg-4 mb-2 ">
                <p className="mb-0">
                  <b>Mua từ 3 sản phẩm trở lên được miễn phí vận chuyển</b>
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
                    Xác nhận
                  </button>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center justify-content-md-between flex-wrap gap-2 gap-lg-5">
                <div className="text-center">
                  <p className="mb-0">
                    Thành tiền: &nbsp;
                    <span className="text-danger fw-bold">
                      {formattedPriceVND(cart.totalPriceInCart)}
                    </span>
                  </p>
                  <p className="mb-0">({items.length} sản phẩm)</p>
                </div>
                <div className="fs-4">
                  <p className="mb-0">+</p>
                </div>
                <div className="text-center">
                  <p className="mb-0">Phí vận chuyển</p>
                  <p className="text-danger fw-bold mb-0">
                    {formattedPriceVND(cart.deleveryPrice)}
                  </p>
                </div>
                <div className="fs-4">
                  <p className="mb-0">+</p>
                </div>
                <div className="text-center">
                  <p className="mb-0">Mã giảm giá</p>
                  <p className="text-danger fw-bold mb-0">
                    {formattedPriceVND(discountCodePrice)}
                  </p>
                </div>
                <p className="fs-4">=</p>
                <p className="text-danger fw-bold mb-0">
                  {formattedPriceVND(total)}
                </p>
                <button
                  type="button"
                  className="btn-custom btn-buy text-uppercase"
                  onClick={() => navigate(`/payment/${uniqueId}`)}
                >
                  Mua hàng
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
