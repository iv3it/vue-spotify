<template>
  <div class="list">
    <div class="list__track" v-for="(item, index) in playlist.items" :key="index">
      <div class="list__track__box">
        <span class="list__track__number">{{ index + 1 }}</span>
        <div>
          <div 
            v-if="playerStore.currentTrackInfo && playerStore.currentTrackInfo.id == item.track.id"
            @click="playerStore.player.togglePlay()"
            class="list__track__playButton"
            :class="{'play': playerStore.is_paused, 'pause': !playerStore.is_paused}" 
            alt="Play/Pause button"
            >
          </div>
          <div v-else
            @click="playerStore.playOneSong(item.track.id)"
            class="list__track__playButton play" 
            alt="Play/Pause button"
            >
          </div>
        </div>
        <div class="list__track__cover">
          <img v-if="item.track.album.images[0]" :src="item.track.album.images[0].url" alt=""/>
          <img v-else src="@/assets/icons/note.png" alt=""/>
        </div>
        <div class="list__track__name">
          <p class="list__track__name__title">{{ item.track.name }}</p>
          <p class="list__track__name__band">{{ item.track.album.artists[0].name }}</p>
        </div>
      </div>
      <div class="list__track__box">
        <p class="list__track__box__duration">{{ item.track.duration_ms }}</p>
        <button 
          class="favourite" :class="{'active': userStore.checkedFavouriteTracks[index] || item.isFavourite }" 
          @click="userStore.toggleFavourite(item.track.id, index); deleteItemFromFavList(item.track.id);"
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
import { usePlayerStore } from '@/stores/player'
import { ref } from 'vue'

let userStore = useUserStore();
let playerStore = usePlayerStore();

const props = defineProps({
  playlist: Object,
})

const emit = defineEmits(['loadNextItems']);

let offset = ref(0);

function loadNextItems() {
  offset.value = offset.value + 10;
  emit('loadNextItems', offset.value);
}

function deleteItemFromFavList(id) {
  userStore.favouriteList.items = userStore.favouriteList.items.filter(item => item.track.id !== id);
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

    &__playButton {
      cursor: pointer;
      height: 2rem;
      width: 2rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      flex-shrink: 0;
      margin-right: 1rem;

      &.play {
        background-image: url('@/assets/icons/player/play-circle.svg');
      }

      &.pause {
        background-image: url('@/assets/icons/player/pause-circle.svg');
      }

      @media(min-width: 576px) {
        height: 2.6rem;
        width: 2.6rem;
        margin-right: unset;
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
      position: relative;
      width: 3rem;
      margin: 0 1rem;
      transition: 0.25s ease-in-out;
      flex-shrink: 0;

      img {
        width: 100%;
        height: auto;
        object-fit: cover;
        aspect-ratio: 1 / 1;
      }

      @media(max-width: 575px) {
        display: none;
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