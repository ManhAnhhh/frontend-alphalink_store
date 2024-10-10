import { GetImageProduct, HandlePriceWithDiscount, PopUp } from "../utilities";
import { getProductByID, addHeartItem } from "../../services/Api";
import { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAddToCart } from "../CustomHook/useAddToCart";
import { useDispatch } from "react-redux";
import { updateHeart } from "../../redux/reducers/heart";
import Swal from "sweetalert2";
const ProductItem = (props) => {
  const dispatch = useDispatch();
  const [isHeart, setIsHeart] = useState(false);
  const addToCart = useAddToCart();
  const isLoggedIn = useSelector((state) => state.Auth.login.isLoggedIn);
  const customerId = useSelector(
    (state) => state.Auth.login.currentCustomer?.id
  );
  const heartItem = useSelector((state) => state?.Heart?.items);
  const {
    _id: id,
    name,
    accessories,
    price,
    discount,
    star,
    sold,
    img,
    is_stock,
    color,
  } = props.product;

  useEffect(() => {
    setIsHeart(() => {
      const isItem = heartItem?.some((item) => item?.prd_id === id);
      if (isItem) {
        return true;
      }
      return false;
    });
  }, [isHeart, heartItem, id]);

  const [product, setProduct] = useState({});
  useEffect(() => {
    getProductByID(id)
      .then(({ data }) => {
        setProduct(data.data);
      })
      .catch((err) => {});
  }, [id]);

  const addToHeart = () => {
    if (!isLoggedIn) {
      PopUp({
        type: "error",
        content: "Please login to add product to your heart",
      });
      return;
    }
    const data = {
      prd_id: id,
      price,
      discount,
      name,
      img,
      color,
      is_stock,
    };
    addHeartItem({ customerId, productId: id }, data)
      .then(({ data }) => {
        let title;
        if (data.message === "Add to heart successfully") {
          title = "Product added to my list successfully";
        } else if (data.message === "Product is existed") {
          title = "Removed product from my list";
        }
        // if (res.)
        Swal.fire({
          icon: "success",
          title: title,
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(updateHeart(data.data));
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  return (
    <>
      {discount !== 0 && (
        <p className="fs-14 discount-percent">{`-${discount}%`}</p>
      )}

      <div className="img-item">
        <Link
          to={`/product-detail/${id}`}
          className="text-decoration-none text-center"
        >
          <img src={GetImageProduct(img[0])} alt={GetImageProduct(img[0])} />
        </Link>
      </div>
      <h5 className="name-item pt-2">
        <Link to={`/product-detail/${id}`} className="text-decoration-none">
          {name}
        </Link>
      </h5>

      <div className="desc-item fs-12">
        <p>{accessories}</p>
      </div>
      <div className="review d-flex justify-content-between my-1">
        <div className="rate">
          {Array.from({ length: star }).map((e, i) => (
            <i key={i} className="fa fa-star text-warning" />
          ))}
          {Array.from({ length: 5 - star }).map((e, i) => (
            <i key={i + 100} className="fa-regular fa-star text-black-50" />
          ))}
        </div>
        <div className="sold fw-bold">Sold: {sold}</div>
      </div>
      <div className="price-item d-flex justify-content-between my-1">
        <p className="price-decreased text-danger fw-bold mb-0">
          $ {HandlePriceWithDiscount(price, discount)}
        </p>
        {product.discount !== 0 && (
          <p className="price text-secondary text-decoration-line-through mb-0">
            $ {product.price}
          </p>
        )}
      </div>
      <div className="stock-item my-1 d-flex justify-content-between align-items-center">
        {is_stock ? (
          <p className="text-success fw-bold m-0">
            <i
              style={{ color: "#198754" }}
              className="fa-regular fa-circle-check me-1"
            />
            In stock
          </p>
        ) : (
          <p className="text-danger fw-bold mb-0">
            <i
              style={{ color: "#dc3545" }}
              className="fa-regular fa-circle-xmark me-1 "
            />
            Out of stock
          </p>
        )}

        <div className="heart-icon py-1 mx-2" onClick={addToHeart}>
          {isHeart ? (
            <i
              style={{ color: "#dc3545" }}
              className="fa-solid fa-heart fa-2xl me-1"
            />
          ) : (
            <i className="icon fa-regular fa-heart fa-2xl me-1" />
          )}
        </div>
      </div>
      <button
        className="btn-add-to-cart btn-custom my-2 w-100"
        onClick={() => addToCart({ customerId, product })}
      >
        Add to cart
      </button>
    </>
  );
};

export default memo(ProductItem);
