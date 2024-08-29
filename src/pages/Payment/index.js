const Payment = () => {
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
            <div className="info d-flex align-items-center justify-content-evenly flex-wrap">
              <div className="d-flex justify-content-start justify-content-sm-center flex-wrap">
                <div className="name-phone mx-4">
                  <p className="name">
                    <b>Ngo Manh Anh</b>
                  </p>
                  <p className="phone fw-14">
                    <i className="fa-solid fa-phone-volume me-1" />
                    0123456789
                  </p>
                </div>
                <div className="address mx-4">
                  <p className="text-capitalize fw-bold">
                    Dai Mo - Ha Dong - Ha Noi
                  </p>
                  <p className="email fw-14">
                    <i className="fa-regular fa-envelope me-1" />
                    manhanh2k3@gmail.com
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
                <thead className="text-center">
                  <tr>
                    <th className="d-flex align-items-center gap-2 justify-content-center">
                      <input
                        type="checkbox"
                        name="select-all"
                        id="select-all"
                      />
                      <label className="text-capitalize" htmlFor="select-all">
                        select all
                      </label>
                    </th>
                    <th>Products</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>
                      <button
                        type="button"
                        className="btn-delete-selected bg-danger-subtle border border-danger"
                      >
                        Delete
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">
                      <input type="checkbox" name="item-1" id="item-1" />
                    </td>
                    <td className="item d-flex gap-3 align-items-center">
                      <div className="img-item">
                        <img
                          className="img-fluid"
                          src="./img/products/acer1.jpg"
                          alt = "acer"
                        />
                      </div>
                      <div>
                        <p className="name">
                          <b>Acer Aspire Go 15 Slim Laptop</b>
                        </p>
                        <div className="info d-flex my-1 fs-12">
                          <p className="discount text-secondary me-2">
                            <del>$1000</del>
                          </p>
                          <p className="price text-danger fw-bold me-4">
                            $1639
                          </p>
                          <p className="color">
                            Color: <b>Black</b>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex quantity justify-content-center">
                        <button>−</button>
                        <input type="number" min={1} defaultValue={1} />
                        <button>+</button>
                      </div>
                    </td>
                    <td className="price text-danger fw-bold text-center">
                      $1639
                    </td>
                    <td className="text-center delete-item">
                      <i className="fa-solid fa-trash-can" />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <input type="checkbox" name="item-1" id="item-1" />
                    </td>
                    <td className="item d-flex gap-3 align-items-center">
                      <div className="img-item">
                        <img
                          className="img-fluid"
                          src="./img/products/acer1.jpg"
                          alt = "acer"
                        />
                      </div>
                      <div>
                        <p className="name">
                          <b>Acer Aspire Go 15 Slim Laptop</b>
                        </p>
                        <div className="info d-flex my-1 fs-12">
                          <p className="discount text-secondary me-2">
                            <del>$1000</del>
                          </p>
                          <p className="price text-danger fw-bold me-4">
                            $1639
                          </p>
                          <p className="color">
                            Color: <b>Black</b>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex quantity justify-content-center">
                        <button>−</button>
                        <input type="number" min={1} defaultValue={1} />
                        <button>+</button>
                      </div>
                    </td>
                    <td className="price text-danger fw-bold text-center">
                      $1639
                    </td>
                    <td className="text-center delete-item">
                      <i className="fa-solid fa-trash-can" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="method-of-payment d-flex align-items-center gap-4">
              <p className="m-0">Method of payment:</p>
              <div className="d-flex align-items-center gap-2">
                <input
                  type="radio"
                  name="method-of-payment"
                  defaultValue="bank"
                  id="bank"
                />
                <label htmlFor="bank">Bank</label>
              </div>
              <div className="d-flex align-items-center gap-2">
                <input
                  type="radio"
                  name="method-of-payment"
                  defaultValue="Cash"
                  id="Cash"
                  defaultChecked="true"
                />
                <label htmlFor="Cash">Cash</label>
              </div>
            </div>
            <div className="wrapper-voucher">
              <div className="d-flex align-items-center justify-content-end flex-wrap gap-4 my-4">
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
                  <p>
                    Total: &nbsp;
                    <span className="text-danger fw-bold">$1639</span>
                  </p>
                  <p>(1 item)</p>
                </div>
                <div className="fs-4">
                  <p>+</p>
                </div>
                <div className="text-center">
                  <p>Delivery</p>
                  <p className="text-danger fw-bold">$1</p>
                </div>
                <div className="fs-4">
                  <p>+</p>
                </div>
                <div className="text-center">
                  <p>Discount</p>
                  <p className="text-danger fw-bold">$0</p>
                </div>
                <p className="fs-4">=</p>
                <p className="text-danger fw-bold">$1640</p>
                <button
                  type="button"
                  className="btn-custom btn-buy text-uppercase"
                >
                  Buy now
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
