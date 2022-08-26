<template>
  <div class="logo">
    <i class="fa-solid fa-list-check logoImg"></i>
    <h1>TaskApp</h1>
  </div>
  <h2>Sign In</h2>
  <PersonalRouter :route="route" :buttonText="buttonText" />
  <form class="form" @submit.prevent="signIn">
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
    <i>class="fas fa-eye-slash fa-sm" data-v-ca8ded13 ::before </i>
    <input
      class="input"
      :type="passwordFieldType"
      id="password"
      v-model="password"
      required="required"
      minlength="6"
    />

    <button class="button" type="submit">Sign In</button>
  </form>
  <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
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
</style>
