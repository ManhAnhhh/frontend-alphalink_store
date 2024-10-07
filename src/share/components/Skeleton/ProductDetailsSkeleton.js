import Skeleton from "react-loading-skeleton";
const ProductDetailsSkeleton = () => {
  return (
    <>
      <section className="breadcrumb-custom">
        <div className="container-fluid">
          <div className="bg-white py-1 px-2 mb-2 rounded-2 my-1">
            <Skeleton width={100} />
          </div>
        </div>
      </section>
      <section id="product-details">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-5 col-lg-6 col-md-5 col-12">
              <div className="img-product d-flex h-100 flex-column flex-sm-row flex-column-reverse">
                <div className="sub-img d-flex flex-wrap justify-content-center justify-content-sm-start flex-row flex-sm-column ">
                  {Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <div className="item mx-2 mx-sm-0" key={index}>
                        <Skeleton
                          height={60}
                          containerClassName="sub-img-skeleton d-inline-block"
                        />
                      </div>
                    ))}
                </div>
                <div className="main-img flex-fill text-center">
                  <Skeleton
                    height={300}
                    containerClassName="main-img-skeleton d-inline-block"
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-7 col-lg-6 col-md-7 col-12 mt-2 mt-md-0">
              <div className="content h-100 mt-2 mt-md-0">
                <Skeleton height={32} />
                <div className="review d-flex gap-4">
                  <Skeleton width={100} />
                  <Skeleton width={80} />
                </div>
                <div className="price-item d-flex gap-4">
                  <Skeleton width={60} />
                  <Skeleton width={60} />
                </div>
                {/* color */}
                <div className="d-flex align-items-lg-center flex-wrap align-items-center gap-4">
                  <Skeleton width={60} />
                  <Skeleton width={80} height={30} />
                </div>
                {/* quantity */}
                <div className="quantity d-flex flex-wrap gap-2 gap-lg-5 align-items-center">
                  <Skeleton width={80} />
                  <Skeleton width={80} height={30} />
                  <Skeleton width={140} />
                </div>
                {/* add-to-cart */}
                <div className="d-flex">
                  <div style={{ flex: "0.5" }}>
                    <Skeleton height={50} />
                  </div>
                  <div style={{ flex: "0.5" }}>
                    <Skeleton height={50} />
                  </div>
                </div>
                <div className="details mt-4">
                  <Skeleton width={150} />
                  <Skeleton height={50} />
                </div>
              </div>
            </div>
            <div className="col-12">
              <div id="reviews">
                <div className="title border border-0">
                  <Skeleton
                    width={240}
                    height={36}
                    style={{ borderRadius: "8px" }}
                  />
                </div>

                <div className="comments">
                  <div className="text-center no-comment">
                    <Skeleton
                      width={240}
                      height={36}
                      style={{ borderRadius: "8px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailsSkeleton;
