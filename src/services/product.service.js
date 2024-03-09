import axios from "axios";

export const fetchAllProduct = async () => {
  const res = await axios.get("https://fakestoreapi.com/products");

  return res.data;
};
export const fetchProductInCategory = async (category) => {
  return await axios.get(
    `https://fakestoreapi.com/products/category/${category}`
  );
};
export const fetchSingleProduct = async (id) => {
  return await axios.get(`https://fakestoreapi.com/products/${id}`);
};
export const fetchMultipleProduct = async (list) => {
  const data = await Promise.all(
    list.flatMap(async ({ productId }) => {
      const res = await axios.get(
        `https://fakestoreapi.com/products/${productId}`
      );
      return res.data;
    })
  );
  return data;
};
