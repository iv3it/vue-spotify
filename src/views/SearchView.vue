<template>
  <h1 class="title">Search</h1>
  <div class="search">
    <img src="@/assets/icons/search.svg" class="search__icon" alt="search icon"/>
    <input class="search__input" placeholder="Songs, albums or playlists" type="search" id="search" name="search">
  </div>
  <section class="section">
    <h2>Tracks:</h2>
    <!-- <PlaylistList /> -->
  </section>
  <section class="section">
    <h2>Albums:</h2>
    <div class="box-grid">
      <AlbumItem title="XYZ" tracks="93" />
    </div>
  </section>
  <section class="section">
    <h2>Playlists:</h2>
    <div class="box-grid">
      <PlaylistItem title="XYZ" tracks="93" />
    </div>
  </section>
</template>

<script setup>
import Banner from '../components/Banner.vue'
import AlbumItem from '../components/AlbumItem.vue'
import PlaylistList from '../components/PlaylistList.vue'
import PlaylistItem from '../components/PlaylistItem.vue'

</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.section {
  margin-bottom: 3rem;

  &:first-of-type {
    margin-top: 3rem;
  }
}

.box-grid {
  scrollbar-width: thin;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 1rem;
  row-gap: 1rem;

  @media(min-width: 576px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media(min-width: 992px) {
    grid-template-columns: repeat(5, 1fr);
  }
}

.search {
  margin: 2rem 0;
  display: flex;
  border: 1px solid $white;
  border-radius: 50px;
  padding: 1rem;

  &__icon {
    width: 2rem;
    height: auto;
    object-fit: contain;
    margin-right: 2rem;
  }

  &__input {
    background-color: transparent;
    color: $white;
    font-size: 1.5rem;
    font-weight: 300;
    border: none;
    outline: none;
    letter-spacing: 2px;
    width: 100%;

    &::placeholder {
      color: $greyTransparent;
    }
  }
}
</style>