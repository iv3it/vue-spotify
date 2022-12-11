<template>
  <section class="audioPlayer" v-if="playerStore.currentTrackInfo && playerStore.playerData.visible">
    <div class="audioPlayer__name">
      <span class="audioPlayer__name__title">
        {{ playerStore.currentTrackInfo.name }}
      </span>
      {{ playerStore.currentTrackInfo.artists[0].name }}
    </div>
    <div class="controlsBox">
      <svg @click="playerStore.player.previousTrack()" class="controlsBox__control" width="24px" height="24px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="previousIconTitle" stroke="#ffffff" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#ffffff"> <title id="previousIconTitle">Previous</title> <path d="M7 11.5L18 18V5z"/> <path d="M6 18V5"/> </svg>
      
      <div 
        @click="playerStore.player.togglePlay()" 
        class="controlsBox__control" 
        :class="{'play': playerStore.is_paused, 'pause': !playerStore.is_paused}" 
        alt="Play/Pause button"
        >
      </div>

      <svg @click="playerStore.player.nextTrack()" class="controlsBox__control" width="24px" height="24px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="nextIconTitle" stroke="#ffffff" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#ffffff"> <title id="nextIconTitle">Next</title> <path d="M17 11.5L6 18V5z"/> <path d="M18 18V5"/> </svg>
    </div>
  </section>
</template>

<script setup>
import { usePlayerStore } from '@/stores/player'

let playerStore = usePlayerStore();
playerStore.setAudioPlayer();

</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.audioPlayer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $black;
  color: white;
  padding: 1.5rem 1rem;
  border-top: 1px solid #232323;

  &__name {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 0.7rem;

    &__title {
      font-weight: 700;
      font-size: 0.9rem;
    }
  }

  .controlsBox {
    position: relative;
    display: flex;
    align-items: center;

    &__control {
      height: 2rem;
      width: 2rem;
      cursor: pointer;

      &.play, &.pause {
        height: 2.6rem;
        width: 2.6rem;
        margin: 0 1rem;
      }

      &.play {
        background-image: url('@/assets/icons/player/play-circle.svg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
      }

      &.pause {
        background-image: url('@/assets/icons/player/pause-circle.svg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
      }
    }
  }
}

</style>