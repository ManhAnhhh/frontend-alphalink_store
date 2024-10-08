import Skeleton from "react-loading-skeleton";
import PrdItemSkeleton from "./PrdItemSkeleton";
const CategorySkeleton = () => {
  return (
    <>
      <section className="breadcrumb-custom">
        <div className="container-fluid">
          <div className="bg-white py-1 px-2 my-2 rounded-2">
            <Skeleton width={100} />
          </div>
        </div>
      </section>
      <section id="category">
        <div className="container-fluid">
          <div className="title-category mb-3 p-2 border border-0">
            <Skeleton width={240} height={36} style={{ borderRadius: "8px" }} />
          </div>
          <div className="items">
            <div className="row">
              <article id="filters" className="col-xl-3 col-lg-4 col-md-5">
                <div>
                  <p className="d-flex justify-content-between align-items-center">
                    <Skeleton width={60} />
                    <span className="right-left d-none d-md-block">
                      <Skeleton width={40} />
                    </span>
                    <span className="chevron d-block d-md-none">
                      <Skeleton width={40} />
                    </span>
                  </p>
                  <div className="d-none d-md-block justify-content-start justify-content-sm-around flex-wrap">
                    <div className="brand">
                      <p className="filter-name">
                        <Skeleton width={60} />
                        <span className="minus-custom">
                          <Skeleton width={40} />
                        </span>
                      </p>
                      <div className="filter-item">
                        <div className="d-flex gap-3">
                          <Skeleton width={20} />
                          <Skeleton width={40} />
                        </div>
                        <div className="d-flex gap-3">
                          <Skeleton width={20} />
                          <Skeleton width={40} />
                        </div>
                      </div>
                    </div>
                    <div className="price">
                      <div className="filter-name">
                        <Skeleton width={60} />
                        <Skeleton width={40} />
                      </div>
                      <div className="filter-item">
                        <p className="fs-14">
                          <Skeleton />
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="value d-flex justify-content-center align-item-center gap-2">
                            <Skeleton width={60} height={20} />
                            <Skeleton width={60} height={20} />
                            <Skeleton width={60} height={20} />
                          </div>
                        </div>
                        <Skeleton height={38} style={{ borderRadius: "8px" }} />
                      </div>
                    </div>
                    <div className="rates">
                      <div className="filter-name">
                        <Skeleton width={60} />
                        <Skeleton width={40} />
                      </div>
                      <div className="filter-item">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <div className="rate-item" key={i}>
                              <div className="d-flex gap-3">
                                <Skeleton width={20} />
                                <Skeleton width={100} />
                                <Skeleton width={20} />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
              <article id="products" className="col-xl-9 col-lg-8 col-md-7">
                <div className="sort-by d-flex mt-2 mt-md-0">
                  <Skeleton width={64} />
                  <Skeleton width={121} style={{ marginLeft: "2rem" }} />
                </div>
                <div className="items row">
                  {Array(3)
                    .fill(0)
                    .map((_) => (
                      <div
                        key={Math.random() * 10}
                        className="col-xxl-3 col-xl-4 col-sm-6 col-12 my-2"
                      >
                        <PrdItemSkeleton />
                      </div>
                    ))}
                </div>
                <div
                  id="pagination"
                  className="d-flex justify-content-center align-items-center"
                >
                  {Array(5)
                    .fill(0)
                    .map((_) => (
                      <div className="pagination-item" key={Math.random()}>
                        <Skeleton
                          circle
                          width={20}
                          height={20}
                          containerClassName="px-1"
                        />
                      </div>
                    ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategorySkeleton;
