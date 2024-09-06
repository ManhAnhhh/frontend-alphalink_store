import Http from "./Http";

export const getProducts = (config) => Http.get("products", config);
export const getProductsByCategory = (id, config) =>
  Http.get(`categories/${id}/products`, config);
export const getProductByID = (id, config) =>
  Http.get(`products/${id}`, config);
export const getProductsByCategoryName = (id, config) => Http.get(`products/category/${id}`);
export const getCommentsByIdProduct = (id, config) => Http.get(`products/${id}/comments`, config);

export const getCategories = (config) => Http.get("categories", config);
export const getCategory = (id, config) => Http.get(`categories/${id}`, config);

export const registerCustomer = (config) =>
  Http.post("customers/register", config);
export const loginCustomer = (config) => Http.post("customers/login", config);
export const getCustomers = (config) => Http.get("customers", config);

