<template>
  <div class="playlistBox" v-if="album">
    <RouterLink :to="{ name: 'album', params: { id: album.id, name: album.name, coverImg: getCoverImg() } }"> 
      <img :src="getCoverImg()" class="playlistBox__cover" alt=""/>
      <button class="playlistBox__title">{{ album.name }}</button>
      <p class="playlistBox__description">{{ album.total_tracks }} tracks</p>
    </RouterLink>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'
import DefaultCoverImg from '@/assets/icons/note.png'

const props = defineProps({
  album: Object,
})

let { album } = toRefs(props);

function getCoverImg() {
  if(album.value && album.value.images && album.value.images.length > 0) {
    return album.value.images[0].url
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