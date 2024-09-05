const Cart = () => {
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
                  <th className="d-flex align-items-center gap-2 justify-content-center">
                    <input type="checkbox" name="select-all" id="select-all" />
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
                        src="/img/products/acer1.jpg"
                        alt="acer"
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
                        <p className="price text-danger fw-bold me-4">$1639</p>
                        <p className="color">
                          Color: <b>Black</b>
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex quantity justify-content-center">
                      <button>&minus;</button>
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
                        src=" /img/products/acer1.jpg"
                        alt=""
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
                        <p className="price text-danger fw-bold me-4">$1639</p>
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
        </div>
      </section>
      <section id="confirm">
        <div className="container-fluid">
          <div className="d-flex align-items-center justify-content-center flex-wrap gap-4">
            <p>
              <b>Buy 3 more item to get free shipping</b>
            </p>
            <div className="d-flex">
              <input type="text" className="voucher" placeholder="Voucher" />
              <button
                type="button"
                className="btn-custom btn-apply text-uppercase"
              >
                APPLY
              </button>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center flex-wrap gap-2 gap-lg-5">
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
            <button type="button" className="btn-custom btn-buy text-uppercase">
              Buy
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
