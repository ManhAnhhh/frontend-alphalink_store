import React, { useState, useEffect } from "react";
import {
  GetImageProduct,
  GetImageCustomer,
  GetImageProductReview,
  PopUp,
  convertDate,
} from "../../share/utilities";
import {
  getProductByID,
  getCategories,
  getCommentsByIdProduct,
} from "../../services/Api";
import { useParams } from "react-router-dom";
import { useAddToCart } from "../../share/CustomHook/useAddToCart";
import { useSelector } from "react-redux";
const ProductDetail = () => {
  const addToCart = useAddToCart();
  const [categories, setCategories] = useState([]);
  const [imgShow, setImgShow] = useState(0);
  const [colorChoosed, setColorChoosed] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const customerId = useSelector(
    (state) => state.Auth.login.currentCustomer?.id
  );
  useEffect(() => {
    getProductByID(id, {}).then(({ data }) => setProduct(data.data));
    getCommentsByIdProduct(id).then(({ data }) => setComments(data.data));
  }, [id]);

  useEffect(() => {
    getCategories().then(({ data }) => setCategories(data.data));
  }, [product.category_id]);
  const category = categories.find((cat) => cat._id === product.category_id);
  const categoryParent = categories.find(
    (cat) => cat._id === category.parent_id
  );

  const handleColorsProduct = (index) => {
    setColorChoosed(index);
  };

  const onBlurInput = (value) => {
    if (Number(value) <= 0) {
      PopUp({
        type: "error",
        content: "Quanttity must be greater than 1",
      });
      setQuantity(1);
      return;
    }
    if (Number(value) > product.stock) {
      PopUp({
        type: "error",
        content: `Quanttity must be less than ${product.stock}`,
      });
      setQuantity(product.stock);
      return;
    }
    setQuantity(Number(value));
  };

  const handleQuantity = (state) => {
    // state = 0 => decrease quantity
    // state = 1 => increase quantity
    if (state === 0) {
      if (Number(quantity) === 1) {
        PopUp({
          type: "error",
          content: "Quanttity must be greater than 1",
        });
        return;
      }
      setQuantity((prevQuantity) => Number(prevQuantity) - 1);
    } else if (state === 1) {
      if (Number(quantity) === product.stock) {
        PopUp({
          type: "error",
          content: `Quanttity must be less than ${product.stock}`,
        });
        return;
      }
      setQuantity((prevQuantity) => Number(prevQuantity) + 1);
    }
  };

  const handleImgMove = (index) => {
    setImgShow(index);
  };
  const handleImgLeave = () => {
    setImgShow(0);
  };

  return (
    <>
      <section className="breadcrumb-custom">
        <div className="container-fluid">
          <p>
            home / {categoryParent?.name ? `${categoryParent.name} / ` : ""}{" "}
            {category?.name} / {product.name}
          </p>
        </div>
      </section>
      <section id="product-details">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-5 col-lg-6 col-md-5 col-12">
              <div className="img-product d-flex h-100 flex-column flex-sm-row flex-column-reverse">
                <div className="sub-img d-flex flex-wrap justify-content-center justify-content-sm-start flex-row flex-sm-column ">
                  {product?.img?.map((item, index) => (
                    <div
                      className="item mx-2 mx-sm-0"
                      key={item}
                      onMouseMove={() => handleImgMove(index)}
                      onMouseLeave={handleImgLeave}
                    >
                      <img src={GetImageProduct(item)} alt={product.name} />
                    </div>
                  ))}
                </div>
                <div className="main-img flex-fill text-center">
                  {product?.img?.length > 0 && (
                    <img
                      src={GetImageProduct(product.img[imgShow])}
                      alt="true"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="col-xl-7 col-lg-6 col-md-7 col-12 mt-2 mt-md-0">
              <div className="content h-100 mt-2 mt-md-0">
                <h2>{product.name}</h2>
                <div className="review d-flex gap-4">
                  <div className="rate">
                    {Array.from({ length: product.star }).map((e, i) => (
                      <i key={i + 10} className="fa fa-star text-warning" />
                    ))}
                    {Array.from({ length: 5 - product.star }).map((e, i) => (
                      <i
                        key={i + 100}
                        className="fa-regular fa-star text-black-50"
                      />
                    ))}
                  </div>
                  <div className="sold fw-bold">Sold: {product.sold}</div>
                </div>
                <div className="price-item d-flex gap-4">
                  <p className="discount text-secondary text-decoration-line-through">
                    $ {product.price}
                  </p>
                  <p className="price text-danger fw-bold">
                    $ {product.price - (product.price * product.discount) / 100}
                  </p>
                </div>
                {/* color */}
                <div className="d-flex align-items-lg-center flex-wrap align-items-center">
                  <p className="me-2 mb-0">Color:</p>
                  <div className="d-flex flex-wrap">
                    {product?.color?.map((item, index) => (
                      <button
                        onClick={() => handleColorsProduct(index)}
                        key={index}
                        className={`btn-color my-2 my-lg-0 text-capitalize ${
                          colorChoosed === index && "active"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
                {/* quantity */}
                <div className="quantity d-flex flex-wrap gap-2 gap-lg-5 align-items-center">
                  <div className="m-0">Quantity</div>
                  <div className="d-flex number">
                    <button onClick={() => handleQuantity(0)}>−</button>
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      onBlur={(e) => onBlurInput(e.target.value)}
                    />
                    <button onClick={() => handleQuantity(1)}>+</button>
                  </div>
                  <div className="my-1 d-flex justify-content-between align-items-center flex-wrap">
                    {product.is_stock ? (
                      /* success */
                      <p className="text-success fw-bold mb-0">
                        <i
                          style={{ color: "#198754" }}
                          className="fa-regular fa-circle-check me-1 "
                        />
                        In stock: {product.stock}
                      </p>
                    ) : (
                      /* danger */
                      <p className="text-danger fw-bold m-0">
                        <i
                          style={{ color: "#dc3545" }}
                          className="fa-regular fa-circle-xmark me-1"
                        />
                        Out of stock
                      </p>
                    )}
                  </div>
                </div>
                {/* add-to-cart */}
                <div className="d-flex gap-4">
                  <button
                    className="btn-custom btn-items"
                    onClick={() =>
                      addToCart(customerId, product, quantity, colorChoosed)
                    }
                  >
                    <i className="fa-solid fa-cart-shopping fa-lg text-white" />
                    &nbsp; Add to cart
                  </button>
                  <button className="btn-custom btn-items">Buy now</button>
                </div>
                <div className="details mt-4">
                  <p className="mb-2">
                    <b>Product details:</b>
                  </p>
                  <p>{product.product_details}</p>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div id="reviews">
                <p className="title text-uppercase">PRODUCT REVIEWS</p>
                <div className="comments">
                  {comments.length === 0 ? (
                    <div className="text-center no-comment">
                      <p className="py-2 m-0">No customer reviews</p>
                    </div>
                  ) : (
                    comments.map((comment) => {
                      return (
                        <div key={comment._id} className="item d-flex gap-3">
                          <div>
                            <div className="img-item">
                              <img
                                src={GetImageCustomer(comment.picture)}
                                alt={GetImageCustomer(comment.picture)}
                              />
                            </div>
                          </div>
                          <div className="content-item w-100">
                            <p className="m-0">
                              <strong>{comment.fullName}</strong>
                            </p>
                            <div className="rate">
                              {Array.from({ length: comment.star }).map(
                                (e, i) => (
                                  <i
                                    key={i * Math.random()}
                                    className="fa fa-star text-warning"
                                  />
                                )
                              )}
                              {Array.from({ length: 5 - comment.star }).map(
                                (e, i) => (
                                  <i
                                    key={(i + 100) * Math.random()}
                                    className="fa-regular fa-star text-black-50"
                                  />
                                )
                              )}
                            </div>
                            <div className="date fs-12">
                              {convertDate(comment.createdAt)}
                            </div>
                            <div className="text">
                              <p className="fs-14">{comment.content}</p>
                            </div>
                            <div className="d-flex gap-2">
                              {comment.product_review_images.map((item) => (
                                <div className="img-details">
                                  <img
                                    className="img-fluid"
                                    src={GetImageProductReview(item)}
                                    alt={GetImageProductReview(item)}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}

                  {comments.length !== 0 && (
                    <div
                      id="pagination"
                      className="d-flex justify-content-center align-items-center"
                    >
                      <div className="pagination-item">
                        <a href="#">
                          <i
                            className="fa-solid fa-chevron-left"
                          />
                        </a>
                      </div>
                      <div className="pagination-item">
                        <a href="#">1</a>
                      </div>
                      <div className="pagination-item">
                        <a href="#">2</a>
                      </div>
                      <div className="pagination-item">...</div>
                      <div className="pagination-item">
                        <a href="#">3</a>
                      </div>
                      <div className="pagination-item">
                        <a href="#">4</a>
                      </div>
                      <div className="pagination-item">
                        <a href="#">
                          {" "}
                          <i
                            className="fa-solid fa-chevron-right"
                          />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
