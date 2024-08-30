import ProductItem from "../../share/components/Product-item";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getCategories,
  getCategory,
  getProductsByCategory,
} from "../../services/Api";
const Category = () => {
  const [isCollapsedFilters, setIsCollapsedFilters] = useState(false);
  const [category, setCategory] = useState("");
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const handleFilters = () => {
    setIsCollapsedFilters(!isCollapsedFilters);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      if (windowSize.width >= 768) {
        setIsCollapsedFilters(false);
      }
    };

    // Lắng nghe sự kiện resize
    window.addEventListener("resize", handleResize);

    // Cleanup để gỡ bỏ listener khi component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowSize.width]);

  const { id } = useParams();
  useEffect(() => {
    getCategory(id, {}).then(({ data }) => setCategory(data.data));

    getProductsByCategory(id).then(({ data }) =>
      setProductsByCategory(data.data)
    );
  }, [id]);

  useEffect(() => {
    getCategories().then(({ data }) => setCategories(data.data));
  }, []);
  
  const categoryParent = categories.find(cat => cat._id === category.parent_id)
  return (
    <>
      <section className="breadcrumb-custom">
        <div className="container-fluid">
          <p>{`home / ${categoryParent?.name ? `${categoryParent.name} / ` : ''}${category.name} (${productsByCategory.length}) products`}</p>
        </div>
      </section>
      <section id="category">
        <div className="container-fluid">
          <div className="title-category mb-3 text-uppercase">
            <h4>{category.name}</h4>
          </div>
          <div className="items">
            <div className="row">
              <article id="filters" className="col-xl-3 col-lg-4 col-md-5">
                <div
                  style={{
                    height: isCollapsedFilters ? "48px" : "auto",
                    overflow: "hidden",
                  }}
                >
                  <p className="d-flex justify-content-between align-items-center">
                    Filters
                    <span className="right-left d-none d-md-block">
                      <i className="fa-solid fa-right-left" />
                    </span>
                    <span
                      className="chevron d-block d-md-none"
                      onClick={handleFilters}
                    >
                      <i
                        className={`fa-solid ${
                          isCollapsedFilters
                            ? "fa-chevron-down"
                            : "fa-chevron-up"
                        }`}
                      ></i>
                    </span>
                  </p>
                  <div className="d-flex d-md-block justify-content-start justify-content-sm-around flex-wrap">
                    <div className="brand">
                      <p className="filter-name">
                        Brand <span className="minus-custom">−</span>
                      </p>
                      <div className="filter-item">
                        <div className="d-flex align-items-center">
                          <input type="checkbox" name="apple" id="apple" />
                          <label className="text-capitalize" htmlFor="apple">
                            &nbsp; Apple
                          </label>
                        </div>
                        <div className="d-flex align-items-center">
                          <input type="checkbox" name="dell" id="dell" />
                          <label className="text-capitalize" htmlFor="dell">
                            &nbsp; dell
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="price">
                      <div className="filter-name">
                        <p className="m-0">Price</p>
                        <select
                          name="type-currency"
                          id="type-currency"
                          className="me-0 me-md-auto"
                        >
                          <option value="vnd">VND</option>
                          <option value="dollar">$</option>
                        </select>
                        <div className="minus-custom">−</div>
                      </div>
                      <div className="filter-item">
                        <p className="fs-14">
                          <span>Highest price: &nbsp; </span>
                          <strong className="text-danger">100000000đ</strong>
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="value d-flex justify-content-center align-item-center gap-2">
                            <input
                              className="min-value"
                              type="text"
                              placeholder="MIN"
                            />
                            <div className="minus-custom">−</div>
                            <input
                              className="max-value"
                              type="text"
                              placeholder="MAX"
                            />
                          </div>
                        </div>
                        <button type="button" className="btn-price btn-custom">
                          APPLY
                        </button>
                      </div>
                    </div>
                    <div className="rates">
                      <p className="filter-name">
                        Rates <span className="minus-custom">−</span>
                      </p>
                      <div className="filter-item">
                        <div className="rate-item">
                          <input type="checkbox" name="rate-5" id="rate-5" />
                          <label htmlFor="rate-5">
                            <i className="fa fa-star text-warning" />
                            <i className="fa fa-star text-warning" />
                            <i className="fa fa-star text-warning" />
                            <i className="fa fa-star text-warning" />
                            <i className="fa fa-star text-warning" />
                            <span className="ps-4">(5)</span>
                          </label>
                        </div>
                        <div className="rate-item">
                          <input type="checkbox" name="rate-4" id="rate-4" />
                          <label htmlFor="rate-4">
                            <i className="fa fa-star text-warning" />
                            <i className="fa fa-star text-warning" />
                            <i className="fa fa-star text-warning" />
                            <i className="fa fa-star text-warning" />
                            <i className="fa-regular fa-star text-black-50" />
                            <span className="ps-4">(4)</span>
                          </label>
                        </div>
                        <div className="rate-item">
                          <input type="checkbox" name="rate-3" id="rate-3" />
                          <label htmlFor="rate-3">
                            <i className="fa fa-star text-warning" />
                            <i className="fa fa-star text-warning" />
                            <i className="fa fa-star text-warning" />
                            <i className="fa-regular fa-star text-black-50" />
                            <i className="fa-regular fa-star text-black-50" />
                            <span className="ps-4">(3)</span>
                          </label>
                        </div>
                        <div className="rate-item">
                          <input type="checkbox" name="rate-2" id="rate-2" />
                          <label htmlFor="rate-2">
                            <i className="fa fa-star text-warning" />
                            <i className="fa fa-star text-warning" />
                            <i className="fa-regular fa-star text-black-50" />
                            <i className="fa-regular fa-star text-black-50" />
                            <i className="fa-regular fa-star text-black-50" />
                            <span className="ps-4">(2)</span>
                          </label>
                        </div>
                        <div className="rate-item">
                          <input type="checkbox" name="rate-1" id="rate-1" />
                          <label htmlFor="rate-1">
                            <i className="fa fa-star text-warning" />
                            <i className="fa-regular fa-star text-black-50" />
                            <i className="fa-regular fa-star text-black-50" />
                            <i className="fa-regular fa-star text-black-50" />
                            <i className="fa-regular fa-star text-black-50" />
                            <span className="ps-4">(1)</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
              <article id="products" className="col-xl-9 col-lg-8 col-md-7">
                <div className="sort-by d-flex mt-2 mt-md-0">
                  <p className="fw-bold m-0">Sort by:</p>
                  <select name="sort-by-price" id="sort-by-price">
                    <option className="text-capitalize" value="low">
                      Low To High
                    </option>
                    <option className="text-capitalize" value="high">
                      High To Low
                    </option>
                  </select>
                </div>
                <div className="items row">
                  {productsByCategory.map((product) => (
                    <div
                      key={product._id}
                      className="col-xxl-3 col-xl-4 col-sm-6 col-12 my-2"
                    >
                      <div className="item">
                        <ProductItem product={product} />
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  id="pagination"
                  className="d-flex justify-content-center align-items-center"
                >
                  <div className="pagination-item">
                    <a href="#">
                      <i className="fa-solid fa-chevron-left" />
                    </a>
                  </div>
                  <div className="pagination-item">
                    <a href="#">1</a>
                  </div>
                  <div className="pagination-item">
                    <a href="#">2</a>
                  </div>
                  <div className="pagination-item">...</div>
                  <div className="pagination-item">
                    <a href="#">3</a>
                  </div>
                  <div className="pagination-item">
                    <a href="#">4</a>
                  </div>
                  <div className="pagination-item">
                    <a href="#">
                      <i className="fa-solid fa-chevron-right" />
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Category;
