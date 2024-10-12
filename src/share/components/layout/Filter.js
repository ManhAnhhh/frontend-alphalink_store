import { useEffect, useState, useRef } from "react";
import { PopUp } from "../../utilities";
import { useNavigate, useLocation } from "react-router-dom";

const Filter = ({ highestPrice, minValue, maxValue, star }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const checkedInputRefs = useRef([]);

  star = star.map((item) => Number(item));

  const [minPrice, setMinPrice] = useState(minValue || "");
  const [maxPrice, setMaxPrice] = useState(maxValue || "");
  const [isCollapsedFilters, setIsCollapsedFilters] = useState(false);
  const [checkedList, setCheckedList] = useState(star || []);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // đây là dùng kiểu cũ còn h sẽ dùng useSearchParams của react-router-dom (xem Search page)
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    checkedInputRefs.current.forEach((element, index) => {
      if (star.includes(index)) {
        element.checked = true;
      }
    });
  }, []);

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

  useEffect(() => {
    handleNavigate();

    // Nếu muốn không cần nhấn apply mà vẫn đạt được value
    // trong min max thì thêm dependencies: maxPrice, minPrice
    // nhưng khi star đc check thì nó tự apply price mà k cần nhấn apply
    // vì khi đó cái useEffect này đc chạy lại
  }, [checkedList]);

  const handleNavigate = () => {
    if (checkedList.length > 0) {
      searchParams.set("star", checkedList);
    } else {
      searchParams.delete("star");
    }
    if (minPrice && maxPrice) {
      searchParams.set("minPrice", minPrice);
      searchParams.set("maxPrice", maxPrice);
    } else {
      searchParams.delete("minPrice");
      searchParams.delete("maxPrice");
    }
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const handleCheckBox = (index) => {
    setCheckedList((pre) => {
      if (pre.includes(index)) {
        return pre.filter((item) => item !== index);
      }
      return [...pre, index];
    });
  };

  const checkPrice = () => {
    const min = Number(minPrice);
    const max = Number(maxPrice);
    if (min === 0 || max === 0) {
      PopUp({
        type: "error",
        content: "Please select a price",
      });
      return false;
    }
    if (Number.isNaN(min) || Number.isNaN(max)) {
      PopUp({
        type: "error",
        content: "Value must be a number",
      });
      return false;
    }
    if (min < 0) {
      setMinPrice(0);
      PopUp({
        type: "error",
        content: "Value must be more than 0",
      });
      return false;
    }

    if (min > max) {
      PopUp({
        type: "error",
        content: `Invalid value`,
      });
      return false;
    }
    return true;
  };

  const handleApplyPrice = (e) => {
    e.preventDefault();
    if (!checkPrice()) return;

    handleNavigate();
    PopUp({
      type: "success",
      content: "Price filter applied",
    });
  };

  const resetAll = () => {
    setMinPrice("");
    setMaxPrice("");
    setCheckedList([]);
    checkedInputRefs.current.forEach((element) => {
      element.checked = false;
    });
    searchParams.delete("sortBy");
  };

  return (
    <article id="filters" className="col-xl-3 col-lg-4 col-md-5">
      <div
        style={{
          height: isCollapsedFilters ? "48px" : "354px",
          overflow: "hidden",
        }}
      >
        <p className="d-flex justify-content-between align-items-center">
          Filters
          <span className="right-left d-none d-md-block">
            <i className="icon fa-solid fa-right-left" />
          </span>
          <span
            className="chevron d-block d-md-none"
            onClick={() => setIsCollapsedFilters(!isCollapsedFilters)}
          >
            <i
              className={`fa-solid ${
                isCollapsedFilters ? "fa-chevron-down" : "fa-chevron-up"
              }`}
            ></i>
          </span>
        </p>
        <div className="d-flex d-md-block justify-content-start justify-content-sm-around flex-wrap">
          <div className="price">
            <div className="filter-name">
              <p className="m-0">Price</p>
              <select
                name="type-currency"
                id="type-currency"
                className="me-0 me-md-auto"
              >
                <option value="dollar">$</option>
                <option value="vnd">VND</option>
              </select>
              <div className="minus-custom">&minus;</div>
            </div>
            <div className="filter-item">
              <p className="fs-14">
                <span>Highest price: &nbsp; </span>
                <strong className="text-danger">$ {highestPrice}</strong>
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="value d-flex justify-content-center align-item-center gap-2">
                  <input
                    value={minPrice}
                    className="min-value"
                    name="min-value"
                    type="text"
                    placeholder="MIN"
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <div className="minus-custom">&minus;</div>
                  <input
                    value={maxPrice}
                    className="max-value"
                    name="max-value"
                    type="text"
                    placeholder="MAX"
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="button"
                className="btn-price btn-custom"
                onClick={handleApplyPrice}
              >
                APPLY
              </button>
            </div>
          </div>
          <div className="rates">
            <p className="filter-name">
              Rates <span className="minus-custom">&minus;</span>
            </p>
            <div className="filter-item">
              {Array(5)
                .fill(0)
                .map((rate, index) => (
                  <div key={`rate-cat-${5 - index}`} className="rate-item">
                    <input
                      ref={(el) => (checkedInputRefs.current[index] = el)}
                      type="checkbox"
                      name={`rate-${5 - index}`}
                      id={`rate-${5 - index}`}
                      onChange={() => handleCheckBox(index)}
                    />
                    <label htmlFor={`rate-${5 - index}`}>
                      {Array(5)
                        .fill(0)
                        .map((item, i) => (
                          <i
                            key={`rate-star + ${Math.random() * 10}`}
                            className={`fa-star ${
                              i < 5 - index
                                ? "fa text-warning"
                                : "fa-regular text-black-50"
                            }`}
                          />
                        ))}
                    </label>
                    <span className="ps-4">({5 - index})</span>
                  </div>
                ))}
            </div>
          </div>

          <button
            type="button"
            onClick={resetAll}
            className="btn-price btn-custom w-100"
          >
            RESET ALL
          </button>
        </div>
      </div>
    </article>
  );
};

export default Filter;
