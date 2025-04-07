import Slider from "react-slick";
import { CustomNextArrow, CustomePrevArrow } from "../../utilities";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  prevArrow: <CustomePrevArrow />,
  nextArrow: <CustomNextArrow />,
};

const Banner = () => {
  return (
    <section id="banner" className="mb-4">
      <div className="container-fluid">
        <div className="row d-none d-sm-block">
          <div id="ads">
            <p>
              Khám phá các thiết bị điện tử tiên tiến với mức giá không thể
              tuyệt vời hơn tại AlphaLink Store, điểm đến hàng đầu của bạn cho
              các thiết bị công nghệ!
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-sm-12">
            <Slider {...settings}>
              <div>
                <img
                  src="/img/banner-1.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div>
                <img
                  src="/img/banner-2.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div>
                <img
                  src="/img/banner-3.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div>
                <img
                  src="/img/banner-4.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            </Slider>
          </div>
          <div className="sub-carousel col-lg-4 col-sm-12 d-flex flex-lg-column mt-4 mt-lg-0 justify-content-lg-between">
            <div>
              <img className="w-100" src="/img/banner-sub1.png" alt="ac" />
            </div>
            <div>
              <img className="w-100" src="/img/banner-sub2.png" alt="ac" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
