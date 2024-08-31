import axios from "axios";

export const orderDetails = async (orderId) => {
  try {
    const response = await axios.get(
      `https://api.pedagang-ecommerce.site/customers/orders/${orderId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
export const shipmentDetails = async (shipmentId) => {
  try {
    const response = await axios.get(
      `https://api.pedagang-ecommerce.site/customers/shipments/${shipmentId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
export const getOrderList = async (
  page = 1,
  limit = 10,
  orderBy = "order_date",
  orderDir = "asc"
) => {
  try {
    const response = await axios.get(
      `https://api.pedagang-ecommerce.site/customers/orders?page=${page}&limit=${limit}&order_by=${orderBy}&order_dir=${orderDir}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
export const checkoutOrder = async (data) => {
  try {
    const response = await axios.post(
      "https://api.pedagang-ecommerce.site/customers/orders",
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};

export const patchPaymentToken = async (data) => {
  try {
    const response = await axios.patch(
      "https://api.pedagang-ecommerce.site/customers/orders/payment-link",
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
