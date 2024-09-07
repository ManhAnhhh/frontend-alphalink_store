import { GetImageProduct } from "../utilities";
import { Link } from "react-router-dom";
const ProductItem = (props) => {
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
  } = props.product;
  return (
    <>
      <p className="fs-14 discount-percent">{`-${discount}%`}</p>

      <div className="img-item">
        <Link to={`/product-detail/${id}`} className="text-decoration-none text-center">
          <img src={GetImageProduct(img[0])} alt={name} />
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
        <p className="price-decreased text-danger fw-bold">
          $ {price - (price * discount) / 100}
        </p>
        <p className="price text-secondary text-decoration-line-through">
          $ {price}
        </p>
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

        <div className="heart-icon py-1 mx-2">
          <i className="fa-regular fa-heart fa-2xl me-1" />
        </div>
        {/* when clicking tym */}
        {/* <div class="heart-icon py-1 mx-2">
            <i style="color: #dc3545; " class="fa-solid fa-heart fa-2xl"></i>
          </div> */}
      </div>
      <button className="btn-add-to-cart btn-custom my-2 w-100">
        Add to cart
      </button>
    </>
  );
};

export default ProductItem;
