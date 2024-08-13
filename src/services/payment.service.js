import axios from "axios";

export const paymentDetails = async (orderId) => {
  try {
    const response = await axios.get(
      `https://api.pedagang-ecommerce.site/customers/payment/${orderId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
