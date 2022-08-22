<template>
  <header>
    <div class="logo">TaskApp</div>
    <p>Welcome Back {{ email }}</p>
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: white;
  padding: 20px 0px;
}
p,
.logo {
  line-height: 44px;
}
</style>
