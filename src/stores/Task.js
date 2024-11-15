import { create } from "zustand";
import { taskApi } from "../api/taskApi";

const useTaskStore = create((set) => ({
  tasks: [],
  error: null,
  fetchTasks: async () => {
    try {
      const data = await taskApi.getTasks();
      set({ tasks: data, error: null });
    } catch (error) {
      set({ error: "Failed to fetch tasks" });
      console.error("Failed to fetch tasks:", error);
    }
  },
}));

export default useTaskStore;
