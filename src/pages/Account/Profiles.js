const Profiles = () => {
  return (
    <div id="profiles">
      <div className="py-2 border-bottom border-2 border-primary-subtle">
        <div
          className="fw-bold"
          style={{ fontSize: "18px", color: "var(--main-color)" }}
        >
          My Account
        </div>
        <p className="m-0 fs-14">
          Manage profile information to secure your account
        </p>
      </div>
      <div className="px-3">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="row">
              <div className="col-12">
                <div className="wrapper-input">
                  <div className="inputGroup">
                    <input id="name" type="text" required autoComplete="off" />
                    <label htmlFor="name">User Name</label>
                  </div>
                  <div className="inputGroup">
                    <input
                      id="email"
                      type="email"
                      required
                      autoComplete="off"
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="inputGroup">
                    <input
                      id="phone"
                      type="number"
                      required
                      autoComplete="off"
                    />
                    <label htmlFor="phone">Phone Number</label>
                  </div>

                  <div className="inputGroup">
                    <input
                      id="address"
                      type="number"
                      required
                      autoComplete="off"
                    />
                    <label htmlFor="address">Address</label>
                  </div>

                  <div className="radio-inputs">
                    <label className="radio">
                      <input type="radio" name="sex" defaultChecked />
                      <span className="name">Male</span>
                    </label>
                    <label className="radio">
                      <input type="radio" name="sex" />
                      <span className="name">Female</span>
                    </label>
                  </div>

                  <div className="inputGroup text-center ">
                    <input
                      id="my-birthday"
                      type="date"
                      required
                      autoComplete="off"
                    />
                  </div>

                  <button className="btn-custom w-100 py-2 my-2">Apply</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div
              className="d-block d-md-none fw-bold border-bottom border-2 my-2 border-primary-subtle"
              style={{
                fontSize: "18px",
                color: "var(--main-color)",
                marginLeft: "-12px",
              }}
            >
              Avatar
            </div>
            <div className="d-flex flex-column align-item-center justify-content-center gap-2 my-5">
              <div className="text-center">
                <label htmlFor="upload-image">
                  <img className="img-prev " src="/img/linhh.jpg" alt="true" />
                </label>
              </div>
              <div className="text-center">
                <input className="d-none" id="upload-image" type="file" />
                <label
                  className="custom-file-label btn-custom bg-danger border border-danger"
                  htmlFor="upload-image"
                >
                  <i className="fa-solid fa-upload me-2 text-white" />
                  Choose File
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
