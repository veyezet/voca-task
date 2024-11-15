import axiosInstance from "./axiosInstance";

const login = async (email, password) => {
  try {
    const { data } = await axiosInstance.post("/users/login", {
      email,
      password,
    });
    
    if (data?.data?.token) {
      localStorage.setItem("token", data.data.token);
    }

    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response?.data?.message || 'Login failed');
    } else if (error.request) {
      throw new Error('Network error, please try again later');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const userApi = {
  login,
};
