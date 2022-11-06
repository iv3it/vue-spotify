<template>
  <div class="login">
    <h1 class="title">Spotify app</h1>
    <button class="login__button" @click="userStore.logIn">Log in</button>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore();

</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.login {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__button {
    display: block;
    color: $white;
    font-size: 1.2rem;
    font-weight: 600;
    text-transform: uppercase;
    background-color: $green;
    padding: 1rem 2rem;
    border: none;
    border-radius: 40px;
    cursor: pointer;
    transition: all 0.25s;
    margin-top: 1.5rem;

    &:hover {
      background-color: lighten($green, 5%)
    }
  }
}
</style>