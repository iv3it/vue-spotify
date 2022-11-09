<template>
  <div>
    <Banner
      :name="name" 
      :tracks="userStore.album.total" 
      :coverImg="coverImg"
      :fav="false"
    />
    <AlbumTrackList :album="userStore.album" />
  </div>
</template>

<script setup>
import Banner from '../components/Banner.vue'
import AlbumTrackList from '../components/AlbumTrackList.vue'
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
await userStore.getAlbumItems(id);

onUnmounted(() => {
  userStore.album = null;  
})

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