<template>
  <Suspense>
    <template #default>
      <div>
        <Banner
          name="Liked songs" 
          :tracks="userStore.favouriteList.total" 
          :fav="true"
        />
        <FavTrackList :playlist="userStore.favouriteList" @loadNextItems="loadNextTracks"/>
      </div>
    </template>
    <template #fallback>
      <LoadingSpinner />
    </template>
  </Suspense>
</template>

<script setup>
import Banner from '../components/Banner.vue'
import FavTrackList from '../components/FavTrackList.vue'
import { useUserStore } from '@/stores/user'
import LoadingSpinner from '../components/LoadingSpinner.vue'

let userStore = useUserStore();
await userStore.getUserFavourite(0);

async function loadNextTracks(offsetValue) {
  await userStore.getUserFavourite(offsetValue);
}

</script>

<style lang="scss" scoped>

</style>