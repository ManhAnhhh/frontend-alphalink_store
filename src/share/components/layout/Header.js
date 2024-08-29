const Header = () => {
  return (
    <header >
      <section id="helper">
        <div className="container-fluid py-2 d-flex justify-content-end align-items-center gap-4">
          <div>
            <p>Help</p>
          </div>
          <div>
            <p>Vietnamese</p>
          </div>
          <div>
            <p>
              <span className="d-none d-sm-inline-block circle me-1">A</span>
              <span className="d-none d-sm-inline-block">Hello, </span>
              <span>Ngo Manh Anh</span>
              <i className="fa-solid fa-chevron-down fa-2xs" />
            </p>
          </div>
        </div>
      </section>
      <section id="main-header">
        <div className="container-fluid py-4">
          <div className="row align-items-end">
            <div className="logo-top col-lg-4 col-md-12 col-sm-12 text-center text-lg-start mb-4 mb-lg-0">
              <a href="./home.html">
                <img
                  className="img-fluid"
                  src="./img/logo-top.png"
                  alt="logo-top"
                />
              </a>
            </div>
            <div className="search-box col-lg-5 col-md-6 col-sm-12 mb-4 mb-md-0 d-flex justify-content-center">
              <input
                id="search"
                className="input py-2 px-3"
                type="search"
                name="search"
                placeholder="Search . . ."
              />
              <button id="btn-search" className="py-1 btn-custom" type="button">
                Search
              </button>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 icon-home d-flex gap-4 justify-content-center">
              <div className="heart-icon py-1 mx-2">
                <i className="fa-regular fa-heart fa-2xl" />
                <span className="badge-custom badge-top-right">10</span>
              </div>
              <div className="cart-icon py-1 mx-2">
                <i className="fa-solid fa-cart-shopping fa-2xl" />
                <span className="badge-custom badge-top-right">1</span>
              </div>
              {/* login */}
              {/* <button class="btn-custom py-2 px-2">Sign Up</button>
              <button class="btn-custom py-2 px-2">Log in</button> */}
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
