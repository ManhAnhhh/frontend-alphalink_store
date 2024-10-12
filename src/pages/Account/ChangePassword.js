import { Link } from "react-router-dom";
import { useState } from "react";
const ChangePassword = () => {
  const numberInput = 3;
  const intialShowPassword = Array(numberInput).fill(false);
  const intialPassword = Array(numberInput).fill("");
  
  const [showPassword, setShowPassword] = useState(intialShowPassword);
  const [passArr, setPassArr] = useState(intialPassword);

  const label = ["Odd Password", "New Password", "Confirm Password"];

  const onChangePassword = (value, i) => {
    setPassArr((prev) =>
      prev.map((item, index) => (index === i ? value : item))
    );
  };

  const handleVisiblePassword = (i) => {
    setShowPassword((prev) =>
      prev.map((item, index) => (index === i ? !item : item))
    );
  };
  console.log(showPassword);
  console.log(passArr);

  return (
    <div id="change-password">
      <div
        className="my-2 fw-bold py-2 border-bottom border-2 border-primary-subtle"
        style={{ fontSize: 18, color: "var(--main-color)" }}
      >
        Change Password
      </div>
      <div className="px-4 py-2 wrapper-input-password ms-5">
        {Array(3)
          .fill(0)
          .map((_, index) => {
            return (
              <div
                key={_ + index}
                className="d-flex align-items-center gap-2 gap-sm-3 my-4 flex-wrap"
              >
                <label className="label-input-password">{label[index]}</label>
                <div className="input-password-group position-relative">
                  <input
                    value={passArr[index]}
                    className="input-password"
                    type={showPassword[index] ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => onChangePassword(e.target.value, index)}
                  />
                  <i
                    onClick={() => handleVisiblePassword(index)}
                    className={`position-absolute end-0 me-2 icon icon-eyes fa-regular fa-eye${
                      showPassword[index] ? "-slash" : ""
                    } `}
                  ></i>
                </div>
              </div>
            );
          })}
        <div>
          <Link to="" className="fs-14 text-primary ">
            Forget password
          </Link>
        </div>

        <button
          className="btn-custom py-2 my-2 d-block ms-auto "
          style={{ width: "130px" }}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
