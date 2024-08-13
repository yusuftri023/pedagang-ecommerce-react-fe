import axios from "axios";

export const getGoogleSignIn = async () => {
  const response = await axios.get(
    "https://pedagang-ecommerce-api.onrender.com/auth/google",
    {
      withCredentials: true,
    }
  );
  return response.data;
};
export const getSignOut = async () => {
  const response = await axios.get(
    "https://pedagang-ecommerce-api.onrender.com/auth/logout",
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const getAuth = async () => {
  const response = await axios.get(
    "https://pedagang-ecommerce-api.onrender.com/auth/refresh",
    {
      withCredentials: true,
    }
  );
  return response.data;
};
export const postWebSignIn = async (data) => {
  try {
    const response = await axios.post(
      `https://pedagang-ecommerce-api.onrender.com/auth/login`,
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};

export const postWebRegister = async (data) => {
  try {
    const response = await axios.post(
      `https://pedagang-ecommerce-api.onrender.com/auth/register`,
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
