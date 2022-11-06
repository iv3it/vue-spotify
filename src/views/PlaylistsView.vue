<template>
  <h1 class="title">Playlists</h1>
  <div class="box-grid">
    <div v-for='(playlist, index) in userStore.playlists.items' :key='index'>
      <PlaylistItem :playlist="playlist" />
    </div>
  </div>
</template>

<script setup>
import PlaylistItem from '../components/PlaylistItem.vue'
import { useUserStore } from '@/stores/user'

let userStore = useUserStore();
await userStore.getUserPlaylists();

</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

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
</style>