const Footer = () => {
  return (
    <footer className="pt-4">
      <section className="support d-flex flex-wrap gap-4 justify-content-center align-items-center my-4">
        <div className="text-uppercase">
          <i className="fa-solid fa-circle-check fa-2xl text-primary" /> &nbsp;
          genuine product
        </div>
        <div className="text-uppercase">
          <i className="fa-solid fa-cart-shopping fa-2xl text-primary" /> &nbsp;
          free shipping
        </div>
        <div className="text-uppercase">
          <i className="fa-solid fa-phone-volume fa-2xl text-primary" /> &nbsp;
          1900.1502
        </div>
        <div className="text-uppercase">
          <i className="fa-solid fa-arrows-rotate fa-2xl text-primary" /> &nbsp;
          easy return
        </div>
      </section>
      <section className="footer-b bg-black text-light py-4">
        <div className="container-fluid py-2 d-flex gap-4">
          <div className="row">
            <div className="logo-footer col-lg-3 col-md-6 col-sm-6">
              <img
                className="img-fluid"
                src="./img/logo-footer.png"
                alt="ac"
              />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="text-uppercase fs-5 fw-bold">Contact us</div>
              <ul>
                <li className="fs-14">
                  <i className="fa-solid fa-location-dot fa-xl text-white" />
                  &nbsp; Dai Mo - Nam Tu Liem - Ha Noi
                </li>
                <li className="fs-14">
                  <i className="fa-solid fa-envelope fa-xl text-white" />
                  &nbsp;manhanhwithlove@gmail.com
                </li>
                <li className="fs-14">
                  <i className="fa-solid fa-phone fa-xl text-white" />
                  &nbsp;030402371
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 ps-lg-4">
              <div className="text-uppercase fs-5 fw-bold">Social Network</div>
              <ul>
                <li className="fs-14">
                  <i className="fa-brands fa-facebook fa-xl text-white" />
                  &nbsp; Facebook
                </li>
                <li className="fs-14">
                  <i className="fa-brands fa-instagram fa-xl text-white" />
                  &nbsp; Instagram
                </li>
                <li className="fs-14">
                  <i className="fa-brands fa-tiktok fa-xl text-white" />
                  &nbsp; Tiktok
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="text-uppercase fs-5 fw-bold">
                Support - Services
              </div>
              <ul>
                <li className="fs-14">
                  <i className="fa-solid fa-handcuffs fa-xl text-white" />
                  &nbsp;Policy and purchasing instructions replied
                </li>
                <li className="fs-14">
                  <i className="fa-brands fa-guilded fa-xl text-white" />
                  &nbsp;Instructions for purchasing and converting policies
                </li>
                <li className="fs-14">
                  <i className="fa-solid fa-shield-halved fa-xl text-white" />
                  &nbsp;Privacy policy
                </li>
                <li className="fs-14">
                  <i className="fa-brands fa-fedora fa-xl text-white" />
                  &nbsp;Operating regulations
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center fs-5">
          <i className="fa-regular fa-copyright text-white fa-xl" /> 2024 Cyber
          Store - ManhAnh
        </div>
      </section>
    </footer>
  );
};

export default Footer;
