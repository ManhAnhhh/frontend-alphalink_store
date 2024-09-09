import Slider from "react-slick";
import { useState, useEffect } from "react";
import ProductItem from "../../share/components/Product-item";
import { CustomNextArrow, CustomePrevArrow } from "../../share/utilities";
import { getProducts } from "../../services/Api";
const Home = () => {
  const [bestSeller, setBestSeller] = useState([]);
  const [featureProducts, setfeatureProducts] = useState([]);
  const settings = {
    dots: false,
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

  useEffect(() => {
    getProducts().then(({ data }) => {
      setBestSeller(() => {
        return data.data.filter((products) => products.sold >= 100);
      });
      setfeatureProducts(() => {
        return data.data.filter((products) => products.is_feature === true);
      })
    });
  }, []);

  return (
    <>
      <section id="best-seler">
        <div className="container-fluid">
          <h2 className="text-uppercase title-product">Best seller</h2>
          <Slider {...settings} className="slick-carousel">
            {bestSeller.map((product, i) => (
              <div key={i} className="wrapper px-2 px-lg-1 ">
                <div className="item">
                  <ProductItem product={product} />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
      <section id="feature-products">
        <div className="container-fluid">
          <h2 className="text-uppercase title-product">Feature products</h2>
          <div className="items row">
            {featureProducts.map((product, i) => (
              <div key={i} className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 my-2">
                <div className="item">
                  <ProductItem product={product} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
