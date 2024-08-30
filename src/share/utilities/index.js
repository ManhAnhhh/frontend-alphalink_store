import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const GetImageProduct = (imageName) => {
  return `${process.env.REACT_APP_BASE_URL}assets/uploads/products/${imageName}`;
};

export const PopUp = ({
  // type[loading, info, success, warning, error]
  type = "info",
  position = "top-right",
  autoClose = 3000,
  theme = "light",
  content,
}) => {
  return toast[type](content, {
    position,
    autoClose,
    theme,
  });
};
