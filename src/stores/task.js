import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
      console.log(tasks);
    },
    // New code
    async addTask(title, description) {
      const { error } = await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          title: title,
          is_complete: false,
          description: description,
        },
      ]);
      if (error) throw error;
      await this.fetchTasks();
    },
    async updateTask(id, title, description, isComplete) {
      const { error } = await supabase
        .from("tasks")
        .update({
          title: title,
          is_complete: isComplete,
          description: description,
        })
        .match({ id });
      if (error) throw error;
      await this.fetchTasks();
    },
    /**
     * Supabase examples:
const { data, error } = await supabase
  .from('cities')
  .delete()
  .match({ id: 666 })

const { data, error } = await supabase
  .from('cities')
  .update({ name: 'Middle Earth' })
  .match({ name: 'Auckland' })
     */
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "tasks",
        storage: localStorage,
      },
    ],
  },
});
