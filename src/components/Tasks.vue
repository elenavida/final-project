<template>
  <h3 v-for="task in tasks" :key="task">
    {{ task.title }} {{ task.description }}
  </h3>
  <TaskItem />
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
