import Http from "./Http";

export const getProducts = (config) => Http.get("products", config);
export const getProductsByCategory = (id, config) =>
  Http.get(`categories/${id}/products`, config);
export const getProductByID = (id, config) =>
  Http.get(`products/${id}`, config);
export const getProductsByCategoryName = (id, config) =>
  Http.get(`products/category/${id}`);
export const getCommentsByIdProduct = (id, config) =>
  Http.get(`products/${id}/comments`, config);

export const getCategories = (config) => Http.get("categories", config);
export const getCategory = (id, config) => Http.get(`categories/${id}`, config);

export const registerCustomer = (config) =>
  Http.post("customers/register", config);
export const loginCustomer = (config) => Http.post("customers/login", config);
export const getCustomers = (config) => Http.get("customers", config);

export const addToCart = ({ customerId, productId }, config) =>
  Http.post(`customer/${customerId}/add-to-cart/${productId}`, config);
export const updateCartItems = (customerId, config) =>
  Http.post(`customer/${customerId}/update-cart/`, config);
export const deleteCartItem = ({ customerId, productId }, config) =>
  Http.post(`customer/${customerId}/delete-cart/${productId}`, config);
export const deleteManyCartItem = (customerId, config) =>
  Http.post(`customer/${customerId}/delete-many-cart`, config);

export const addHeartItem = ({ customerId, productId }, config) =>
  Http.post(`customer/${customerId}/add-to-heart/${productId}`, config);
export const deleteHeartItem = ({ customerId, productId }, config) =>
  Http.post(`customer/${customerId}/delete-heart-item/${productId}`, config);
export const deleteManyHeartItem = (customerId, config) =>
  Http.post(`customer/${customerId}/delete-many-heart-item`, config);

export const order = (customerId, config) =>
  Http.post(`customer/${customerId}/order`, config);
