import axios from "axios";

export const fetchUserCart = async (id) => {
  return await axios.get(`${"https://fakestoreapi.com"}/carts/user/${id}`);
};

export const getCustomerCart = async () => {
  try {
    const response = await axios.get(
      `https://pedagang-ecommerce-api.onrender.com/customers/cart`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};

export const postAddToCart = async (data) => {
  try {
    const response = await axios.post(
      "https://pedagang-ecommerce-api.onrender.com/customers/cart",
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
export const postAddNote = async ({ cart_id, note }) => {
  try {
    const response = await axios.post(
      "https://pedagang-ecommerce-api.onrender.com/customers/cart/note",
      JSON.stringify({ cart_id, note }),
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
export const patchChangeCartQuantity = async ({ cartId, quantity }) => {
  try {
    const response = await axios.patch(
      `https://pedagang-ecommerce-api.onrender.com/customers/cart`,
      JSON.stringify({ cart_id: cartId, quantity }),
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};

export const deleteCustomerCartItem = async (cartId) => {
  try {
    const response = await axios.delete(
      `https://pedagang-ecommerce-api.onrender.com/customers/cart/${cartId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
