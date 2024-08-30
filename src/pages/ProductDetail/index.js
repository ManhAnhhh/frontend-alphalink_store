import React, { useState, useEffect, useRef } from "react";
import { GetImageProduct, PopUp } from "../../share/utilities";
import { getProductByID, getCategories } from "../../services/Api";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import {
  CustomNextArrow,
  CustomePrevArrow,
} from "../../share/components/CustomArrowSlick";
const ProductDetail = () => {
  const [categories, setCategories] = useState([]);
  const [colorChoosed, setColorChoosed] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const { id } = useParams();

  //? config slick carousel
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);
  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  const settings = {
    infinite: true,
    speed: 2000,
    autoplaySpeed: 2000,
    autoplay: false,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomePrevArrow />,
  };
  //? end config slick carousel

  const handleColorsProduct = (index) => {
    setColorChoosed(index);
  };

  const onBlurInput = (value) => {
    if (Number(value) <= 0) {
      PopUp({
        type: "error",
        content: "Quanttity must be greater than 1",
      });
      setQuantity(1);
      return;
    }
    if (Number(value) > product.stock) {
      PopUp({
        type: "error",
        content: `Quanttity must be less than ${product.stock}`,
      });
      setQuantity(product.stock);
      return;
    }
  };

  const handleQuantity = (state) => {
    // state = 0 => decrease quantity
    // state = 1 => increase quantity
    if (state === 0) {
      if (Number(quantity) === 1) {
        PopUp({
          type: "error",
          content: "Quanttity must be greater than 1",
        });
        return;
      }
      setQuantity((prevQuantity) => Number(prevQuantity) - 1);
    } else if (state === 1) {
      if (Number(quantity) === product.stock) {
        PopUp({
          type: "error",
          content: `Quanttity must be less than ${product.stock}`,
        });
        return;
      }
      setQuantity((prevQuantity) => Number(prevQuantity) + 1);
    }
  };

  useEffect(() => {
    getProductByID(id, {}).then(({ data }) => setProduct(data.data));
  }, [id]);
  useEffect(() => {
    getCategories().then(({ data }) => setCategories(data.data));
  }, [product.category_id]);
  const category = categories.find((cat) => cat._id === product.category_id);
  const categoryParent = categories.find(
    (cat) => cat._id === category.parent_id
  );

  return (
    <>
      <section className="breadcrumb-custom">
        <div className="container-fluid">
          <p>
            home / {categoryParent?.name ? `${categoryParent.name} / ` : ""}{" "}
            {category?.name} / {product.name}
          </p>
        </div>
      </section>
      <section id="product-details">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-md-5 col-12">
              <div className="wrapper-img-product h-100 slider-container">
                <div className="img-product">
                  <Slider
                    asNavFor={nav2}
                    ref={(slider) => (sliderRef1 = slider)}
                    className="main-img"
                    {...settings}
                  >
                    {product?.img?.map((item) => (
                      <div key={item}>
                        <img src={GetImageProduct(item)} alt={product.name} />
                      </div>
                    ))}
                  </Slider>
                  <hr />
                  <Slider
                    asNavFor={nav1}
                    ref={(slider) => (sliderRef2 = slider)}
                    slidesToShow={3}
                    swipeToSlide={true}
                    focusOnSelect={true}
                    className="sub-img mt-4"
                    {...settings}
                  >
                    {product?.img?.map(
                      (item, index) =>
                        index !== 0 && (
                          <div key={item}>
                            <img
                              src={GetImageProduct(item)}
                              alt={product.name}
                              className="img-fluid"
                            />
                          </div>
                        )
                    )}
                  </Slider>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-7 col-12 mt-2 mt-md-0">
              <div className="content h-100 mt-4 mt-md-0">
                <h2>{product.name}</h2>
                <div className="review d-flex gap-4">
                  <div className="rate">
                    {Array.from({ length: product.star }).map((e, i) => (
                      <i key={i} className="fa fa-star text-warning" />
                    ))}
                    {Array.from({ length: 5 - product.star }).map((e, i) => (
                      <i
                        key={i + 100}
                        className="fa-regular fa-star text-black-50"
                      />
                    ))}
                  </div>
                  <div className="sold fw-bold">Sold: {product.sold}</div>
                </div>
                <div className="price-item d-flex gap-4">
                  <p className="discount text-secondary text-decoration-line-through">
                    {" "}
                    $ {product.price}
                  </p>
                  <p className="price text-danger fw-bold">
                    $ {product.price - (product.price * product.discount) / 100}
                  </p>
                </div>
                {/* color */}
                <div className="d-flex align-items-lg-center flex-wrap align-items-center">
                  <p className="me-2 mb-0">Color:</p>
                  <div className="d-flex flex-wrap">
                    {product?.color?.map((item, index) => (
                      <button
                        onClick={() => handleColorsProduct(index)}
                        key={index}
                        className={`btn-color my-2 my-lg-0 text-capitalize ${
                          colorChoosed === index && "active"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
                {/* quantity */}
                <div className="quantity d-flex flex-wrap gap-2 gap-lg-5 align-items-center">
                  <div className="m-0">Quantity</div>
                  <div className="d-flex number">
                    <button onClick={() => handleQuantity(0)}>−</button>
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      onBlur={(e) => onBlurInput(e.target.value)}
                    />
                    <button onClick={() => handleQuantity(1)}>+</button>
                  </div>
                  <div className="my-1 d-flex justify-content-between align-items-center flex-wrap">
                    {/* success */}
                    {product.is_stock ? (
                      <p className="text-success fw-bold mb-0">
                        <i
                          style={{ color: "#198754" }}
                          className="fa-regular fa-circle-check me-1 "
                        />
                        In stock: {product.stock}
                      </p>
                    ) : (
                      /* danger */
                      <p className="text-danger fw-bold m-0">
                        <i
                          style={{ color: "#dc3545" }}
                          className="fa-regular fa-circle-xmark me-1"
                        />
                        Out of stock
                      </p>
                    )}
                  </div>
                </div>
                {/* add-to-cart */}
                <div className="d-flex gap-4">
                  <button className="btn-custom btn-items">
                    <i className="fa-solid fa-cart-shopping fa-lg text-white" />
                    &nbsp; Add to cart
                  </button>
                  <button className="btn-custom btn-items">Buy now</button>
                </div>
                <div className="details mt-4">
                  <p className="mb-2">
                    <b>Product details:</b>
                  </p>
                  <p>{product.product_details}</p>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div id="reviews">
                <p className="title text-uppercase">PRODUCT REVIEWS</p>
                <div className="comments">
                  <div className="item d-flex gap-3">
                    <div className="img-item">
                      <img
                        className="img-fluid"
                        src=" /img/linhh.png"
                        alt="acer"
                      />
                    </div>
                    <div className="content-item w-100">
                      <p>
                        <strong>Manh Anh</strong>
                      </p>
                      <div className="rate">
                        <i className="fa fa-star text-warning" />
                        <i className="fa fa-star text-warning" />
                        <i className="fa fa-star text-warning" />
                        <i className="fa fa-star text-warning" />
                        <i className="fa-regular fa-star text-black-50" />
                      </div>
                      <div className="date fs-14">06 / 08 / 2024</div>
                      <div className="text">
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Totam laboriosam quaerat, quibusdam nulla
                          accusantium, nobis sed architecto magni ullam earum
                          repellendus amet perspiciatis repudiandae molestiae
                          minus non autem error. Exercitationem!
                        </p>
                      </div>
                      <div className="img-details">
                        <img
                          className="img-fluid"
                          src=" /img/linhh.png"
                          alt="acer"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="item d-flex gap-3">
                    <div className="img-item">
                      <img
                        className="img-fluid"
                        src=" /img/linhh.png"
                        alt="acer"
                      />
                    </div>
                    <div className="content-item w-100">
                      <p>
                        <strong>Manh Anh</strong>
                      </p>
                      <div className="rate">
                        <i className="fa fa-star text-warning" />
                        <i className="fa fa-star text-warning" />
                        <i className="fa fa-star text-warning" />
                        <i className="fa fa-star text-warning" />
                        <i className="fa-regular fa-star text-black-50" />
                      </div>
                      <div className="date fs-14">06 / 08 / 2024</div>
                      <div className="text">
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Totam laboriosam quaerat, quibusdam nulla
                          accusantium, nobis sed architecto magni ullam earum
                          repellendus amet perspiciatis repudiandae molestiae
                          minus non autem error. Exercitationem!
                        </p>
                      </div>
                      <div className="img-details">
                        <img
                          className="img-fluid"
                          src=" /img/linhh.png"
                          alt="acer"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    id="pagination"
                    className="d-flex justify-content-center align-items-center"
                  >
                    <div className="pagination-item">
                      <a href="#">
                        <i
                          className="fa-solid fa-chevron-left"
                          aria-hidden="true"
                        />
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
                        {" "}
                        <i
                          className="fa-solid fa-chevron-right"
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
