import Slider from "react-slick";
import { useState, useEffect } from "react";
import ProductItem from "../../share/components/Product-item";
import { CustomNextArrow, CustomePrevArrow } from "../../share/utilities";
import { getProducts } from "../../services/Api";
import HomeSkeleton from "../../share/components/Skeleton/HomeSkeleton";
import { useSelector } from "react-redux";

const Home = () => {
  const [bestSeller, setBestSeller] = useState([]);
  const [featureProducts, setfeatureProducts] = useState([]);

  const isLoading = useSelector((state) => state.Loading.isLoading);

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
    getProducts()
      .then(({ data }) => {
        setBestSeller(() => {
          return data?.data?.filter((products) => products.sold >= 100);
        });
        setfeatureProducts(() => {
          // Đảm bảo data và data.data tồn tại
          if (!data?.data) {
            return [];
          }

          // 1. Sắp xếp các sản phẩm theo trường 'updatedAt' giảm dần
          //    (sản phẩm mới nhất sẽ lên đầu)
          const sortedProducts = [...data.data].sort((a, b) => {
            // Chuyển đổi chuỗi ngày thành đối tượng Date để so sánh
            const dateA = new Date(a.updatedAt);
            const dateB = new Date(b.updatedAt);
            return dateB.getTime() - dateA.getTime(); // Sắp xếp giảm dần
          });

          // 2. Lấy ra 12 sản phẩm đầu tiên
          const latestProducts = sortedProducts.slice(0, 12);

          return latestProducts;
        });
      })
      .catch((err) => {});
  }, []);

  if (isLoading) {
    return <HomeSkeleton />;
  }

  return (
    <>
      <section id="best-seler">
        <div className="container-fluid">
          <h2 className="text-uppercase title-product">Sản phẩm bán chạy</h2>
          <Slider {...settings} className="slick-carousel">
            {bestSeller?.map((product, i) => (
              <div key={i} className="px-2 px-lg-1 ">
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
          <h2 className="text-uppercase title-product">Sản phẩm mới</h2>
          <div className="items row">
            {featureProducts?.map((product, i) => (
              <div
                key={i}
                className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 my-2"
              >
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
