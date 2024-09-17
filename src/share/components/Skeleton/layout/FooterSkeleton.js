import Skeleton from "react-loading-skeleton";
function FooterSkeleton() {
  return (
    <footer className="pt-4">
      <section className="support d-flex flex-wrap gap-4 justify-content-center align-items-center my-4">
        <Skeleton baseColor={"#fff"} width={70} />
        <Skeleton baseColor={"#fff"} width={70} />
        <Skeleton baseColor={"#fff"} width={70} />
        <Skeleton baseColor={"#fff"} width={70} />
      </section>
      <section className="footer-b bg-white text-light py-4">
        <div className="container-fluid py-2 gap-4">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 ">
              <div className="w-100 h-100" style={{ minHeight: "82px" }}>
                <Skeleton style={{ width: "100%", height: "100%" }} />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 mt-2">
              <div className="title fs-5 border border-0">
                <Skeleton style={{ width: "200px" }} />
              </div>
              <ul className="mb-1">
                <li className="fs-14">
                  <Skeleton style={{ width: "100%" }} />
                </li>
                <li className="fs-14">
                  <Skeleton style={{ width: "100%" }} />
                </li>
                <li className="fs-14">
                  <Skeleton style={{ width: "100%" }} />
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 mt-2 ">
              <div className="title fs-5 border border-0">
                <Skeleton style={{ width: "200px" }} />
              </div>
              <ul className="mb-1">
                <li className="fs-14">
                  <Skeleton style={{ width: "100%" }} />
                </li>
                <li className="fs-14">
                  <Skeleton style={{ width: "100%" }} />
                </li>
                <li className="fs-14">
                  <Skeleton style={{ width: "100%" }} />
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 mt-2 ">
              <div className="title fs-5 border border-0">
                <Skeleton style={{ width: "200px" }} />
              </div>
              <ul className="mb-1">
                <li className="fs-14">
                  <Skeleton style={{ width: "100%" }} />
                </li>
                <li className="fs-14">
                  <Skeleton style={{ width: "100%" }} />
                </li>
                <li className="fs-14">
                  <Skeleton style={{ width: "100%" }} />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Skeleton width={300} />
        </div>
      </section>
    </footer>
  );
}

export default FooterSkeleton;
