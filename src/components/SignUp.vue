<template>
  <div class="logo">
    <i class="fa-solid fa-list-check logoImg"></i>
    <h1>TaskApp</h1>
  </div>
  <h2>Sign Up</h2>
  <PersonalRouter :route="route" :buttonText="buttonText" />
  <form class="form" @submit.prevent="signUp">
    <label for="email">Email</label>
    <input
      class="input"
      type="email"
      id="email"
      v-model="email"
      required="required"
      placeholder="email@example.com"
    />
    <label for="password">Password (6 characters minimum)</label>
    <input
      class="input"
      type="password"
      id="password"
      v-model="password"
      required="required"
      minlength="6"
    />
    <label for="password">Password (6 characters minimum)</label>
    <input
      class="input"
      type="password"
      id="confirmPassword"
      v-model="confirmPassword"
      required="required"
      minlength="6"
    />
    <button class="button" type="submit">Sign Up</button>
  </form>
  <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import PersonalRouter from "./PersonalRouter.vue";

const userStore = useUserStore();

// Route Variables
const route = "/auth/login";
const buttonText = "Test the Sign In Route";

// Input Fields
const email = ref();
const password = ref();
const confirmPassword = ref();

// Error Message
const errorMessage = ref("");
// Show hide password variable
const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);
const hidePassword = ref(true);
// Show hide confrimPassword variable

// Router to push user once SignedUp to Log In
const redirect = useRouter();
// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
async function signUp() {
  //   const response = await userStore
  //     .signUp(email.value, password.value)
  //     .catch((error) => {
  //       alert(error.message);
  //     });
  if (password.value === confirmPassword.value) {
    try {
      // calls the user store and send the users info to backend to logIn
      await userStore.signUp(email.value, password.value);
      // redirects user to the homeView
      redirect.push({ path: "/auth/login" });
    } catch (error) {
      // displays error message
      errorMessage.value = `Error: ${error.message}`;
      // hides error message
      setTimeout(() => {
        errorMessage.value = null;
      }, 5000);
    }
  } else {
    errorMessage.value = `Error Password fields must match`;
    //hide error message
    setTimeout(() => {
      errorMessage.value = null;
    }, 5000);
  }
}
</script>

<style scoped>
.logo {
  line-height: 44px;
  display: flex;
  flex-direction: row;
}
.logoImg {
  padding-top: 8px;
  margin-right: 8px;
  font-size: 30px;
}
input {
  padding-left: 5px;
}
</style>
