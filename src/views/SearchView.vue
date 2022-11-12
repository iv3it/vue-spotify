<template>
  <h1 class="title">Search</h1>
  <div class="search">
    <img src="@/assets/icons/search.svg" class="search__icon" alt="search icon"/>
    <input v-model="searchQuery.query" @keyup="search" class="search__input" placeholder="Songs, albums or playlists" type="search" id="search" name="search">
  </div>
  <Suspense>
    <template #default>
      <div>
        <section class="section" v-if="userStore.searchResults.tracks">
          <h2>Tracks:</h2>
          <AlbumTrackList :album="userStore.searchResults.tracks"/>
        </section>
        <section class="section" v-if="userStore.searchResults.albums">
          <h2>Albums:</h2>
          <div class="box-grid">
            <div v-for='(album, index) in userStore.searchResults.albums.items' :key='index'>
              <AlbumItem :album="album" />
            </div>
          </div>
        </section>
        <section class="section" v-if="userStore.searchResults.playlists">
          <h2>Playlists:</h2>
          <div class="box-grid">
            <div v-for='(playlist, index) in userStore.searchResults.playlists.items' :key='index'>
              <PlaylistItem :playlist="playlist" />
            </div>
          </div>
        </section>
      </div>
    </template>
    <template #fallback>
      <LoadingSpinner />
    </template>
  </Suspense>
</template>

<script setup>
import Banner from '../components/Banner.vue'
import AlbumItem from '../components/AlbumItem.vue'
import AlbumTrackList from '../components/AlbumTrackList.vue'
import PlaylistItem from '../components/PlaylistItem.vue'
import { useUserStore } from '@/stores/user'
import LoadingSpinner from '../components/LoadingSpinner.vue'

let userStore = useUserStore();

let searchQuery = {
  query: "", 
}

function search() {
  if(searchQuery.query.length >= 3) {
    setTimeout(() => {
      userStore.searchForItems(searchQuery.query);
    }, 1000);
  }
}

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
  padding: 0.65rem;

  &__icon {
    width: 1.2rem;
    height: auto;
    object-fit: contain;
    margin-right: 0.75rem;

    @media(min-width: 576px) {
      width: 2rem;
      margin-right: 2rem;
    }
  }

  &__input {
    background-color: transparent;
    color: $white;
    font-size: 1rem;
    font-weight: 300;
    border: none;
    outline: none;
    letter-spacing: 2px;
    width: 100%;

    &::placeholder {
      color: $greyTransparent;
    }

    @media(min-width: 576px) {
      font-size: 1.5rem;
    }
  }

  @media(min-width: 576px) {
    padding: 1rem;
  }
}
</style>