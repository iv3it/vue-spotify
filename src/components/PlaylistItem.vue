<template>
  <div class="playlistBox" v-if="playlist">
    <RouterLink :to="{ name: 'playlist', params: { id: playlist.id, name: playlist.name, coverImg: getCoverImg() } }"> 
      <img :src="getCoverImg()" class="playlistBox__cover" alt=""/>
      <button class="playlistBox__title">{{ playlist.name }}</button>
      <p class="playlistBox__description">{{ playlist.tracks.total }} tracks</p>
    </RouterLink>
  </div>
</template>

<script setup>

import { toRefs } from 'vue'
import DefaultCoverImg from '@/assets/icons/note.png'

const props = defineProps({
  playlist: Object,
});

let { playlist } = toRefs(props);

function getCoverImg() {
  if(playlist.value && playlist.value.images && playlist.value.images.length > 0) {
    return playlist.value.images[0].url
  } else {
    return DefaultCoverImg
  }
}

</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.playlistBox {
  &__cover {
    width: 100%;
    height: auto;
    object-fit: cover;
    aspect-ratio: 1 / 1;
  }

  &__title {
    border: none;
    padding: 0.4rem 0;
    color: $white;
    font-weight: 700;
    background-color: transparent;
    text-align: left;
    
    &:hover {
      color: $grey;
      cursor: pointer;
    }
  }
  
  &__description {
    font-size: 0.8rem;
    font-weight: lighter;
    color: $grey;
  }
}

</style>