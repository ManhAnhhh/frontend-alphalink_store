import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const USD_TO_VND = 20000;
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
  try {
    return `${process.env.REACT_APP_BASE_URL}assets/uploads/customers/${imageName}`;
  } catch (error) {
    return error;
  }
};

export const GetImageProductReview = (imageName) => {
  if (imageName === undefined) {
    return "/img/error-image.png";
  }
  return `${process.env.REACT_APP_BASE_URL}assets/uploads/product_reviews/${imageName}`;
};

export const PopUp = ({
  // type = [loading, info, success, warning, error]
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

export const capitalizeFirstLetter = (str) => {
  if (str.length === 0) return str; // Kiểm tra chuỗi rỗng
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formattedPriceUSD = (price, discount) => {
  const result = HandlePriceWithDiscount(price, discount);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(result);
};

export const formattedPriceVND = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price * USD_TO_VND);
};

export const LOADING_TIME = 1500;
