import Skeleton from "react-loading-skeleton";
const BannerSkeleton = () => {
  return (
    <section id="banner" className="mb-4">
      <div className="container-fluid">
        <div className="row d-none d-sm-block">
          <div id="ads" className="pt-2">
            <div className="bg-white rounded p-2">
              <Skeleton />
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-lg-8 col-sm-12">
            <div className="h-100">
              <Skeleton
                borderRadius={"6px"}
                baseColor={"#fff"}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
          <div className="sub-carousel col-lg-4 col-sm-12 d-flex flex-lg-column mt-2 mt-lg-0">
            <div className="w-100">
              <Skeleton
                borderRadius={"6px"}
                baseColor={"#fff"}
                height={160 / 2}
              />
            </div>
            <div className="w-100">
              <Skeleton
                borderRadius={"6px"}
                baseColor={"#fff"}
                height={160 / 2}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSkeleton;
