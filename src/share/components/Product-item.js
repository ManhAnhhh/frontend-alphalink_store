const ProductItem = () => {
  return (
    <>
      <div className="discount-percent">
        <p>-12%</p>
      </div>
      <div className="img-item">
        <a href="./category.html">
          <img src="./img/products/acer1.jpg" alt="acer" />
        </a>
      </div>
      <h5 className="name-item pt-2">Acer Aspire Go 15 Slim Laptop</h5>
      <div className="desc-item fs-12">
        <p>Free charging cable, mouse and backpack</p>
      </div>
      <div className="review d-flex justify-content-between my-1">
        <div className="rate">
          <i className="fa fa-star text-warning" />
          <i className="fa fa-star text-warning" />
          <i className="fa fa-star text-warning" />
          <i className="fa fa-star text-warning" />
          <i className="fa-regular fa-star text-black-50" />
        </div>
        <div className="sold fw-bold">Sold: 2</div>
      </div>
      <div className="price-item d-flex justify-content-between my-1">
        <p className="price text-danger fw-bold">$1639</p>
        <p className="discount text-secondary">$1000</p>
      </div>
      <div className="stock-item my-1 d-flex justify-content-between align-items-center">
        {/* success */}
        {/* <p class="text-success fw-bold">
            <i style="color: #198754;" class="fa-regular fa-circle-check"></i> In stock
          </p> */}
        {/* danger */}
        <p className="text-danger fw-bold">
          <i
            style={{ color: "#dc3545" }}
            className="fa-regular fa-circle-xmark me-1"
          />
          Out of stock
        </p>
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
