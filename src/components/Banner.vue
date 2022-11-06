<template>
  <header class="banner">
    <img v-if="fav" src="@/assets/icons/heart-full.svg" class="banner__cover" alt=""/>
    <img v-else :src="coverImg" class="banner__cover" alt=""/>

    <div>
      <h1 class="title">{{ name }}</h1>
      <h2 class="banner__description">{{ tracks }} tracks</h2>
    </div>
  </header>
</template>

<script setup>

defineProps({
  name: String,
  tracks: Number,
  coverImg: String,
  fav: Boolean,
})

</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media(min-width: 768px) {
    flex-direction: row;
    align-items: center;
    text-align: left;
  }

  &__cover {
    width: 10rem;
    height: auto;
    object-fit: cover;
    aspect-ratio: 1 / 1;
    margin-bottom: 2rem;

    @media(min-width: 768px) {
      margin-bottom: 0;
      margin-right: 3rem;
    }
  }

  &__description {
    color: $grey;
    font-size: 0.8rem;
    font-weight: lighter;

    @media(min-width: 768px) {
      font-size: 1.3rem;
    }
  }
}
</style>