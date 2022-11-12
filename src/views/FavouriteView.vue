<template>
  <Suspense>
    <template #default>
      <div>
        <Banner
          name="Liked songs" 
          :tracks="userStore.favouriteList.total" 
          :fav="true"
        />
        <PlaylistTrackList :playlist="userStore.favouriteList" />
      </div>
    </template>
    <template #fallback>
      <LoadingSpinner />
    </template>
  </Suspense>
</template>

<script setup>
import Banner from '../components/Banner.vue'
import PlaylistTrackList from '../components/PlaylistTrackList.vue'
import { useUserStore } from '@/stores/user'
import LoadingSpinner from '../components/LoadingSpinner.vue'

let userStore = useUserStore();
await userStore.getUserFavourite();

</script>

<style lang="scss" scoped>

</style>