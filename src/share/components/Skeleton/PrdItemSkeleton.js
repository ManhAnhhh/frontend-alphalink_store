import Skeleton from "react-loading-skeleton";

const PrdItemSkeleton = () => {
  return (
    <div className="item">
      <div className="img-item">
        <span style={{ width: "80%" }} className="my-4">
          <Skeleton height={100} />
        </span>
      </div>
      <h5 className="name-item pt-2 mb-2">
        <Skeleton height={30} />
      </h5>

      <div className="desc-item fs-12">
        <Skeleton height={15} />
      </div>
      <div className="review d-flex justify-content-between my-1">
        <div className="rate">
          <Skeleton width={100} />
        </div>
        <div className="sold fw-bold">
          <Skeleton width={70} />
        </div>
      </div>
      <div className="price-item d-flex justify-content-between my-1">
        <p className="price-decreased text-danger fw-bold">
          <Skeleton width={60} />
        </p>
        <p className="price text-secondary text-decoration-line-through">
          <Skeleton width={60} />
        </p>
      </div>
      <div className="stock-item my-1 d-flex justify-content-between align-items-center">
        <Skeleton width={100} />
        <div className="heart-icon py-1">
          <Skeleton width={60} />
        </div>
      </div>
      <button className="my-2 w-100 border border-0 rounded p-1">
        <Skeleton />
      </button>
    </div>
  );
};

export default PrdItemSkeleton;
