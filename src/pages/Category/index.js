import ProductItem from "../../share/components/Product-item";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  getCategories,
  getCategory,
  getProductsByCategory,
} from "../../services/Api";
import { HandlePriceWithDiscount } from "../../share/utilities";
import CategorySkeleton from "../../share/components/Skeleton/CategorySkeleton";
import Filter from "../../share/components/layout/Filter";
import { updateCatFilterPrd } from "../../redux/reducers/filterProduct";
import { useSelector, useDispatch } from "react-redux";

const Category = () => {
  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState("default");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);
  const { id } = useParams();

  let [searchParams, setSearchParams] = useSearchParams();

  const star = searchParams.get("star")?.split(",") || [];
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const productsByFilter = useSelector((state) => {
    return state.FilterPrd.category.items;
  });
  const isLoading = useSelector((state) => state.Loading.isLoading);

  useEffect(() => {
    getCategories()
      .then(({ data }) => setCategories(data.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    getCategory(id)
      .then(({ data }) => setCategory(data.data))
      .catch(() => {});

    getProductsByCategory(id)
      .then(({ data }) => {
        setProductsByCategory(data.data);
        dispatch(updateCatFilterPrd(data.data));
      })
      .catch(() => {});
  }, [id]);

  useEffect(() => {
    setHighestPrice(() => {
      if (productsByFilter.length === 0) return 0;
      return Math.max(
        ...productsByFilter.map((item) =>
          HandlePriceWithDiscount(item.price, item.discount)
        )
      );
    });
  }, [productsByFilter]);

  useEffect(() => {
    let newPrd;
    if (minPrice && maxPrice) {
      if (star.length > 0) {
        newPrd = productsByCategory.filter((item) => {
          const finalPrice = HandlePriceWithDiscount(item.price, item.discount);
          return (
            finalPrice >= minPrice &&
            finalPrice <= maxPrice &&
            star.includes((5 - item.star).toString())
          );
        });
      } else {
        newPrd = productsByCategory.filter((item) => {
          const finalPrice = HandlePriceWithDiscount(item.price, item.discount);
          return finalPrice >= minPrice && finalPrice <= maxPrice;
        });
      }
    } else if (!minPrice && !maxPrice) {
      if (star.length === 0) {
        newPrd = productsByCategory;
      } else {
        newPrd = productsByCategory.filter((item) =>
          star.includes((5 - item.star).toString())
        );
      }
    }
    dispatch(updateCatFilterPrd(newPrd));
    setSelectedOption("default");
    searchParams.delete("sortBy");
    setSearchParams(searchParams);
  }, [minPrice, maxPrice, star.length, productsByCategory]);

  const categoryParent = useMemo(() => {
    categories.find((cat) => {
      return cat._id === category.parent_id;
    });
  }, [categories, category.parent_id]);
  const handleSelectValue = (value) => {
    setSelectedOption(value);
    let sortBy = "";
    if (value === "default") {
      dispatch(updateCatFilterPrd(productsByFilter));
      searchParams.delete("sortBy");
    } else if (value === "low") {
      sortBy = "low-to-high";
      const newPrd = [...productsByFilter].sort((a, b) => {
        return (
          HandlePriceWithDiscount(a.price, a.discount) -
          HandlePriceWithDiscount(b.price, b.discount)
        );
      });
      dispatch(updateCatFilterPrd(newPrd));
    } else {
      sortBy = "high-to-low";
      const newPrd = [...productsByFilter].sort((a, b) => {
        return (
          HandlePriceWithDiscount(b.price, b.discount) -
          HandlePriceWithDiscount(a.price, a.discount)
        );
      });
      dispatch(updateCatFilterPrd(newPrd));
    }
    if (value !== "default") searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
  };

  if (isLoading) return <CategorySkeleton />;
  return (
    <>
      <section className="breadcrumb-custom">
        <div className="container-fluid">
          <p>{`Trang chủ / ${
            categoryParent?.name ? `${categoryParent.name} / ` : ""
          }${category.name} (${productsByFilter?.length}) sản phẩm`}</p>
        </div>
      </section>
      <section id="category">
        <div className="container-fluid">
          <div className="title-category mb-3 text-uppercase">
            <h4>{category.name}</h4>
          </div>
          <div className="items">
            <div className="row">
              <Filter
                highestPrice={highestPrice}
                minValue={minPrice}
                maxValue={maxPrice}
                star={star}
              />
              <article id="products" className="col-xl-9 col-lg-8 col-md-7">
                <div className="sort-by d-flex mt-2 mt-md-0">
                  <p className="fw-bold m-0">Giá tiền:</p>
                  <select
                    name="sort-by-price"
                    id="sort-by-price"
                    value={selectedOption}
                    onChange={(e) => handleSelectValue(e.target.value)}
                  >
                    <option className="text-capitalize" value="default">
                      Mặc định
                    </option>
                    <option className="text-capitalize" value="low">
                      Thấp đến cao
                    </option>
                    <option className="text-capitalize" value="high">
                      Cao đến thấp
                    </option>
                  </select>
                </div>
                <div className="items row">
                  {productsByFilter.length === 0 && (
                    <div className="container-fluid">
                      <div className="text-center bg-white py-2 my-3 rounded-3">
                        Không có sản phẩm nào
                      </div>
                    </div>
                  )}
                  {productsByFilter?.map((product) => (
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
                      <i className="icon fa-solid fa-chevron-left" />
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
                      <i className="icon fa-solid fa-chevron-right" />
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
