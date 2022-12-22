<template>
  <section class="audioPlayer" v-if="playerStore.currentTrackInfo && playerStore.playerData.visible">
    <div class="controlsBox">
      <svg @click="playerStore.player.previousTrack()" class="controlsBox__control" width="24px" height="24px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="previousIconTitle" stroke="#ffffff" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#ffffff"> <title id="previousIconTitle">Previous</title> <path d="M7 11.5L18 18V5z"/> <path d="M6 18V5"/> </svg>
      <div 
        @click="playerStore.player.togglePlay(), playerStore.is_paused = !playerStore.is_paused" 
        class="controlsBox__control" 
        :class="{'play': playerStore.is_paused, 'pause': !playerStore.is_paused}" 
        alt="Play/Pause button"
        >
      </div>
      <svg @click="playerStore.player.nextTrack()" class="controlsBox__control" width="24px" height="24px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="nextIconTitle" stroke="#ffffff" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#ffffff"> <title id="nextIconTitle">Next</title> <path d="M17 11.5L6 18V5z"/> <path d="M18 18V5"/> </svg>
    </div>
    <div class="audioPlayer__seek">
      <input 
        type="range"
        class="audioPlayer__seek__input"
        v-model="playerStore.seekValue" 
        @change="playerStore.player.seek(playerStore.seekValue)" 
        :max="playerStore.currentTrackInfo.duration_ms"
      >
      <div class="audioPlayer__seek__timeBox">
        <span class="audioPlayer__seek__timeBox__time">{{ playerStore.seekValueMinSec }}</span>
        <span class="audioPlayer__seek__timeBox__time">{{ playerStore.currentTrackInfo.trackDuration }}</span>
      </div>
    </div>
    <div class="audioPlayer__name">
      <span class="audioPlayer__name__title">
        {{ playerStore.currentTrackInfo.name }}
      </span>
      {{ playerStore.currentTrackInfo.artists[0].name }}
    </div>
  </section>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { usePlayerStore } from '@/stores/player'
import { watch } from 'vue'

let userStore = useUserStore();
let playerStore = usePlayerStore();
playerStore.setAudioPlayer();

setInterval(() => {
  if(!playerStore.is_paused) {
    playerStore.seekValue = Math.round(playerStore.seekValue) + 1000;
  }
}, 1000);

watch(() => playerStore.seekValue, (newValue, oldValue) => {
  playerStore.seekValueMinSec = userStore.getDurationFromMs(newValue);        
})

watch(() => playerStore.currentTrackId, () => {
  playerStore.clearSeekValue();
})

</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.audioPlayer {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: $black;
  color: white;
  padding: 1.5rem 1rem;
  border-top: 1px solid #232323;

  &__seek {
    width: 100%;
    margin-top: 1rem;

    &__timeBox {
      display: flex;
      justify-content: space-between;

      &__time{
        font-size: 0.8rem;
        color: $grey;
      }
    }

    &__input {
      -webkit-appearance: none;
      width: 100%;
      background: transparent;
      margin: 0.5rem 0;
      
      &:focus {
        outline: none;
      }
      
      &::-webkit-slider-runnable-track {
        width: 100%;
        height: 6px;
        cursor: pointer;
        background: $greyTransparent;
        border-radius: 6px;
      }
      
      &::-webkit-slider-thumb {
        border: none;
        height: 12px;
        width: 12px;
        border-radius: 50%;
        background: $white;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -3px;
        // margin-top = (track height in pixels / 2) - (thumb height in pixels / 2)
      }
      &:focus::-webkit-slider-runnable-track {
        background: $greyTransparent;
      }
      
      &::-moz-range-track {
        width: 100%;
        height: 6px;
        cursor: pointer;
        background: $greyTransparent;
        border-radius: 6px;
      }
      
      &::-moz-range-thumb {
        border: none;
        height: 12px;
        width: 12px;
        border-radius: 50%;
        background: $white;
        cursor: pointer;
      }
      
      &::-moz-range-progress {
        background-color: $green;
        border-radius: 6px;
        height: 6px;
      }
    }
  }

  &__name {
    display: flex;
    flex-direction: column;
    align-items: center;
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