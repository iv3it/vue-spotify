<template>
  <div class="list">
    <div class="list__track" v-for="(item, index) in album.items" :key="index">
      <div class="list__track__box">
        <span class="list__track__number">{{ index + 1 }}</span>
        <div class="list__track__name">
          <p class="list__track__name__title">{{ item.name }}</p>
          <p class="list__track__name__band">{{ item.artists[0].name }}</p>
        </div>
      </div>
      <div class="list__track__box">
        <p>{{ item.duration_ms }}</p>
        <button class="favourite" :class="{'active': favouriteTracks[index]}" @click="userStore.toggleFavourite(item.id)"></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { toRefs } from 'vue'

let userStore = useUserStore();

const props = defineProps({
  album: Object,
})

let { album } = toRefs(props);

let tracksIds = userStore.getAlbumTracksIds(album.value);
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