<template>
  <RouterLink to="album">
    <div class="playlistBox">
      <img src="@/assets/icons/note.png" class="playlistBox__cover" alt=""/>
      <button class="playlistBox__title">{{ title }}</button>
      <p class="playlistBox__description">{{ tracks }} tracks</p>
    </div>
  </RouterLink>
</template>

<script setup>

defineProps({
  title: String,
  tracks: String,
})

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