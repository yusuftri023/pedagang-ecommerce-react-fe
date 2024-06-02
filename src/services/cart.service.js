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
export const postAddNote = async ({ cart_id, note }) => {
  try {
    const response = await axios.post(
      "https://127.0.0.1:8080/customers/cart/note",
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
      `https://127.0.0.1:8080/customers/cart`,
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
    console.log(cartId);
    const response = await axios.delete(
      `https://127.0.0.1:8080/customers/cart/${cartId}`,
      {
        withCredentials: true,
      }
    );
    console.log("done delete", response.data);
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
