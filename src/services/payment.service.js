import axios from "axios";

export const paymentDetails = async (orderId) => {
  try {
    const response = await axios.get(
      `https://127.0.0.1:8080/customers/payment/${orderId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false };
  }
};
