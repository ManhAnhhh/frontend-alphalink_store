import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductItem from "../../share/components/Product-item";
import {
  getCategories,
  getProducts,
  getProductsByCategoryName,
} from "../../services/Api";
import { LOADING_TIME, HandlePriceWithDiscount } from "../../share/utilities";
import { ClipLoader } from "react-spinners";
import Filter from "../../share/components/layout/Filter";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchFilterPrd } from "../../redux/reducers/filterProduct";
import CategorySkeleton from "../../share/components/Skeleton/CategorySkeleton";

const Search = () => {
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [highestPrice, setHighestPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoadingSubMenu, setIsLoadingSubMenu] = useState(true);
  const [selectedOption, setSelectedOption] = useState("default");
  
  const keyword = searchParams.get("keyword");
  const star = searchParams.get("star")?.split(",") || [];
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const productsByFilter = useSelector((state) => {
    return state.FilterPrd.search.items;
  });
  const isLoading = useSelector((state) => state.Loading.isLoading);

  useEffect(() => {
    setIsLoadingSubMenu(true);
    const fetchData = async () => {
      const category = await getCategories()
        .then(({ data }) => {
          return data.data.find(
            (c) => c?.name?.toLowerCase() === keyword?.toLowerCase()
          );
        })
        .catch((err) => {});
      if (category !== undefined) {
        await getProductsByCategoryName(category._id)
          .then(({ data }) => {
            setTotal(data.total);
            setHighestPrice(() =>
              Math.max(
                ...data.data.map((item) =>
                  HandlePriceWithDiscount(item.price, item.discount)
                )
              )
            );
            setProducts(data.data);
            dispatch(updateSearchFilterPrd(data.data));
          })
          .catch();
      } else {
        await getProducts()
          .then(({ data }) => {
            setTotal(data.total);
            setHighestPrice(() =>
              Math.max(
                ...data.data.map((item) =>
                  HandlePriceWithDiscount(item.price, item.discount)
                )
              )
            );
            const newPrd = data.data.filter((p) =>
              p?.name?.toLowerCase().includes(keyword?.toLowerCase())
            );
            setProducts(newPrd);
            dispatch(updateSearchFilterPrd(newPrd));
          })
          .catch((err) => {
            // console.log(err);
          });
      }
    };
    fetchData();
    setTimeout(() => {
      setIsLoadingSubMenu(false);
    }, LOADING_TIME);
  }, [keyword]);

  useEffect(() => {
    let newPrd;
    if (minPrice && maxPrice) {
      if (star.length > 0) {
        newPrd = products.filter((item) => {
          const finalPrice = HandlePriceWithDiscount(item.price, item.discount);
          return (
            finalPrice >= minPrice &&
            finalPrice <= maxPrice &&
            star.includes((5 - item.star).toString())
          );
        });
      } else {
        newPrd = products.filter((item) => {
          const finalPrice = HandlePriceWithDiscount(item.price, item.discount);
          return finalPrice >= minPrice && finalPrice <= maxPrice;
        });
      }
    } else if (!minPrice && !maxPrice) {
      if (star.length === 0) {
        newPrd = products;
        dispatch(updateSearchFilterPrd(newPrd));
      } else {
        newPrd = products.filter((item) =>
          star.includes((5 - item.star).toString())
        );
      }
    }
    dispatch(updateSearchFilterPrd(newPrd));
    setSelectedOption("default");
    searchParams.delete("sortBy");
    setSearchParams(searchParams);
  }, [minPrice, maxPrice, star.length, products]);

  const handleSelectValue = (value) => {
    setSelectedOption(value);
    let sortBy = "";
    if (value === "default") {
      dispatch(updateSearchFilterPrd(productsByFilter));
      searchParams.delete("sortBy");
    } else if (value === "low") {
      sortBy = "low-to-high";
      const newPrd = [...productsByFilter].sort((a, b) => {
        return (
          HandlePriceWithDiscount(a.price, a.discount) -
          HandlePriceWithDiscount(b.price, b.discount)
        );
      });
      dispatch(updateSearchFilterPrd(newPrd));
    } else {
      sortBy = "high-to-low";
      const newPrd = [...productsByFilter].sort((a, b) => {
        return (
          HandlePriceWithDiscount(b.price, b.discount) -
          HandlePriceWithDiscount(a.price, a.discount)
        );
      });
      dispatch(updateSearchFilterPrd(newPrd));
    }
    if (value !== "default") searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
  };
  
  if (isLoadingSubMenu) {
    return (
      <div className="text-center my-4">
        <ClipLoader color="#fff" size={42} />
      </div>
    );
  }

  if (products.length === 0 && !isLoading) {
    return (
      <div className="container-fluid text-center">
        <p className="bg-white p-4 rounded my-1">
          No products found for "{keyword}"
        </p>
      </div>
    );
  }

  if (isLoading) return <CategorySkeleton />;

  return (
    <>
      <section className="breadcrumb-custom">
        <div className="container-fluid">
          <p>
            {total} Results for "{keyword}"
          </p>
        </div>
      </section>
      <section id="search">
        <div className="container-fluid">
          <div className="title-search mb-3 text-uppercase">
            <h4>{keyword}</h4>
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
                {productsByFilter.length === 0 || keyword === "" ? (
                  <div className="text-center">
                    <p className="bg-white p-4 rounded my-1">
                      No products found for Filter
                    </p>
                  </div>
                ) : (
                  <Items
                    prds={productsByFilter}
                    star={star}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    selectedOption={selectedOption}
                    handleSelectValue={handleSelectValue}
                  />
                )}

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
const Items = ({
  prds,
  minPrice,
  maxPrice,
  star,
  selectedOption,
  handleSelectValue,
}) => {
  return (
    <>
      <div className="d-flex mt-2 mt-md-0 justify-content-between sort-by">
        <div className="d-flex ">
          <p className="fw-bold m-0">Sort by:</p>
          <select
            name="sort-by-price"
            id="sort-by-price"
            value={selectedOption}
            onChange={(e) => handleSelectValue(e.target.value)}
          >
            <option className="text-capitalize" value="default">
              Default
            </option>
            <option className="text-capitalize" value="low">
              Low To High
            </option>
            <option className="text-capitalize" value="high">
              High To Low
            </option>
          </select>
        </div>
        {star.length === 0 && !maxPrice && !minPrice ? null : (
          <div style={{ color: "#0d6efd" }}>
            {prds.length} Results for Filter
          </div>
        )}
      </div>
      <div className="items row">
        {prds?.map((product) => (
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
    </>
  );
};
export default Search;
