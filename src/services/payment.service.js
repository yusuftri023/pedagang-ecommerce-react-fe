import axios from "axios";

export const paymentDetails = async (orderId) => {
  try {
    const response = await axios.get(
      `https://pedagang-ecommerce-api.onrender.com/customers/payment/${orderId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
