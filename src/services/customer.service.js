import axios from "axios";

export const getCustomerProfile = async () => {
  try {
    const response = await axios.get(
      "https://127.0.0.1:8080/customers/profile",
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false };
  }
};
export const updateCustomerPassword = async (data) => {
  try {
    const response = await axios.patch(
      "https://127.0.0.1:8080/customers/changepassword",
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { success: false };
  }
};
export const updateCustomerProfilePic = async (formData) => {
  try {
    const response = await axios.patch(
      `https://127.0.0.1:8080/customers/changepicture`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false };
  }
};
export const deleteCustomer = async () => {
  try {
    const response = await axios.delete(
      `https://127.0.0.1:8080/customers/delete`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false };
  }
};
