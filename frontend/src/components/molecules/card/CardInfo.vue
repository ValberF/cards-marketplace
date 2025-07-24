<template>
  <div class="card-info">
    <CardImage :src="imageUrl" :alt="name" />
    <h4 class="card-info__name">{{ name }}</h4>
    <p class="card-info__desc">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
import CardImage from '@/components/atoms/card/CardImage.vue';

defineProps<{
  imageUrl: string;
  name: string;
  description: string;
}>();
</script>

<style lang="scss" scoped>
.card-info {
  margin-left: 1rem;
  &__name {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 0.25rem 0;
  }
  &__desc {
    font-size: 0.9rem;
    color: #666;
    margin: 0;
  }
}
</style>