import axios from "axios";

export const getGoogleSignIn = async () => {
  const response = await axios.get(
    "https://api.pedagang-ecommerce.site/auth/google",
    {
      withCredentials: true,
    }
  );
  return response.data;
};
export const getSignOut = async () => {
  const response = await axios.get(
    "https://api.pedagang-ecommerce.site/auth/logout",
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const getAuth = async () => {
  const response = await axios.get(
    "https://api.pedagang-ecommerce.site/auth/refresh",
    {
      withCredentials: true,
    }
  );
  return response.data;
};
export const postWebSignIn = async (data) => {
  try {
    const response = await axios.post(
      `https://api.pedagang-ecommerce.site/auth/login`,
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
      `https://api.pedagang-ecommerce.site/auth/register`,
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};
