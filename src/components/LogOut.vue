<template>
  <button @click.prevent="signOut">LogOut</button>
</template>

<script setup>
import { supabase } from "../supabase";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";

const redirect = useRouter();
const userStore = useUserStore();

// Error Message
const errorMessage = ref("");

const signOut = async () => {
  //   const response = await userStore
  //     .signUp(email.value, password.value)
  //     .catch((error) => {
  //       alert(error.message);
  //     });
  try {
    // calls the user store and send the users info to backend to logIn
    await userStore.signOut();
    // redirects user to the homeView
    redirect.push({ path: "./auth/login" });
  } catch (error) {
    // displays error message
    errorMessage.value = `Error: ${error.message}`;
    // hides error message
    setTimeout(() => {
      errorMessage.value = null;
    }, 5000);
  }
};
</script>

<style></style>
