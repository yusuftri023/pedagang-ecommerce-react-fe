import axios from "axios";

export const getGoogleSignIn = async () => {
  const response = await axios.get("https://127.0.0.1:8080/auth/google", {
    withCredentials: true,
  });
  return response.data;
};
export const postWebSignIn = async (data) => {
  try {
    const response = await axios.post(
      `https://127.0.0.1:8080/auth/login`,
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { success: false };
  }
};

export const postWebRegister = async (data) => {
  try {
    const response = await axios.post(
      `https://127.0.0.1:8080/auth/register`,
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { success: false };
  }
};
