<template>
  <Suspense>
    <template #default>
      <div class="wrapper">
        <div class="box">
          <RouterView />
        </div>
        <AudioPlayer />
        <Navigation />
      </div>
    </template>
    <template #fallback>
      <div class="wrapper">
        <LoadingSpinner />
      </div>
    </template>
  </Suspense>
</template>

<script setup>
import { RouterView } from 'vue-router'
import AudioPlayer from '../components/AudioPlayer.vue'
import Navigation from '../components/Navigation.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'

</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
.wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 2rem 1rem 0 1rem;
  justify-content: space-between;
}

.box {
  position: relative;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: thin;
}
</style>