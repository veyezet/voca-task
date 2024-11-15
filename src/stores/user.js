import { create } from "zustand";
import { userApi } from "../api/userApi";

const useUserStore = create((set) => ({
  user: null,
  error: null,
  fetchProfile: async () => {
    try {
      const data = await userApi.getProfile();
      set({ user: data, error: null });
    } catch (error) {
      set({
        user: null,
        error: error?.response?.data?.message || "Failed to fetch profile",
      });
      console.error("Failed to fetch profile:", error);
    }
  },
}));

export default useUserStore;
