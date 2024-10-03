import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GetImageProduct,
  HandlePriceWithDiscount,
} from "../../share/utilities";

const Payment = () => {
  const [discountCodePrice, setDiscountCodePrice] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const cart = useSelector((state) => state.Cart.cart);
  const customer = useSelector((state) => state.Auth.login.currentCustomer);
  const isLoggedIn = useSelector((state) => state.Auth.login.isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
  }, [navigate, isLoggedIn]);

  useEffect(() => {
    const value =
      cart.totalPriceInCart + cart.deleveryPrice + discountCodePrice;
    setTotal(parseFloat(value).toFixed(2));
  }, [cart.deleveryPrice, cart.totalPriceInCart, discountCodePrice]);

  return (
    <section id="payment">
      <div className="container-fluid">
        <div className="title-payment mb-3 text-uppercase">
          <h4>Payment</h4>
        </div>
        <div className="wrapper">
          <div className="shipping-address">
            <p className="title text-capitalize">
              <i className="fa-solid fa-location-dot" />
              &nbsp; shipping address
            </p>
            <div className="info d-flex align-items-center justify-content-between flex-wrap">
              <div className="d-flex justify-content-start justify-content-sm-center flex-wrap">
                <div className="name-phone mx-4">
                  <p className="name">
                    <b>{customer.fullName}</b>
                  </p>
                  <p className="phone fw-14">
                    <i className="fa-solid fa-phone-volume me-1" />
                    {customer.phone}
                  </p>
                </div>
                <div className="address mx-4">
                  <p className="text-capitalize fw-bold">{customer.address}</p>
                  <p className="email fw-14">
                    <i className="fa-regular fa-envelope me-1" />
                    {customer.email}
                  </p>
                </div>
              </div>
              <button type="button" className="btn-change-info ms-auto ms-md-0">
                Change
                <i className="fa-solid fa-gear fa-lg ms-1" />
              </button>
            </div>
          </div>
          <div className="order">
            <p className="title text-capitalize">
              <i className="fa-solid fa-basket-shopping" />
              &nbsp; order
            </p>
            <div className="wrapper-payment-item table-responsive">
              <table id="payment-items" className="w-100">
                <thead>
                  <tr>
                    <th>Products</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.items?.map((item, index) => (
                    <tr key={item + index}>
                      <td className="item d-flex gap-3 align-items-center">
                        <div className="img-item">
                          <img
                            className="img-fluid"
                            src={GetImageProduct(item.img[0])}
                            alt={GetImageProduct(item.img[0])}
                          />
                        </div>
                        <div>
                          <p className="name">
                            <b>{item.name}</b>
                          </p>
                          <div className="info d-flex my-1 fs-12">
                            <p className="discount text-secondary me-2">
                              <del>$ {item.price}</del>
                            </p>
                            <p className="discount text-danger fw-bold me-2">
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
                      <td className="text-center text-nowrap">{item.qty}</td>
                      <td className="text-center text-nowrap">
                        $ {HandlePriceWithDiscount(item.price, item.discount)}
                      </td>
                      <td className="price text-danger fw-bold text-center text-nowrap">
                        ${" "}
                        {HandlePriceWithDiscount(item.price, item.discount) *
                          item.qty}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="method-of-payment d-flex align-items-center gap-4">
              <p className="m-0 content">
                <i class="fa-solid fa-money-check-dollar me-1"></i> Method of
                payment:
              </p>
              <div className="d-flex align-items-center gap-2">
                <input
                  type="radio"
                  name="method-of-payment"
                  value="bank"
                  id="bank"
                />
                <label htmlFor="bank">Bank</label>
              </div>
              <div className="d-flex align-items-center gap-2">
                <input
                  type="radio"
                  name="method-of-payment"
                  value="cash"
                  id="Cash"
                  defaultChecked="true"
                />
                <label htmlFor="Cash">Cash</label>
              </div>
            </div>

            <div className="wrapper-voucher">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-4 my-4">
                <div class="text-note">
                  <label htmlFor="text-note" className="me-4">
                    Note
                  </label>
                  <input
                    id="text-note"
                    type="text"
                    placeholder="Enter text ..."
                  />
                </div>
                <div className="d-flex">
                  <input
                    type="text"
                    className="voucher"
                    placeholder="Voucher"
                  />
                  <button
                    type="button"
                    className="btn-custom btn-apply text-uppercase"
                  >
                    APPLY
                  </button>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-end flex-wrap gap-2 gap-lg-5 my-4">
                <div className="text-center">
                  <p className="mb-0">
                    Total: &nbsp;
                    <span className="text-danger fw-bold">
                      $ {cart.totalPriceInCart}
                    </span>
                  </p>
                  <p className="mb-0">
                    (
                    {cart.length === 1
                      ? `${cart.items.length} item`
                      : `${cart.items.length} items`}
                    )
                  </p>
                </div>
                <div className="fs-4">
                  <p className="mb-0">+</p>
                </div>
                <div className="text-center">
                  <p className="mb-0">Delivery</p>
                  <p className="text-danger fw-bold mb-0">
                    $ {cart.deleveryPrice}
                  </p>
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
                <p className="fs-4 mb-0">=</p>
                <p className="text-danger fw-bold mb-0">$ {total}</p>
                <button
                  type="button"
                  className="btn-custom btn-buy text-uppercase"
                >
                  Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
