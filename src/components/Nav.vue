<template>
  <header>
    <div class="logo">TaskApp</div>
    <p>Welcome Back {{ user.email }}</p>
    <LogOut />
  </header>
</template>

<script setup>
import LogOut from "./LogOut.vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
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
