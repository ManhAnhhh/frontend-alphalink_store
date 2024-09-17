import React from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

const HeaderSkeleton = () => {
  const isLoggedIn = useSelector((state) => state.Auth.login.isLoggedIn);
  return (
    <header className="bg-white ">
      <section id="helper" className="border border-0">
        <div className="container-fluid py-2 d-flex justify-content-end align-items-center gap-4">
          <Skeleton width={60} />
          <Skeleton width={100} />
          {isLoggedIn && (
            <div className="full-name d-flex align-items-center gap-2 position-relative">
              <div className="img-customer d-none d-sm-inline-block">
                <Skeleton circle width={26} height={26} />
              </div>
              <Skeleton width={200} />
            </div>
          )}
        </div>
      </section>
      <section id="main-header">
        <div className="container-fluid py-4">
          <div className="row align-items-center ">
            <div className="logo-top col-lg-4 col-md-12 col-sm-12 text-center text-lg-start mb-4 mb-lg-0">
              <Skeleton width={300} height={82} />
            </div>
            <div className="search-box position-relative col-lg-5 col-md-6 col-sm-12 mb-4 mb-md-0 d-flex justify-content-center">
              <Skeleton
                width={400}
                height={42}
                style={{ borderRadius: "8px" }}
              />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 icon-home d-flex gap-4 justify-content-center align-items-center ">
              {isLoggedIn ? (
                <>
                  <div className="heart-icon py-1 mx-2">
                    <Skeleton circle width={32} height={32} />
                  </div>

                  <div className="cart-icon py-1 mx-2">
                    <Skeleton circle width={32} height={32} />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <button className="border-0 py-2 px-2 mx-2 rounded">
                      <Skeleton width={80} />
                    </button>
                    <button className="border-0 py-2 px-2 mx-2 rounded">
                      <Skeleton width={80} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};

export default HeaderSkeleton;
