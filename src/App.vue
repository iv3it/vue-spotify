<template>
  <div v-if="userStore.loggedIn">
    <RouterView />
  </div>
  <div v-else>
    <LoginView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import { useUserStore } from '@/stores/user'
import { onUnmounted } from 'vue';

const userStore = useUserStore();

let userTokenExist = sessionStorage.hasOwnProperty("user_token");

if (userTokenExist) {
  userStore.loggedIn = true;
} else {
  userStore.loggedIn = false;
}

////// Set token 
let url = window.location.href;
let findToken = url.indexOf("access_token=");

if(findToken >= 0) {
  let token = url.substring(findToken);
  token = token.substring("access_token=".length, token.indexOf("&"));
  sessionStorage.setItem('user_token', token);
  userStore.token = token;
  userStore.loggedIn = true;
}

</script>

<style lang="scss" scoped>

</style>