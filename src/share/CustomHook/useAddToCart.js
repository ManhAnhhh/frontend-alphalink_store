import { useSelector, useDispatch } from "react-redux";
import { PopUp } from "../utilities";
import { addToCart } from "../../services/Api";
import { updateCart } from "../../redux/reducers/cart";

export const useAddToCart = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.login.isLoggedIn);

  const addProductToCart = (customerId, product, qty = 1, colorIndex = 0) => {
    // Kiểm tra người dùng đã đăng nhập hay chưa
    if (!isLoggedIn) {
      PopUp({
        type: "warning",
        content: "You must be logged in to add this product to cart",
      });
      return;
    }

    // Kiểm tra hàng tồn kho
    if (product.is_stock === false) {
      PopUp({
        type: "error",
        content: "This product is out of stock",
      });
      return;
    }
    const info = {
      prd_id: product._id,
      qty,
      price: product.price,
      discount: product.discount,
      name: product.name,
      img: product.img,
      color: product.color,
      colorIndex,
    };

    addToCart({ customerId, productId: product._id }, info).then(({ data }) => {
      // lưu vào redux để xử lý trên giao diện
      dispatch(updateCart(data.data));
    });
    PopUp({
      type: "success",
      position: "top-left",
      content: "Product added to cart successfully",
    });
  };

  return addProductToCart;
};
