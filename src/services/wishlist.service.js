import axios from "axios";

export const getWishlist = async (page = 1, limit = 20) => {
  try {
    const response = await axios.get(
      `https://192.168.1.5:8080/customers/wishlist?page=${page}&limit=${limit}`,
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
      "https://192.168.1.5:8080/customers/wishlist",
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
      `https://192.168.1.5:8080/customers/wishlist/${wishlistId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
