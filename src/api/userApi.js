import axiosInstance from "./axiosInstance";

const login = async (email, password) => {
  try {
    const { data } = await axiosInstance.post("/users/login", {
      email,
      password,
    });
    localStorage.setItem("token", data.data.token);
    return data;
  } catch (error) {
    throw error;
  }
};

const getProfile = async () => {
  try {
    const { data } = await axiosInstance.get("/users/profile");
    return data.data;
  } catch (error) {
    throw error;
  }
};

const updateProfile = async (userData) => {
  try {
    const { data } = await axiosInstance.put("/users/profile", userData);
    return data.data;
  } catch (error) {
    throw error;
  }
};

const signOut = () => {
  localStorage.removeItem("token");
  navigate("/login");
};

export const userApi = {
  login,
  getProfile,
  updateProfile,
  signOut
};
