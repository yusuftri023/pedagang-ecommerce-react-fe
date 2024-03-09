import axios from "axios";

export const fetchUserCart = async (id) => {
  return await axios.get(`https://fakestoreapi.com/carts/user/${id}`);
};
