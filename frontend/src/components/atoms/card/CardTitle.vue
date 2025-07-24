<template>
  <h2 class="card__title">{{ title }}</h2>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<style lang="scss" scoped>
$card-title-font-size: 1.2rem;
$card-title-font-weight: bold;
$card-title-margin: 0.5rem 0 0.25rem 0;

.card {
  &__title {
    font-size: $card-title-font-size;
    font-weight: $card-title-font-weight;
    margin: $card-title-margin;
  }
}
</style>