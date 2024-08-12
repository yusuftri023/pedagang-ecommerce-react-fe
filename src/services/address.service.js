import axios from "axios";

export const getCustomerAddress = async () => {
  try {
    const response = await axios.get(
      `https://192.168.1.5:8080/customers/address`,
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
      "https://192.168.1.5:8080/customers/address",
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
      `https://192.168.1.5:8080/customers/address/${addressId}/select`,
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
      `https://192.168.1.5:8080/customers/address/delete/${addressId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
