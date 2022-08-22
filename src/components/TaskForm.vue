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

    <button class="button" type="submit">Add Task</button>
  </form>
</template>

<script setup>
import { ref } from "vue";

const title = ref("");
</script>

<style></style>
