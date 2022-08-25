<template>
  <h1>Add a new Task</h1>
  <p>Keep your life organized, prepare for a trip? Start here</p>
  <p>Today's Date is {{ time }}</p>
</template>

<script setup>
import { ref } from "vue";
import moment from "moment";

const time = ref(moment().format("DD MM YY"));
</script>

<style scoped>
p {
  text-align: center;
}
</style>
