<template>
  <div class="buttonWrapper">
    <button class="button">Load more...</button>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.buttonWrapper {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

.button {
  background-color: transparent;
  padding: 0.5rem 1rem;
  border: 1px solid $white;
  color: $white;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 40px;
  transition: all 0.25s;
  cursor: pointer;

  &:hover {
    color: $green;
    border: 1px solid $green;
  }
}

</style>