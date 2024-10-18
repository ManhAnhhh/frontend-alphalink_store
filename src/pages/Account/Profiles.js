import { useEffect, useState, useRef } from "react";
import { getCustomerByID, updateCustomer } from "../../services/Api";
import { useParams } from "react-router-dom";
import { GetImageCustomer, PopUp } from "../../share/utilities";
import Swal from "sweetalert2";
import { updateCurrentCustomer } from "../../redux/reducers/auth";
import { useDispatch } from "react-redux";

const Profiles = () => {
  const dispatch = useDispatch();
  const sexRefs = useRef([]);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [picturePreview, setPicturePreview] = useState("");
  const [file, setFile] = useState();

  const { id } = useParams();

  useEffect(() => {
    getCustomerByID(id)
      .then(({ data }) => {
        setUserName(data.data.fullName);
        setEmail(data.data.email);
        setPhone(data.data.phone);
        setAddress(data.data.address);
        setBirthDay(data.data.birthDay);
        setPicturePreview(data.data.picture);

        const sex = data.data.sex;
        sex.toLowerCase() === "male"
          ? (sexRefs.current[0].checked = true)
          : (sexRefs.current[1].checked = true);
      })
      .catch((err) => {});
  }, [id]);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(picturePreview);
    };
  }, [picturePreview]);

  const handlePreviewImage = (e) => {
    const file = e.target.files[0];
    setPicturePreview(URL.createObjectURL(file));
    setFile(file);

    // handle chọn 2 lần 1 ảnh mà không kích hoạt onChange
    e.target.value = null;
  };

  const isValidateField = () => {
    // Validate input
    if (
      userName.trim() === "" ||
      email.trim() === "" ||
      phone.trim() === "" ||
      address.trim() === "" ||
      birthDay === ""
    ) {
      PopUp({
        type: "error",
        content: "Please fill in all required fields",
      });

      return false;
    }

    const patternEmail = /^\S+@\S+\.\S+$/;
    if (!patternEmail.test(email)) {
      PopUp({
        type: "error",
        content: "Invalid email",
      });
      return false;
    }

    const patternPhone = /^\d{10}$/;
    if (!patternPhone.test(phone)) {
      PopUp({
        type: "error",
        content: "Phone must be numeric and have 10 digits",
      });
      return false;
    }
    return true;
  };

  const handleApply = () => {
    if (!isValidateField()) return;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Update",
    }).then((result) => {
      if (result.isConfirmed) {
        let sex = "male";
        if (sexRefs.current[1].checked) sex = "female";
        const data = {
          fullName: userName,
          email,
          phone,
          address,
          birthDay,
          sex,
        };

        const formData = new FormData();
        formData.append("thumbnail", file);

        Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });

        updateCustomer(id, formData)
          .then(async ({ data }) => {
            // console.log(data);
            dispatch(updateCurrentCustomer(data.data));

            await Swal.fire({
              position: "center",
              icon: "success",
              title: "Information updated successfully.",
              showConfirmButton: true,
              timer: 1500,
            });
            window.location.reload();
          })
          .catch((err) => {
            Swal.fire({
              title: "Update Failed!",
              text: err?.response?.data?.message || err,
              icon: "error",
            });
          });
      }
    });
  };

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
                    <input
                      name="fullName"
                      value={userName}
                      id="name"
                      type="text"
                      onChange={(e) => setUserName(e.target.value)}
                    />
                    <label htmlFor="name">User Name</label>
                  </div>
                  <div className="inputGroup">
                    <input
                      name="email"
                      value={email}
                      id="email"
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="inputGroup">
                    <input
                      name="phone"
                      value={phone}
                      id="phone"
                      type="number"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <label htmlFor="phone">Phone Number</label>
                  </div>

                  <div className="inputGroup">
                    <input
                      name="address"
                      value={address}
                      id="address"
                      type="text"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <label htmlFor="address">Address</label>
                  </div>

                  <div className="radio-inputs">
                    <label className="radio">
                      <input
                        type="radio"
                        name="sex"
                        ref={(e) => (sexRefs.current[0] = e)}
                      />
                      <span className="name">Male</span>
                    </label>
                    <label className="radio">
                      <input
                        type="radio"
                        name="sex"
                        ref={(e) => (sexRefs.current[1] = e)}
                      />
                      <span className="name">Female</span>
                    </label>
                  </div>

                  <div className="inputGroup text-center ">
                    <input
                      name="birthDay"
                      id="my-birthday"
                      type="date"
                      value={birthDay}
                      onChange={(e) => setBirthDay(e.target.value)}
                      max={new Date().toISOString().split("T")[0]}
                      min={"1940-01-01"}
                    />
                    {console.log(birthDay)}
                  </div>

                  <button
                    type="button"
                    onClick={handleApply}
                    className="btn-custom w-100 py-2 my-2"
                  >
                    Apply
                  </button>
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
                  <img
                    className="img-prev"
                    src={GetImageCustomer(picturePreview)}
                    alt="true"
                    onError={(e) => (e.target.src = picturePreview)}
                  />
                </label>
              </div>
              <div className="text-center">
                <input
                  name="file"
                  className="d-none"
                  id="upload-image"
                  type="file"
                  accept="image/png, image/jpg , image/jpeg"
                  onChange={handlePreviewImage}
                />
                <label
                  className="custom-file-label btn-custom bg-danger border border-danger"
                  htmlFor="upload-image"
                >
                  <i className="icon fa-solid fa-upload me-2 text-white" />
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
