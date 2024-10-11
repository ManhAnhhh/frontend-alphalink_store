const Shipping = () => {
  return (
    <div id="shipping">
      <div className="list-order-items">
        <div className="item table-responsive">
          <div className="text-end">
            <div className="state-item my-2 d-inline-block btn btn-primary text-white">
              Shipping
            </div>
          </div>
          <table>
            <tr className="border-bottom boder-1">
              <td className="item-img">
                <img src="/img/products/acer1_1.jpg" alt="true" />
              </td>
              <td>
                <div className="mb-2">
                  Acer Aspire 3 A314-23P-R3QA Slim Laptop
                </div>
                <div className="d-flex gap-4">
                  <div className="fs-14">
                    Quantity:{" "}
                    <span className="ms-1 text-danger fw-bold">1</span>
                  </div>
                  <div className="fs-14">
                    Color: <span className="fw-bold">Black</span>
                  </div>
                </div>
              </td>
              <td className="ms-1 text-end text-danger fw-bold text-nowrap">
                $ 400
              </td>
            </tr>
            <tr className="border-bottom boder-1">
              <td className="item-img">
                <img src="/img/products/acer1_1.jpg" alt="true" />
              </td>
              <td>
                <div className="mb-2">
                  Acer Aspire 3 A314-23P-R3QA Slim Laptop
                </div>
                <div className="d-flex gap-4">
                  <div className="fs-14">
                    Quantity:{" "}
                    <span className="ms-1 text-danger fw-bold">1</span>
                  </div>
                  <div className="fs-14">
                    Color: <span className="fw-bold">Black</span>
                  </div>
                </div>
              </td>
              <td className="ms-1 text-end text-danger fw-bold text-nowrap">
                $ 400
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="text-end">
                Total:{" "}
                <span
                  className="text-danger fw-bold"
                  style={{ fontSize: "21px" }}
                >
                  $ 800
                </span>
              </td>
            </tr>
          </table>
          <button className="btn-custom py-1 my-2">Repuchase</button>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
