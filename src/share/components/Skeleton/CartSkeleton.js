import Skeleton from "react-loading-skeleton";
const CartSkeleton = () => {
  return (
    <>
      <section id="cart">
        <div className="container-fluid">
          <div className="title-cart mb-3 p-2 border border-0">
            <Skeleton width={240} height={36} style={{ borderRadius: "8px" }} />
          </div>

          <div className="wrapper-cart-item table-responsive">
            <table id="cart-items" className="w-100">
              <thead className="text-center">
                <tr>
                  <th className="select-all">
                    <div className="d-flex gap-2 ">
                    <Skeleton width={20} />
                    <Skeleton width={80} />
                    </div>
                  </th>
                  <th>
                    <Skeleton width={80} />
                  </th>
                  <th>
                    <Skeleton width={80} />
                  </th>
                  <th>
                    <Skeleton width={80} />
                  </th>
                  <th className="text-nowrap">
                    <div className="d-flex gap-2">
                    <Skeleton width={80} />
                    <Skeleton width={80} />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">
                    <Skeleton width={20} />
                  </td>
                  <td className="item d-flex gap-3 align-items-center">
                    <div className="img-item">
                      <Skeleton width={100} height={100} />
                    </div>
                    <div>
                      <p className="name fw-bold">
                        <Skeleton width={400} />
                      </p>
                      <div className="info d-flex my-1 fs-12 text-nowrap gap-3">
                        <Skeleton width={36} />
                        <Skeleton width={60} />
                        <Skeleton width={120} />
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <Skeleton width={36} />
                  </td>
                  <td className="price text-danger fw-bold text-center text-nowrap">
                    <Skeleton width={80} />
                  </td>
                  <td className="text-center delete-item">
                    <Skeleton width={20} />
                  </td>
                </tr>
                <tr>
                  <td className="text-center">
                    <Skeleton width={20} />
                  </td>
                  <td className="item d-flex gap-3 align-items-center">
                    <div className="img-item">
                      <Skeleton width={100} height={100} />
                    </div>
                    <div>
                      <p className="name fw-bold">
                        <Skeleton width={400} />
                      </p>
                      <div className="info d-flex my-1 fs-12 text-nowrap gap-3">
                        <Skeleton width={36} />
                        <Skeleton width={60} />
                        <Skeleton width={120} />
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <Skeleton width={36} />
                  </td>
                  <td className="price text-danger fw-bold text-center text-nowrap">
                    <Skeleton width={80} />
                  </td>
                  <td className="text-center delete-item">
                    <Skeleton width={20} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="confirm">
        <div className="container-fluid">
          <div className="d-flex justify-content-between flex-wrap">
            <div className="d-flex flex-fill fa-2xl return-home-icon align-items-center justify-content-center p-4 p-lg-0">
              <Skeleton width={36} />
            </div>
            <div>
              <div className="d-flex align-items-center justify-content-center justify-content-lg-between flex-wrap gap-2 gap-lg-4 mb-2 ">
                <p className="mb-0">
                  <Skeleton width={336} />
                </p>
                <div className="d-flex gap-2 align-items-center">
                  <Skeleton width={221} />
                  <Skeleton width={92} height={30} />
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center justify-content-md-between flex-wrap gap-3 gap-lg-5">
                <div className="text-center">
                  <Skeleton width={121} />
                  <Skeleton width={80} />
                </div>
                <Skeleton circle width={20} height={20} />
                <div className="text-center">
                  <Skeleton width={121} />
                  <Skeleton width={80} />
                </div>
                <Skeleton circle width={20} height={20} />
                <div className="text-center">
                  <Skeleton width={121} />
                  <Skeleton width={80} />
                </div>
                <Skeleton circle width={20} height={20} />
                <Skeleton width={121} />
                <Skeleton width={92} height={30} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartSkeleton;
