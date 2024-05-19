import axios from "axios";

export const fetchAllProduct = async () => {
  const res = await axios.get(`${"https://fakestoreapi.com"}/products`);

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
export const fetchSingleProduct = async (id) => {
  return await axios.get(`${"https://fakestoreapi.com"}/products/${id}`);
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

export const getSingleProduct = async (productId) => {
  try {
    const response = await axios.get(
      `https://127.0.0.1:8080/customers/product/${productId}`,
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
      "https://127.0.0.1:8080/customers/product",
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
      `https://127.0.0.1:8080/customers/product/${addressId}`,
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
      `https://127.0.0.1:8080/customers/category`,
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
      "https://127.0.0.1:8080/customers/category",
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
