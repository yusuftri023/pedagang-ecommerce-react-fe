import axios from "axios";

export const getCategoryVariation = async (productId) => {
  try {
    const response = await axios.get(
      `https://pedagang-ecommerce-api.onrender.com/customers/variation/categories/${productId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
export const postNewCategoryVariation = async (data) => {
  try {
    const response = await axios.post(
      "https://pedagang-ecommerce-api.onrender.com/customers/variation",
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};

export const deleteProduct = async (variationId) => {
  try {
    const response = await axios.delete(
      `https://pedagang-ecommerce-api.onrender.com/customers/variation/${variationId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
