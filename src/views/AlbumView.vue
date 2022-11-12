<template>
  <Suspense>
    <template #default>
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
    <template #fallback>
      <LoadingSpinner />
    </template>
  </Suspense>
</template>

<script setup>
import Banner from '../components/Banner.vue'
import AlbumTrackList from '../components/AlbumTrackList.vue'
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
await userStore.getAlbumItems(id.value);

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