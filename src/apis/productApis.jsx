import apiInstance from './apiInstance';

export const searchProductsByName = (name) => {
  return apiInstance.get('/products/search', {
    params: {
      name,
    },
  });
};

export const getProductById = (id) => {
  return apiInstance.get(`/product/${id}`);
};

export const getProductCategoryById = (id) => {
  return apiInstance.get(`/product/${id}/category`);
};
