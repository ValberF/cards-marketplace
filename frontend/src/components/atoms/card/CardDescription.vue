<template>
  <p class="card__description">{{ description }}</p>
</template>

<script setup lang="ts">
defineProps<{
  description: string;
}>();
</script>

<style lang="scss" scoped>
$card-description-color: #555;
$card-description-font-size: 1rem;
$card-description-margin: 0 0 0.5rem 0;

.card {
  &__description {
    font-size: $card-description-font-size;
    color: $card-description-color;
    margin: $card-description-margin;
  }
}
</style>