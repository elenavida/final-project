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
    <label for="title">Description</label>
    <input
      class="input"
      type="text"
      id="description"
      v-model="description"
      required="required"
      placeholder="Add task description here"
    />
    <button @click="" class="button" type="submit">Add Task</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task.js";
const title = ref("");

//llamar al add task desde click !!
</script>

<style></style>
