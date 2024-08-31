import Http from "./Http";

export const getProducts = (config) => Http.get("products", config);
export const getProductsByCategory = (id, config) =>
  Http.get(`categories/${id}/products`, config);
export const getProductByID = (id, config) => Http.get(`products/${id}`, config ) 

export const getCategories = (config) => Http.get("categories", config);
export const getCategory = (id, config) => Http.get(`categories/${id}`, config);

export const registerCustomer = (config) => Http.post("customers/register", config);
export const loginCustomer = (config) => Http.post("customers/login", config);
