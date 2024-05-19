import axios from "axios";

export const fetchUserCart = async (id) => {
  return await axios.get(`${"https://fakestoreapi.com"}/carts/user/${id}`);
};

export const getCustomerCart = async () => {
  try {
    const response = await axios.get(`https://127.0.0.1:8080/customers/cart`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};

export const postAddToCart = async (data) => {
  try {
    const response = await axios.post(
      "https://127.0.0.1:8080/customers/cart",
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
export const patchChangeCartQuantity = async (data) => {
  try {
    const response = await axios.patch(
      `https://127.0.0.1:8080/customers/cart`,
      JSON.stringify(data),
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
export const deleteCustomerCartItem = async (cartId) => {
  try {
    const response = await axios.delete(
      `https://127.0.0.1:8080/customers/cart/${cartId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
