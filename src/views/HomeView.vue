<template>
  <h1 class="title">Home</h1>
  <h2 class="welcome" v-if="userStore.userName">Welcome, {{ userStore.userName }}!</h2>
  <h2 class="welcome" v-else>Welcome!</h2>
  <section class="section">
    <h2>Recently played:</h2>
    <PlaylistTrackList :playlist="userStore.recentlyPlayed"/>
  </section>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import PlaylistTrackList from '../components/PlaylistTrackList.vue'

let userStore = useUserStore();
await userStore.getUserProfileData();
await userStore.getRecentlyPlayed();

window.location.hash = '';

</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
.section {
  margin-bottom: 3rem;

  &:first-of-type {
    margin-top: 3rem;
  }
}

.box-grid {
  scrollbar-width: thin;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 1rem;
  row-gap: 1rem;

  @media(min-width: 576px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media(min-width: 992px) {
    grid-template-columns: repeat(5, 1fr);
  }
}

.welcome {
  margin-top: 0.5rem;
  font-size: 1.2rem;
}
</style>