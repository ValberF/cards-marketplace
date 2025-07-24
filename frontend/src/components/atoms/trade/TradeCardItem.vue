<template>
  <div
    class="trade-card-item"
    :class="{
      'trade-card-item--offering': type === 'OFFERING',
      'trade-card-item--receiving': type === 'RECEIVING'
    }"
  >
    <img :src="card.imageUrl" :alt="card.name" class="trade-card-item__img" />
    <div class="trade-card-item__info">
      <div class="trade-card-item__name">{{ card.name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Card } from '@/models/Card.model';

defineProps<{
  card: Card;
  type: 'OFFERING' | 'RECEIVING';
}>();
</script>

<style scoped lang="scss">
$trade-card-gap: 1rem;
$trade-card-radius: 8px;
$trade-card-padding: 0.5rem;
$trade-card-img-width: 60px;
$trade-card-img-height: 88px;
$trade-card-img-shadow: 0 2px 8px #0001;
$trade-card-offering-bg: #f0fdf4;
$trade-card-receiving-bg: #eff6ff;
$trade-card-name-margin: 0.25rem;

.trade-card-item {
  display: flex;
  gap: $trade-card-gap;
  align-items: center;
  margin-bottom: $trade-card-gap;
  border-radius: $trade-card-radius;
  padding: $trade-card-padding;
  transition: background 0.2s;

  &--offering {
    background: $trade-card-offering-bg;
  }
  &--receiving {
    background: $trade-card-receiving-bg;
  }

  &__img {
    width: $trade-card-img-width;
    height: $trade-card-img-height;
    object-fit: cover;
    border-radius: $trade-card-radius;
    box-shadow: $trade-card-img-shadow;
  }

  &__info {
    flex: 1;
  }

  &__name {
    font-weight: bold;
    margin-bottom: $trade-card-name-margin;
  }
}
</style>