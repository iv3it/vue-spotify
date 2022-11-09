<template>
  <Banner
    name="Liked songs" 
    :tracks="userStore.favouriteList.total" 
    :fav="true"
  />
  <PlaylistTrackList :playlist="userStore.favouriteList" />
</template>

<script setup>
import Banner from '../components/Banner.vue'
import PlaylistTrackList from '../components/PlaylistTrackList.vue'
import { useUserStore } from '@/stores/user'

let userStore = useUserStore();
await userStore.getUserFavourite();

</script>

<style lang="scss" scoped>

</style>