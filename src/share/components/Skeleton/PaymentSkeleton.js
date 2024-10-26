import Skeleton from "react-loading-skeleton";

const PaymentSkeleton = () => {
  return (
    <section id="payment">
      <div className="container-fluid">
        <div className="title-payment mb-3 p-2 border border-0">
          <Skeleton width={240} height={36} style={{ borderRadius: "8px" }} />
        </div>
        <div className="wrapper">
          <div className="shipping-address">
            <p className="title border-secondary-subtle">
              <Skeleton
                width={180}
                height={36}
                style={{ borderRadius: "8px" }}
              />
            </p>
            <div className="info d-flex align-items-center justify-content-between flex-wrap">
              <div className="d-flex justify-content-start justify-content-sm-center flex-wrap">
                <div className="name-phone mx-4">
                  <Skeleton
                    width={240}
                    height={36}
                    style={{ borderRadius: "8px", marginBottom: "12px" }}
                  />
                  <Skeleton
                    width={240}
                    height={36}
                    style={{ borderRadius: "8px" }}
                  />
                </div>
                <div className="address mx-4">
                  <Skeleton
                    width={240}
                    height={36}
                    style={{ borderRadius: "8px", marginBottom: "12px" }}
                  />
                  <p className="email fw-14">
                    <Skeleton
                      width={240}
                      height={36}
                      style={{ borderRadius: "8px" }}
                    />
                  </p>
                </div>
              </div>
              <Skeleton
                width={100}
                height={36}
                style={{ borderRadius: "8px" }}
              />
            </div>
          </div>
          <div className="order">
            <p className="title border-secondary-subtle">
              <Skeleton
                width={180}
                height={36}
                style={{ borderRadius: "8px" }}
              />
            </p>
            <div className="wrapper-payment-item table-responsive">
              <table id="payment-items" className="w-100">
                <thead>
                  <tr>
                    <th>
                      <Skeleton
                        width={160}
                        height={32}
                        style={{ borderRadius: "8px" }}
                      />
                    </th>
                    <th className="text-center">
                      <Skeleton
                        width={80}
                        height={32}
                        style={{ borderRadius: "8px" }}
                      />
                    </th>
                    <th className="text-center">
                      <Skeleton
                        width={80}
                        height={32}
                        style={{ borderRadius: "8px" }}
                      />
                    </th>
                    <th className="text-center">
                      <Skeleton
                        width={80}
                        height={32}
                        style={{ borderRadius: "8px" }}
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array(2)
                    .fill()
                    .map(() => (
                      <tr key={Date.now() + Math.random()}>
                        <td className="item d-flex gap-3 align-items-center">
                          <div className="img-item">
                            <Skeleton width={100} height={100} />
                          </div>
                          <div>
                            <Skeleton width={300} height={20} />
                            <div className="info d-flex my-1 fs-12 gap-2">
                              <Skeleton width={36} />
                              <Skeleton width={36} />
                              <Skeleton width={36} />
                            </div>
                          </div>
                        </td>
                        <td className="text-center text-nowrap">
                          <Skeleton width={20} height={20} />
                        </td>
                        <td className="text-center text-nowrap">
                          <Skeleton width={20} height={20} />
                        </td>
                        <td className="price text-danger fw-bold text-center text-nowrap">
                          <Skeleton width={20} height={20} />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="method-of-payment d-flex align-items-center gap-4 border-secondary-subtle">
              <p>
                <Skeleton
                  width={210}
                  height={36}
                  style={{ borderRadius: "8px" }}
                />
              </p>
            </div>

            <div className="wrapper-voucher">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-4 my-4">
                <div className="text-note d-flex gap-2">
                  <Skeleton
                    width={60}
                    height={36}
                    style={{ borderRadius: "8px" }}
                  />
                  <Skeleton
                    width={200}
                    height={36}
                    style={{ borderRadius: "8px" }}
                  />
                </div>
                <div className="d-flex gap-2">
                  <Skeleton
                    width={200}
                    height={36}
                    style={{ borderRadius: "8px" }}
                  />
                  <Skeleton
                    width={86}
                    height={36}
                    style={{ borderRadius: "8px" }}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-end flex-wrap gap-2 gap-lg-5 my-4">
                <div className="text-center">
                  <Skeleton
                    width={80}
                    height={20}
                    style={{ borderRadius: "8px" }}
                  />

                  <Skeleton
                    width={36}
                    height={20}
                    style={{ borderRadius: "8px" }}
                  />
                </div>
                <div>
                  <Skeleton width={20} height={20} />
                </div>
                <div className="text-center">
                  <Skeleton
                    width={80}
                    height={20}
                    style={{ borderRadius: "8px" }}
                  />

                  <Skeleton
                    width={36}
                    height={20}
                    style={{ borderRadius: "8px" }}
                  />
                </div>
                <div>
                  <Skeleton width={20} height={20} />
                </div>
                <div className="text-center">
                  <Skeleton
                    width={80}
                    height={20}
                    style={{ borderRadius: "8px" }}
                  />

                  <Skeleton
                    width={36}
                    height={20}
                    style={{ borderRadius: "8px" }}
                  />
                </div>
                <div>
                  <Skeleton width={20} height={20} />
                </div>
                <Skeleton
                  width={100}
                  height={36}
                  style={{ borderRadius: "8px" }}
                />
                <Skeleton
                  width={100}
                  height={36}
                  style={{ borderRadius: "8px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSkeleton;
