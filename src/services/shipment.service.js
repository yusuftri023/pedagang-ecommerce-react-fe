import axios from "axios";

export const rajaOngkirProvince = async () => {
  try {
    const response = await axios.get(
      "https://api.pedagang-ecommerce.site/public/shipment/province",
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
export const rajaOngkirCity = async (provinceId) => {
  try {
    const response = await axios.get(
      `https://api.pedagang-ecommerce.site/public/shipment/city?province_id=${provinceId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
export const postRajaOngkirCost = async (data) => {
  try {
    const response = await axios.post(
      "https://api.pedagang-ecommerce.site/public/shipment/cost",
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
