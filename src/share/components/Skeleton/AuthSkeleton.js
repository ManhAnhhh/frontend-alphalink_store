import Skeleton from "react-loading-skeleton";

const AuthSkeleton = () => {
  return (
    <div className="container" id="auth-container">
      <section id="login">
        <form method="post" className="mb-3">
          <Skeleton width={80} height={20} style={{ borderRadius: "8px" }} />
          <div className="my-2 text-start px-4">
            <Skeleton height={36} style={{ borderRadius: "8px" }} />
            <Skeleton height={36} style={{ borderRadius: "8px" }} />
          </div>
          <div>
            <div className="d-flex px-4 gap-4 ">
              <Skeleton
                width={80}
                height={36}
                style={{ borderRadius: "8px" }}
              />
              <Skeleton
                width={80}
                height={36}
                style={{ borderRadius: "8px" }}
              />
            </div>
          </div>
        </form>
        <div className="button">
          <Skeleton width={100} height={36} style={{ borderRadius: "8px" }} />
        </div>
      </section>
    </div>
  );
};

export default AuthSkeleton;
