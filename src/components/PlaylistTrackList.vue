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
        <p class="list__track__box__duration">{{ item.track.duration_ms }}</p>
        <button 
          class="favourite" :class="{'active': userStore.checkedFavouriteTracks[index]}" 
          @click="userStore.toggleFavourite(item.track.id, index);"
          >
        </button>
      </div>
    </div>
  </div>
  
  <ButtonNextItems @click="loadNextItems" v-if="playlist.total > 10 && playlist.items.length < playlist.total"/>
</template>

<script setup>
import ButtonNextItems from '@/components/ButtonNextItems.vue'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'

let userStore = useUserStore();

const props = defineProps({
  playlist: Object,
})

const emit = defineEmits(['loadNextItems']);

let offset = ref(0);

function loadNextItems() {
  offset.value = offset.value + 10;
  emit('loadNextItems', offset.value);
}

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
      min-width: 1.5rem;
      font-size: 0.7rem;

      @media(min-width: 576px) {
        font-size: 1rem;
      }
    }

    &__box {
      display: flex;
      align-items: center;

      &__duration {
        font-size: 0.55rem;

        @media(min-width: 576px) {
          font-size: 1rem;
        }
      }
    }

    &__cover {
      width: 1.5rem;
      height: auto;
      object-fit: cover;
      aspect-ratio: 1 / 1;
      margin: 0 0.5rem 0 0.25rem;

      @media(min-width: 576px) {
        width: 3rem;
        margin: 0 1rem;
      }
    }

    &__name {
      display: flex;
      flex-direction: column;
      padding-right: 0.5rem;

      &__title {
        color: $white;
        font-size: 0.8rem;
        font-weight: bold;

        @media(min-width: 576px) {
          font-size: 1.1rem;
        }
      }

      &__band {
        color: $grey;
        font-size: 0.55rem;
        font-weight: lighter;

        @media(min-width: 576px) {
          font-size: 0.85rem;
        }
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