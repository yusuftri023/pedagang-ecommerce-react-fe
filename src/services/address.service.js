import axios from "axios";

export const getCustomerAddress = async () => {
  try {
    const response = await axios.get(
      `https://api.pedagang-ecommerce.site/customers/address`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
export const postCustomerAddress = async (data) => {
  try {
    const response = await axios.post(
      "https://api.pedagang-ecommerce.site/customers/address",
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
export const patchSelectedAddress = async (addressId) => {
  try {
    const response = await axios.patch(
      `https://api.pedagang-ecommerce.site/customers/address/${addressId}/select`,
      null,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
export const deleteCustomerAddress = async (addressId) => {
  try {
    const response = await axios.delete(
      `https://api.pedagang-ecommerce.site/customers/address/delete/${addressId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
