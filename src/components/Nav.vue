<template>
  <header>
    <div class="logo">
      <i class="fa-solid fa-list-check logoImg"></i>
      <div class="logo">TaskApp</div>
    </div>
    <p>Welcome back {{ user.email }}</p>
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
  padding: 20px 0px;
}
p,
.logo {
  line-height: 44px;
  display: flex;
  flex-direction: row;
}
.logoImg {
  padding-top: 14px;
  margin-right: 4px;
}

@media (max-width: 600px) {
  p {
    display: none;
  }
}
</style>
