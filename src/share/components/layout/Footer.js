const Footer = () => {
  return (
    <footer className="pt-4">
      <section className="support d-flex flex-wrap gap-4 justify-content-center align-items-center my-4">
        <div className="text-uppercase">
          <i className="icon fa-solid fa-circle-check fa-2xl text-primary me-1" />
          Sản phẩm chính hãng
        </div>
        <div className="text-uppercase">
          <i className="icon fa-solid fa-cart-shopping fa-2xl text-primary me-1" />
          Giao hàng toàn quốc
        </div>
        <div className="text-uppercase">
          <i className="icon fa-solid fa-phone-volume fa-2xl text-primary me-1" />
          1900.1502
        </div>
        <div className="text-uppercase">
          <i className="icon fa-solid fa-headset fa-2xl text-primary me-1" />
          Tư vấn nhanh chóng
        </div>
      </section>
      <section className="footer-b bg-black text-light py-4">
        <div className="container-fluid py-2 d-flex gap-4">
          <div className="row">
            <div className="logo-footer col-lg-3 col-md-6 col-sm-6">
              <img
                className="img-fluid"
                src="/img/logo-footer.png"
                alt="logo-footer"
              />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="title text-uppercase fs-5 fw-bold">Liên hệ</div>
              <ul>
                <li className="fs-14">
                  <i className="icon fa-solid fa-location-dot fa-xl text-white me-2" />
                  Đại Mỗ - Nam Từ Liêm - Hà Nội
                </li>
                <li className="fs-14">
                  <i className="icon fa-solid fa-envelope fa-xl text-white me-1" />
                  manhanhwithlove@gmail.com
                </li>
                <li className="fs-14">
                  <i className="icon fa-solid fa-phone fa-xl text-white me-1" />
                  030402371
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 ps-lg-4">
              <div className="title text-uppercase fs-5 fw-bold">
                Mạng xã hội
              </div>
              <ul>
                <li className="fs-14">
                  <i className="icon fa-brands fa-facebook fa-xl text-white me-1" />
                  Facebook
                </li>
                <li className="fs-14">
                  <i className="icon fa-brands fa-instagram fa-xl text-white me-1" />
                  Instagram
                </li>
                <li className="fs-14">
                  <i className="icon fa-brands fa-tiktok fa-xl text-white me-1" />
                  Tiktok
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="title text-uppercase fs-5 fw-bold">
                Hỗ trợ - Dịch vụ
              </div>
              <ul>
                <li className="fs-14">
                  <i className="icon fa-solid fa-thumbs-up fa-xl text-white me-1" />
                  Chính sách và hướng dẫn mua hàng
                </li>
                <li className="fs-14">
                  <i className="icon fa-brands fa-guilded fa-xl text-white me-1" />
                  Quy chế hoạt động
                </li>
                <li className="fs-14">
                  <i className="icon fa-solid fa-shield-halved fa-xl text-white me-1" />
                  Chính sách bảo mật
                </li>
                <li className="fs-14">
                  <i className="icon fa-brands fa-fedora fa-xl text-white me-1" />
                  Chính sách vận chuyển
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center fs-5">
          <i className="icon fa-regular fa-copyright text-white fa-xl" /> 2024
          Alphalink Store - ManhAnh
        </div>
      </section>
    </footer>
  );
};

export default Footer;
