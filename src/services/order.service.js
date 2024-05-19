import axios from "axios";

export const orderDetails = async (orderId) => {
  try {
    const response = await axios.get(
      `https://127.0.0.1:8080/customers/order/${orderId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
export const getOrderList = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `https://127.0.0.1:8080/customers/order?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
export const checkoutOrder = async (data) => {
  try {
    const response = await axios.post(
      "https://127.0.0.1:8080/customers/changepassword",
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
