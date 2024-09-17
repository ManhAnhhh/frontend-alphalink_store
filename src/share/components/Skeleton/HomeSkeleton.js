import Skeleton from "react-loading-skeleton";
import PrdItemSkeleton from "./PrdItemSkeleton";

const HomeSkeleton = () => {
  return (
    <>
      <section id="best-seler">
        <div className="container-fluid">
          <h2 className="title-product border-0 rounded">
            <Skeleton />
          </h2>

          <div className="p-2 row">
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="bg-white p-2 rounded my-2 ">
                <PrdItemSkeleton />
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 d-none d-sm-block">
              <div className="bg-white p-2 rounded my-2 ">
                <PrdItemSkeleton />
              </div>
            </div>
            <div className="col-lg-3 col-md-4 d-none d-md-block">
              <div className="bg-white p-2 rounded my-2 ">
                <PrdItemSkeleton />
              </div>
            </div>
            <div className="col-lg-3 d-none d-lg-block">
              <div className="bg-white p-2 rounded my-2 ">
                <PrdItemSkeleton />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="feature-products">
        <div className="container-fluid">
          <h2 className="title-product border-0 rounded">
            <Skeleton />
          </h2>
          <div className="items row">
            <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 my-2">
              <PrdItemSkeleton />
            </div>
            <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 d-none d-sm-block my-2">
              <PrdItemSkeleton />
            </div>
            <div className="col-xxl-2 col-lg-3 col-md-4 d-none d-md-block my-2">
              <PrdItemSkeleton />
            </div>
            <div className="col-xxl-2 col-lg-3 d-none d-lg-block my-2">
              <PrdItemSkeleton />
            </div>
            <div className="col-xxl-2 d-none d-xxl-block my-2">
              <PrdItemSkeleton />
            </div>
            <div className="col-xxl-2 d-none d-xxl-block my-2">
              <PrdItemSkeleton />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeSkeleton;
