import axios from "axios";

export const getPromotionList = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `https://api.pedagang-ecommerce.site/customers/promotion?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
export const getPromotion = async (promotionCode) => {
  try {
    const response = await axios.get(
      `https://api.pedagang-ecommerce.site/customers/promotion/use/${promotionCode}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};

export const postNewPromotion = async (data) => {
  try {
    const response = await axios.post(
      "https://api.pedagang-ecommerce.site/customers/promotion",
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
export const deletePromotion = async (promotionId) => {
  try {
    const response = await axios.delete(
      `https://api.pedagang-ecommerce.site/customers/promotion/${promotionId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
