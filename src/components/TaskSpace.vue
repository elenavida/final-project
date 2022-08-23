<template>
  <h3 v-for="task in taskData" :key="task">
    {{ task.title }} {{ task.description }}
  </h3>
  <button class="button" @click="conse">hhgg</button>
</template>

<script setup>
import { useTaskStore } from "../stores/task";
import { ref } from "vue";
const taskStore = useTaskStore();

const taskData = ref([]);
const fetchTasks = async () => {
  taskData.value = await taskStore.fetchTasks();
};
fetchTasks();

const conse = () => {
  console.log(taskData.value);
};
</script>

<style></style>
