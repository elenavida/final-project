<template>
  <div>Sign Up</div>
  <PersonalRouter :route="route" :buttonText="buttonText" />
  <form @submit.prevent="signUp">
    <label for="email">Email</label>
    <input
      type="email"
      id="email"
      v-model="email"
      required="required"
      placeholder="email@example.com"
    />
    <label for="password">Password (6 characters minimum)</label>
    <input
      type="password"
      id="password"
      v-model="password"
      required="required"
      minlength="6"
    />
    <button type="submit">Sign Up</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import PersonalRouter from "./PersonalRouter.vue";

const userStore = useUserStore();

// Route Variables
const route = "/auth/login";
const buttonText = "Test the Sign In Route";

// Input Fields
const email = ref();
const password = ref();

// Error Message

// Show hide password variable

// Show hide confrimPassword variable

// Router to push user once SignedUp to Log In

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
async function signUp() {
  const response = await userStore
    .signUp(email.value, password.value)
    .catch((error) => {
      alert(error.message);
    });
  alert(`success! ${response.email}`);
}
</script>

<style></style>
