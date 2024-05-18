import axios from "axios";

export const getCustomerAddress = async () => {
  try {
    const response = await axios.get(
      `https://127.0.0.1:8080/customers/address`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false };
  }
};
export const postCustomerAddress = async (data) => {
  try {
    const response = await axios.post(
      "https://127.0.0.1:8080/customers/address",
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { success: false };
  }
};
export const patchSelectedAddress = async (addressId) => {
  try {
    const response = await axios.patch(
      `https://127.0.0.1:8080/customers/address/${addressId}/select`,
      null,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { success: false };
  }
};
export const deleteCustomerAddress = async (addressId) => {
  try {
    const response = await axios.delete(
      `https://127.0.0.1:8080/customers/address/delete/${addressId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false };
  }
};
