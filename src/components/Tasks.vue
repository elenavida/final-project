<template>
  <TaskItem
    v-for="task in tasks"
    :key="task.id"
    :id="task.id"
    :title="task.title"
    :description="task.description"
    :isComplete="task.is_complete"
  />
</template>

<script setup>
import { useTaskStore } from "../stores/task";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import TaskItem from "./TaskItem.vue";

const taskStore = useTaskStore();
const { tasks } = storeToRefs(taskStore);

onMounted(async () => {
  await taskStore.fetchTasks();
});
</script>

<style></style>
