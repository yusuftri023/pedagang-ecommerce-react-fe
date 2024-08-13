import axios from "axios";

export const getCustomerProfile = async () => {
  try {
    const response = await axios.get(
      "https://pedagang-ecommerce-api.onrender.com/customers/profile",
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
export const updateCustomerPassword = async (data) => {
  try {
    const response = await axios.patch(
      "https://pedagang-ecommerce-api.onrender.com/customers/changepassword",
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
export const updateCustomerProfilePic = async (formData) => {
  try {
    const response = await axios.patch(
      `https://pedagang-ecommerce-api.onrender.com/customers/changepicture`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
export const deleteCustomer = async () => {
  try {
    const response = await axios.delete(
      `https://pedagang-ecommerce-api.onrender.com/customers/delete`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
