import Slider from "react-slick";
import ProductItem from "../../share/components/Product-item";
import {
  CustomNextArrow,
  CustomePrevArrow,
} from "../../share/components/CustomArrowSlick";
const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomePrevArrow />,
    responsive: [
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div>
        <section id="best-seler">
          <div className="container-fluid">
            <h2 className="text-uppercase title-product">Best seller</h2>
            <Slider {...settings} className="slick-carousel">
              <div className="wrapper px-2 px-lg-1 ">
                <div className="item">
                  <ProductItem />
                </div>
              </div>
              <div className="wrapper px-2 px-lg-1 ">
                <div className="item">
                  <ProductItem />
                </div>
              </div>
              <div className="wrapper px-2 px-lg-1 ">
                <div className="item">
                  <ProductItem />
                </div>
              </div>
              <div className="wrapper px-2 px-lg-1 ">
                <div className="item">
                  <ProductItem />
                </div>
              </div>
              <div className="wrapper px-2 px-lg-1 ">
                <div className="item">
                  <ProductItem />
                </div>
              </div>
            </Slider>
          </div>
        </section>
        <section id="new-products">
          <div className="container-fluid">
            <h2 className="text-uppercase title-product">new products</h2>
            <div className="items row">
              <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 my-2">
                <div className="item">
                  <div className="discount-percent">
                    <p>-12%</p>
                  </div>
                  <div className="img-item">
                    <a href="./category.html">
                      <img src="./img/products/acer2.jpg" alt="" />
                    </a>
                  </div>
                  <h5 className="name-item pt-2">
                    Acer Aspire Go 15 Slim Laptop
                  </h5>
                  <div className="desc-item fs-12">
                    <p>Free charging cable, mouse and backpack</p>
                  </div>
                  <div className="review d-flex justify-content-between my-1">
                    <div className="rate">
                      <i className="fa fa-star text-warning" />
                      <i className="fa fa-star text-warning" />
                      <i className="fa fa-star text-warning" />
                      <i className="fa fa-star text-warning" />
                      <i className="fa-regular fa-star text-black-50" />
                    </div>
                    <div className="sold fw-bold">Sold: 2</div>
                  </div>
                  <div className="price-item d-flex justify-content-between my-1">
                    <p className="price text-danger fw-bold">$1639</p>
                    <p className="discount text-secondary">$1000</p>
                  </div>
                  <div className="stock-item my-1 d-flex justify-content-between align-items-center">
                    {/* success */}
                    <p className="text-success fw-bold">
                      <i
                        style={{ color: "#198754" }}
                        className="fa-regular fa-circle-check"
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
                    {/* <div class="heart-icon py-1 mx-2">
              <i class="fa-regular fa-heart fa-2xl"></i>
            </div> */}
                    {/* when clicking tym */}
                    <div className="heart-icon py-1 mx-2">
                      <i
                        style={{ color: "#dc3545" }}
                        className="fa-solid fa-heart fa-2xl"
                      />
                    </div>
                  </div>
                  <button className="btn-add-to-cart btn-custom my-2 w-100">
                    Add to cart
                  </button>
                </div>
              </div>
              <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 my-2">
                <div className="item">
                  <div className="discount-percent">
                    <p>-12%</p>
                  </div>
                  <div className="img-item">
                    <img src="./img/products/acer2.jpg" alt="" />
                  </div>
                  <h5 className="name-item pt-2">
                    Acer Aspire Go 15 Slim Laptop
                  </h5>
                  <div className="desc-item fs-12">
                    <p>Free charging cable, mouse and backpack</p>
                  </div>
                  <div className="review d-flex justify-content-between my-1">
                    <div className="rate">
                      <i className="fa fa-star text-warning" />
                      <i className="fa fa-star text-warning" />
                      <i className="fa fa-star text-warning" />
                      <i className="fa fa-star text-warning" />
                      <i className="fa-regular fa-star text-black-50" />
                    </div>
                    <div className="sold fw-bold">Sold: 2</div>
                  </div>
                  <div className="price-item d-flex justify-content-between my-1">
                    <p className="price text-danger fw-bold">$1639</p>
                    <p className="discount text-secondary">$1000</p>
                  </div>
                  <div className="stock-item my-1 d-flex justify-content-between align-items-center">
                    {/* success */}
                    <p className="text-success fw-bold">
                      <i
                        style={{ color: "#198754" }}
                        className="fa-regular fa-circle-check"
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
                    {/* <div class="heart-icon py-1 mx-2">
              <i class="fa-regular fa-heart fa-2xl"></i>
            </div> */}
                    {/* when clicking tym */}
                    <div className="heart-icon py-1 mx-2">
                      <i
                        style={{ color: "#dc3545" }}
                        className="fa-solid fa-heart fa-2xl"
                      />
                    </div>
                  </div>
                  <button className="btn-add-to-cart btn-custom my-2 w-100">
                    Add to cart
                  </button>
                </div>
              </div>
              <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 my-2">
                <div className="item">
                  <div className="img-item">
                    <img src="./img/products/acer2.jpg" alt="" />
                  </div>
                  <h5 className="name-item pt-2">
                    Acer Aspire Go 15 Slim Laptop
                  </h5>
                  <div className="desc-item fs-12">
                    <p>Free charging cable, mouse and backpack</p>
                  </div>
                  <div className="review d-flex justify-content-between my-1">
                    <div className="rate">
                      <i className="fa fa-star text-warning" />
                      <i className="fa fa-star text-warning" />
                      <i className="fa fa-star text-warning" />
                      <i className="fa fa-star text-warning" />
                      <i className="fa-regular fa-star text-black-50" />
                    </div>
                    <div className="sold fw-bold">Sold: 2</div>
                  </div>
                  <div className="price-item d-flex justify-content-between my-1">
                    <p className="price text-danger fw-bold">$1639</p>
                    <p className="discount text-secondary">$1000</p>
                  </div>
                  <div className="stock-item my-1 d-flex justify-content-between align-items-center">
                    {/* success */}
                    <p className="text-success fw-bold">
                      <i
                        style={{ color: "#198754" }}
                        className="fa-regular fa-circle-check"
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
                    {/* <div class="heart-icon py-1 mx-2">
              <i class="fa-regular fa-heart fa-2xl"></i>
            </div> */}
                    {/* when clicking tym */}
                    <div className="heart-icon py-1 mx-2">
                      <i
                        style={{ color: "#dc3545" }}
                        className="fa-solid fa-heart fa-2xl"
                      />
                    </div>
                  </div>
                  <button className="btn-add-to-cart btn-custom my-2 w-100">
                    Add to cart
                  </button>
                </div>
              </div>
              <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 my-2">
                <div className="item">
                  <div className="img-item">
                    <img src="./img/products/acer2.jpg" alt="" />
                  </div>
                  <h5 className="name-item pt-2">
                    Acer Aspire Go 15 Slim Laptop
                  </h5>
                  <div className="desc-item fs-12">
                    <p>Free charging cable, mouse and backpack</p>
                  </div>
                  <div className="review d-flex justify-content-between my-1">
                    <div className="rate">
                      <i className="fa fa-star text-warning" />
                      <i className="fa fa-star text-warning" />
                      <i className="fa fa-star text-warning" />
                      <i className="fa fa-star text-warning" />
                      <i className="fa-regular fa-star text-black-50" />
                    </div>
                    <div className="sold fw-bold">Sold: 2</div>
                  </div>
                  <div className="price-item d-flex justify-content-between my-1">
                    <p className="price text-danger fw-bold">$1639</p>
                    <p className="discount text-secondary">$1000</p>
                  </div>
                  <div className="stock-item my-1 d-flex justify-content-between align-items-center">
                    {/* success */}
                    <p className="text-success fw-bold">
                      <i
                        style={{ color: "#198754" }}
                        className="fa-regular fa-circle-check"
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
                    {/* <div class="heart-icon py-1 mx-2">
              <i class="fa-regular fa-heart fa-2xl"></i>
            </div> */}
                    {/* when clicking tym */}
                    <div className="heart-icon py-1 mx-2">
                      <i
                        style={{ color: "#dc3545" }}
                        className="fa-solid fa-heart fa-2xl"
                      />
                    </div>
                  </div>
                  <button className="btn-add-to-cart btn-custom my-2 w-100">
                    Add to cart
                  </button>
                </div>
              </div>
              <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 my-2">
                <div className="item">
                  <div className="img-item">
                    <img src="./img/products/acer2.jpg" alt="" />
                  </div>
                  <h5 className="name-item pt-2">
                    Acer Aspire Go 15 Slim Laptop
                  </h5>
                  <div className="desc-item fs-12">
                    <p>Free charging cable, mouse and backpack</p>
                  </div>
                  <div className="review d-flex justify-content-between my-1">
                    <div className="rate">
                      <i className="fa fa-star text-warning" />
                      <i className="fa fa-star text-warning" />
                      <i className="fa fa-star text-warning" />
                      <i className="fa fa-star text-warning" />
                      <i className="fa-regular fa-star text-black-50" />
                    </div>
                    <div className="sold fw-bold">Sold: 2</div>
                  </div>
                  <div className="price-item d-flex justify-content-between my-1">
                    <p className="price text-danger fw-bold">$1639</p>
                    <p className="discount text-secondary">$1000</p>
                  </div>
                  <div className="stock-item my-1 d-flex justify-content-between align-items-center">
                    {/* success */}
                    <p className="text-success fw-bold">
                      <i
                        style={{ color: "#198754" }}
                        className="fa-regular fa-circle-check"
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
                    {/* <div class="heart-icon py-1 mx-2">
              <i class="fa-regular fa-heart fa-2xl"></i>
            </div> */}
                    {/* when clicking tym */}
                    <div className="heart-icon py-1 mx-2">
                      <i
                        style={{ color: "#dc3545" }}
                        className="fa-solid fa-heart fa-2xl"
                      />
                    </div>
                  </div>
                  <button className="btn-add-to-cart btn-custom my-2 w-100">
                    Add to cart
                  </button>
                </div>
              </div>
              <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 my-2">
                <div className="item">
                  <div className="img-item">
                    <img src="./img/products/acer2.jpg" alt="" />
                  </div>
                  <h5 className="name-item pt-2">
                    Acer Aspire Go 15 Slim Laptop
                  </h5>
                  <div className="desc-item fs-12">
                    <p>Free charging cable, mouse and backpack</p>
                  </div>
                  <div className="review d-flex justify-content-between my-1">
                    <div className="rate">
                      <i className="fa fa-star text-warning" />
                      <i className="fa fa-star text-warning" />
                      <i className="fa fa-star text-warning" />
                      <i className="fa fa-star text-warning" />
                      <i className="fa-regular fa-star text-black-50" />
                    </div>
                    <div className="sold fw-bold">Sold: 2</div>
                  </div>
                  <div className="price-item d-flex justify-content-between my-1">
                    <p className="price text-danger fw-bold">$1639</p>
                    <p className="discount text-secondary">$1000</p>
                  </div>
                  <div className="stock-item my-1 d-flex justify-content-between align-items-center">
                    {/* success */}
                    <p className="text-success fw-bold">
                      <i
                        style={{ color: "#198754" }}
                        className="fa-regular fa-circle-check"
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
                    {/* <div class="heart-icon py-1 mx-2">
              <i class="fa-regular fa-heart fa-2xl"></i>
            </div> */}
                    {/* when clicking tym */}
                    <div className="heart-icon py-1 mx-2">
                      <i
                        style={{ color: "#dc3545" }}
                        className="fa-solid fa-heart fa-2xl"
                      />
                    </div>
                  </div>
                  <button className="btn-add-to-cart btn-custom my-2 w-100">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
