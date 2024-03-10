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
