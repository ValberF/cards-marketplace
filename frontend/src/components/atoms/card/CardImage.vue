<template>
  <img :src="src" :alt="alt" class="card__image" />
</template>

<script setup lang="ts">
defineProps<{
  src: string;
  alt: string;
}>();
</script>

<style lang="scss" scoped>
$card-image-radius: 8px 8px 0 0;
$card-image-width: 100%;

.card {
  &__image {
    width: $card-image-width;
    border-radius: $card-image-radius;
    object-fit: cover;
  }
}
</style>