import axios from "axios";

export const paymentDetails = async (orderId) => {
  try {
    const response = await axios.get(
      `https://192.168.1.5:8080/customers/payment/${orderId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
