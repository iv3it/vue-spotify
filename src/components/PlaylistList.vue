<template>
  <div class="list">
    <div class="list__track" v-for="(item, index) in playlist.items" :key="index">
      <div class="list__track__box">
        <span class="list__track__number">{{ index + 1 }}</span>
        <img v-if="item.track.album.images[0]" :src="item.track.album.images[0].url" class="list__track__cover" alt=""/>
        <img v-else src="@/assets/icons/note.png" class="list__track__cover" alt=""/>
        <div class="list__track__name">
          <p class="list__track__name__title">{{ item.track.name }}</p>
          <p class="list__track__name__band">{{ item.track.album.artists[0].name }}</p>
        </div>
      </div>
      <div class="list__track__box">
        <p>{{ item.track.duration_ms }}</p>
        <button class="favourite" :class="{'active': favouriteTracks[index]}" @click="userStore.toggleFavourite(item.track.id)"></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { toRefs } from 'vue'

let userStore = useUserStore();

const props = defineProps({
  playlist: Object,
})

let { playlist } = toRefs(props);

let tracksIds = userStore.getTracksIds(playlist.value);
let favouriteTracks = await userStore.checkisFavourite(tracksIds);

</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.list {
  margin-top: 3rem;

  &__track {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;

    &__number {
      display: flex;
      min-width: 2rem;
    }

    &__box {
      display: flex;
      align-items: center;
    }

    &__cover {
      width: 3rem;
      height: auto;
      object-fit: cover;
      aspect-ratio: 1 / 1;
      margin: 0 1rem;
    }

    &__name {
      display: flex;
      flex-direction: column;

      &__title {
        color: $white;
        font-size: 1.1rem;
        font-weight: bold;
      }

      &__band {
        color: $grey;
        font-size: 0.85rem;
        font-weight: lighter;
      }
    }
  }
}

.favourite {
  background-color: transparent;
  background-image: url('@/assets/icons/heart.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 1.1rem;
  width: 2rem;
  border: none;
  margin-left: 1rem;
  cursor: pointer;

  &.active {
    background-image: url('@/assets/icons/heart-full.svg');
  }

  &:hover {
    background-image: url('@/assets/icons/heart-full.svg');
  }
}
</style>