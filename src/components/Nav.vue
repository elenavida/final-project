<template>
  <header>
    <div>Nav Component</div>
    <LogOut />
  </header>
</template>

<script setup>
import LogOut from "./LogOut.vue";
//constant to save a variable that will hold the use router method

// constant to save a variable that will get the user from store with a computed function imported from vue

// constant that calls user email from the useUSerStore

// constant that saves the user email and cleans out the @client from the user

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
</script>

<style scoped>
header {
  display: block;
  background: #20a0e9;
}
</style>
