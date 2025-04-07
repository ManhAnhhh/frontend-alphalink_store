import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCategories } from "../../../services/Api";

const Navigation = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesParent, setCategoriesParent] = useState([]);

  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategoriesParent(
          res.data.data.filter((cat) => cat.parent_id === null)
        );
        setCategories(res.data.data);
      })
      .catch((err) => {});
  }, []);
  
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-medium nav-item" to="/">
          Trang chủ
        </NavLink>
        <button
          className="navbar-toggler my-2 ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav">
            {categoriesParent?.map((category) => {
              return categories?.some(
                (cat) => category._id === cat.parent_id
              ) ? (
                <li
                  key={category._id}
                  className="nav-item rounded-pill fw-medium dropdown"
                >
                  <span
                    className="nav-link dropdown-toggle text-capitalize"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {category.name}
                  </span>
                  <ul className="dropdown-menu">
                    {categories
                      ?.filter((cat) => category._id === cat.parent_id)
                      .map((subCategory) => (
                        <li key={subCategory._id}>
                          <NavLink
                            className="dropdown-item"
                            to={`/category/${subCategory._id}`}
                          >
                            {subCategory.name}
                          </NavLink>
                        </li>
                      ))}
                  </ul>
                </li>
              ) : (
                <li key={category._id} className="nav-item rounded-pill">
                  <NavLink
                    className="nav-link fw-medium text-capitalize"
                    to={`/category/${category._id}`}
                  >
                    {category.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
