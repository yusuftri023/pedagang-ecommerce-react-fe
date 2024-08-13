import axios from "axios";

export const getWishlist = async (page = 1, limit = 20) => {
  try {
    const response = await axios.get(
      `https://pedagang-ecommerce-api.onrender.com/customers/wishlist?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};

export const postNewWishlist = async (data) => {
  try {
    const response = await axios.post(
      "https://pedagang-ecommerce-api.onrender.com/customers/wishlist",
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
export const deleteWishlistItem = async (wishlistId) => {
  try {
    const response = await axios.delete(
      `https://pedagang-ecommerce-api.onrender.com/customers/wishlist/${wishlistId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
