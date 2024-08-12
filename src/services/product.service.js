import axios from "axios";

export const fetchAllProduct = async (keyword) => {
  const res = await axios.get(
    `https://192.168.1.5:8080/public/product/search?keyword=${keyword}`
  );

  return res.data;
};
export const fetchProductInCategory = async (category) => {
  const res = await axios.get(
    encodeURI(
      `${"https://fakestoreapi.com"}/products/category/${category.toLowerCase()}`
    )
  );
  return res.data;
};

export const fetchMultipleProduct = async (list) => {
  const data = await Promise.all(
    list.map(async (id) => {
      const res = await axios.get(
        `${"https://fakestoreapi.com"}/products/${id}`
      );
      return res.data;
    })
  );
  return data;
};

export const getAllProduct = async () => {
  try {
    const response = await axios.get(
      `https://192.168.1.5:8080/public/product`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
export const getSingleProduct = async (productId) => {
  try {
    const response = await axios.get(
      `https://192.168.1.5:8080/public/product/${productId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
export const getProductRating = async (productId) => {
  try {
    const response = await axios.get(
      `https://192.168.1.5:8080/public/product/${productId}/rating`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
export const getProductReview = async (productId) => {
  try {
    const response = await axios.get(
      `https://192.168.1.5:8080/public/product/${productId}/reviews`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
export const getSingleProductVariation = async (productId, productConfigId) => {
  try {
    const response = await axios.get(
      `https://192.168.1.5:8080/public/product/${productId}/variation/${productConfigId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
export const postNewProduct = async (data) => {
  try {
    const response = await axios.post(
      "https://192.168.1.5:8080/customers/product",
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};

export const deleteProduct = async (addressId) => {
  try {
    const response = await axios.delete(
      `https://192.168.1.5:8080/customers/product/${addressId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
export const getProductCategories = async () => {
  try {
    const response = await axios.get(
      `https://192.168.1.5:8080/customers/category`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
export const postNewProductCategory = async (data) => {
  try {
    const response = await axios.post(
      "https://192.168.1.5:8080/customers/category",
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
