<template>
  <div>Sign In</div>
  <PersonalRouter :route="route" :buttonText="buttonText" />
  <form @submit.prevent="signIn">
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
      :type="passwordFieldType"
      id="password"
      v-model="password"
      required="required"
      minlength="6"
    />
    <button type="submit">Sign In</button>
  </form>
  <p v-if="errorMessage">{{ errorMessage }}</p>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();

// Route Variables
const route = "/auth/sign-up";
const buttonText = "Test the Sign Up Route";

// Input Fields
const email = ref("");
const password = ref("");

// Error Message
const errorMessage = ref("");

//Show hide password variables
const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);
const hidePassword = ref(true);

// Router to push user once SignedIn to the HomeView
const redirect = useRouter();

// Arrow function to Signin user to supaBase
async function signIn() {
  // const response = await userStore
  //   .signUp(email.value, password.value).catch((error) => {
  //     alert(error.message);
  //   })
  console.log("hello");
  try {
    // calls the user store and send the users info to backend to logIn
    await userStore.signIn(email.value, password.value);
    // redirects user to the homeView
    redirect.push({ path: "/" });
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

<style>
.form {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
}
.input {
  color: black;
  margin-bottom: 1rem;
}
.button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
