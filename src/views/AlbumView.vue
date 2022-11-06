<template>
  <Banner title="XYZ" tracks="4" time="32" :fav="true"/>
  <PlaylistList :playlist="userStore.playlist"/>
</template>

<script setup>
import Banner from '../components/Banner.vue'
import PlaylistList from '../components/PlaylistList.vue'

import { useUserStore } from '@/stores/user'
let userStore = useUserStore();

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