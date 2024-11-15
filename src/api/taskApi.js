import axiosInstance from "./axiosInstance";

const handleError = (error) => {
  if (error.response) {
    throw new Error(error.response?.data?.message || "Task operation failed");
  } else if (error.request) {
    throw new Error("Network error, please try again later");
  } else {
    throw new Error("An unexpected error occurred");
  }
};

const getTasks = async () => {
  try {
    const { data } = await axiosInstance.get("/tasks");
    return Array.isArray(data.data) ? data.data : [];
  } catch (error) {
    handleError(error);
    return [];
  }
};

const addTask = async (title) => {
  try {
    const { data } = await axiosInstance.post("/tasks", { title });
    return data;
  } catch (error) {
    handleError(error);
  }
};

const deleteTask = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/tasks/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

const doneTask = async (id) => {
  try {
    const { data } = await axiosInstance.patch(`/tasks/${id}/done`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const taskApi = {
  getTasks,
  addTask,
  deleteTask,
  doneTask,
};
