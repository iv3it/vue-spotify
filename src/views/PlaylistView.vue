<template>
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

<script setup>
import Banner from '../components/Banner.vue'
import PlaylistTrackList from '../components/PlaylistTrackList.vue'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import { onUnmounted } from 'vue'

defineProps({
  name: String,
  coverImg: String,
});

const route = useRoute();
let id = route.params.id;

let userStore = useUserStore();
await userStore.getPlaylistsItems(id);

onUnmounted(() => {
  userStore.playlist = null;  
})

</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

</style>