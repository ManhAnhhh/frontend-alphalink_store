import { useEffect, useState } from "react";
import { getCategories } from "../../../../services/Api";
import Skeleton from "react-loading-skeleton";
const NavigationSkeleton = () => {
  const [categoriesParent, setCategoriesParent] = useState([]);
  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategoriesParent(
          res.data.data.filter((cat) => cat.parent_id === null)
        );
      })
      .catch((err) => {});
  }, []);
  return (
    <nav className="navbar navbar-expand-lg bg-white my-1">
      <div className="container-fluid">
        <button
          className="navbar-toggler my-2 ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <Skeleton width={55} height={32} />
        </button>
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav">
            <li className="rounded-pill">
              <div className="fw-medium" to="/">
                <Skeleton width={80} height={28} />
              </div>
            </li>
            {categoriesParent.map((category) => (
              <li key={category._id} className="rounded-pill">
                <div className="fw-medium text-capitalize">
                  <Skeleton
                    width={80}
                    height={28}
                    style={{ marginLeft: "8px" }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationSkeleton;
