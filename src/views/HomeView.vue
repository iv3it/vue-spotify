<template>
  <h1 class="title">Home</h1>
  <h2 class="welcome">Welcome, XYZ!</h2>
  <section class="section">
    <h2>Recently played:</h2>
    <div class="box-grid">
      <AlbumItem title="XYZ" tracks="93" />
    </div>
  </section>
  <section class="section">
    <h2>Based on your recent listening:</h2>
    <div class="box-grid">
      <PlaylistItem title="XYZ" tracks="93" />
    </div>
  </section>
</template>

<script setup>
import AlbumItem from '../components/AlbumItem.vue'
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

.welcome {
  margin-top: 0.5rem;
  font-size: 1.2rem;
}
</style>