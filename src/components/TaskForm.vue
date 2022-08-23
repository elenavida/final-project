<template>
  <form class="form" @submit.prevent="addTask">
    <label for="title">Task title</label>
    <input
      class="input"
      type="text"
      id="title"
      v-model="title"
      required="required"
      placeholder="Add task title here"
    />
    <label for="description">Description</label>
    <input
      class="input"
      type="text"
      id="description"
      v-model="description"
      required="required"
      placeholder="Add task description here"
    />
    <button class="button" type="submit">Add Task</button>
    <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task.js";

const taskStore = useTaskStore();

const title = ref("");
const description = ref("");
const errorMessage = ref("");

async function addTask() {
  try {
    await taskStore.addTask(title.value, description.value);
    title.value = "";
    description.value = "";
  } catch (error) {
    // displays error message
    errorMessage.value = `Error: ${error.message}`;
    // hides error message
    setTimeout(() => {
      errorMessage.value = null;
    }, 5000);
  }
}
</script>

<style></style>
