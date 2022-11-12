<template>
  <div class="loading">
    <div class="loading__dot heartbeat"></div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.loading {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &__dot {
    height: 2rem;
    width: 2rem;
    background-color: $green;
    border-radius: 50%;

    &::after {
      content: "";
      position: absolute;
      display: block;
      background-color: $white;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      left: 2.5rem;
    }

    &::before {
      content: "";
      position: absolute;
      display: block;
      background-color: $white;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      right: 2.5rem;
    }
  }
}


.heartbeat {
  animation: heartbeat 1.5s ease-in-out infinite both;
}

@keyframes heartbeat {
  from {
    transform: scale(1);
    transform-origin: center center;
    animation-timing-function: ease-out;
    transform: rotate(0);
  }
  10% { 
    transform: scale(.91);
    animation-timing-function: ease-in;
  }
  17% {
    transform: scale(.98);
    animation-timing-function: ease-out;
  }
  33% {
    transform: scale(.87);
    animation-timing-function: ease-in;
  } 
  45% {
    transform: scale(1);
    animation-timing-function: ease-out;
    transform: rotate(360deg);
  }
}
</style>