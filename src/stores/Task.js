import { create } from "zustand";

const useTaskStore = create((set) => ({
  tasks: [],
  addTask: (newTask) =>
    set((state) => ({
      tasks: [...state.tasks, newTask],
    })),
  doneTask: (id) =>
    set((state) => {
      const foundTask = state.tasks.find((task) => task.id === id);
      if (foundTask) {
        foundTask.isDone = true;
      }
      const filteredTask = state.tasks.filter((task) => task.id !== id);

      return {
        tasks: [...filteredTask, foundTask],
      };
    }),
  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));

export default useTaskStore;
