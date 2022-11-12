<template>
  <Suspense>
    <template #default>
      <div>
        <Banner 
          :name="name" 
          :tracks="userStore.playlist.total" 
          :coverImg="coverImg"
          :fav="false"
        />
        <PlaylistTrackList :playlist="userStore.playlist" />
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
import { onUnmounted } from 'vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { toRefs } from 'vue'

let props = defineProps({
  name: String,
  coverImg: String,
  id: String,
});

let { name, coverImg, id } = toRefs(props);

let userStore = useUserStore();
await userStore.getPlaylistsItems(id.value);

onUnmounted(() => {
  userStore.playlist = null;  
})

</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

</style>