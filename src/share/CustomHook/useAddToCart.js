import { useSelector, useDispatch } from "react-redux";
import { PopUp } from "../utilities";
import { addToCart } from "../../services/Api";
import { updateCart } from "../../redux/reducers/cart";

export const useAddToCart = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.Auth.login.isLoggedIn);

  const addProductToCart = async ({
    customerId,
    product,
    qty = 1,
    colorIndex = 0,
  }) => {
    // Kiểm tra người dùng đã đăng nhập hay chưa
    if (!isLoggedIn) {
      PopUp({
        type: "warning",
        content: "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng",
      });
      return;
    }

    // Kiểm tra hàng tồn kho
    if (product.is_stock === false) {
      PopUp({
        type: "error",
        content: "Sản phẩm đã hết hàng",
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

    await addToCart({ customerId, productId: product._id }, info)
      .then(({ data }) => {
        // lưu vào redux để xử lý trên giao diện
        dispatch(updateCart(data.data));
      })
      .catch(() => {});
    PopUp({
      type: "success",
      position: "top-left",
      content: "Thêm vào giỏ hàng thành công",
    });
  };

  return addProductToCart;
};
