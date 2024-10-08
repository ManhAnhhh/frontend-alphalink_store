import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const GetImageProduct = (imageName) => {
  if (imageName === undefined) {
    return "/img/error-image.png";
  }
  return `${process.env.REACT_APP_BASE_URL}assets/uploads/products/${imageName}`;
};

export const GetImageCustomer = (imageName) => {
  if (imageName === undefined) {
    return "/img/error-image.png";
  }
  return `${process.env.REACT_APP_BASE_URL}assets/uploads/customers/${imageName}`;
};

export const GetImageProductReview = (imageName) => {
  if (imageName === undefined) {
    return "/img/error-image.png";
  }
  return `${process.env.REACT_APP_BASE_URL}assets/uploads/product_reviews/${imageName}`;
};

export const PopUp = ({
  // type[loading, info, success, warning, error]
  type = "info",
  position = "top-right",
  autoClose = 2000,
  theme = "light",
  content,
}) => {
  return toast[type](content, {
    position,
    autoClose,
    theme,
  });
};

export const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#dee2e6" }}
      onClick={onClick}
    />
  );
};

export const CustomePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#dee2e6",
      }}
      onClick={onClick}
    />
  );
};

export const convertDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: "short", day: "2-digit", year: "numeric" };

  return date.toLocaleDateString("en-US", options);
};

export const HandlePriceWithDiscount = (price, discount) => {
  const total = price - (price * discount) / 100;
  return parseFloat(total.toFixed(2));
};

export const LOADING_TIME = 1500;
