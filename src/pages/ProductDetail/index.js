import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { CustomNextArrow, CustomePrevArrow } from "../../share/components/CustomArrowSlick";
const ProductDetail = () => {
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
    // speed: 2000,
    // autoplaySpeed: 2000,
    // autoplay: false,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomePrevArrow />,
  }
  return (
    <>
      <section className="breadcrumb-custom">
        <div className="container-fluid">
          <p>home / laptop / Acer Aspire Go 15 Slim Laptop</p>
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
                    <div>
                      <img src="./img/products/acer1.jpg" alt="acer" />
                    </div>
                    <div>
                      <img src="./img/products/acer1_1.jpg" alt="acer" />
                    </div>
                    <div>
                      <img src="./img/products/acer1_2.jpg" alt="acer" />
                    </div>
                    <div>
                      <img src="./img/products/acer1_3.jpg" alt="acer" />
                    </div>
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
                    <div>
                      <img className="img-fluid" src="./img/products/acer1_1.jpg" alt="acer" />
                    </div>
                    <div>
                      <img className="img-fluid" src="./img/products/acer1_2.jpg" alt="acer" />
                    </div>
                    <div>
                      <img className="img-fluid" src="./img/products/acer1_3.jpg" alt="acer" />
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-7 col-12 mt-2 mt-md-0">
              <div className="content h-100 mt-4 mt-md-0">
                <h2>Acer Aspire Go 15 Slim Laptop</h2>
                <div className="review d-flex gap-4">
                  <div className="rate">
                    <i className="fa fa-star text-warning" />
                    <i className="fa fa-star text-warning" />
                    <i className="fa fa-star text-warning" />
                    <i className="fa fa-star text-warning" />
                    <i className="fa-regular fa-star text-black-50" />
                  </div>
                  <div className="sold fw-bold">Sold: 2</div>
                </div>
                <div className="price-item d-flex gap-4">
                  <p className="discount text-secondary">$1000</p>
                  <p className="price text-danger fw-bold">$1639</p>
                </div>
                {/* color */}
                <div className="d-flex align-items-lg-center flex-wrap">
                  <p className="me-2 mb-0">Color:</p>
                  <div className="d-flex flex-wrap">
                    <button className="btn-color active my-2 my-lg-0">
                      Black
                    </button>
                    <button className="btn-color my-2 my-lg-0">Blue</button>
                    <button className="btn-color my-2 my-lg-0">White</button>
                    <button className="btn-color my-2 my-lg-0">Yellow</button>
                  </div>
                </div>
                {/* quantity */}
                <div className="quantity d-flex flex-wrap gap-2 gap-lg-5 align-items-center">
                  <div>Quantity</div>
                  <div className="d-flex number">
                    <button>−</button>
                    <input type="number" min={1} defaultValue={1} />
                    <button>+</button>
                  </div>
                  <div className="d-none d-lg-block my-1 d-flex justify-content-between align-items-center">
                    {/* success */}
                    <p className="text-success fw-bold mb-0">
                      <i
                        style={{ color: "#198754" }}
                        className="fa-regular fa-circle-check me-1 "
                      />
                      In stock
                    </p>
                    {/* danger */}
                    {/* <p class="text-danger fw-bold">
                <i
                  style="color: #dc3545;"
                  class="fa-regular fa-circle-xmark"
                ></i>
                Out of stock
              </p> */}
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
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Labore consequatur culpa, inventore at deserunt dicta
                    sapiente fugiat, pariatur debitis quasi libero ipsa!
                    Similique, aspernatur asperiores impedit eligendi fuga est
                    recusandae.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div id="reviews">
                <p className="title text-uppercase">PRODUCT REVIEWS</p>
                <div className="comments">
                  <div className="item d-flex gap-3">
                    <div className="img-item">
                      <img className="img-fluid" src="./img/linhh.png" alt="acer" />
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
                        <img className="img-fluid" src="./img/linhh.png" alt="acer" />
                      </div>
                    </div>
                  </div>
                  <div className="item d-flex gap-3">
                    <div className="img-item">
                      <img className="img-fluid" src="./img/linhh.png" alt="acer" />
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
                        <img className="img-fluid" src="./img/linhh.png" alt="acer" />
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
