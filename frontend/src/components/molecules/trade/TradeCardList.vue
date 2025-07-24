<template>
  <div class="trade-card-list">
    <div
      class="trade-card-list__title"
      :class="{
        'trade-card-list__title--offering': type === 'OFFERING',
        'trade-card-list__title--receiving': type === 'RECEIVING'
      }"
    >
      {{ title }}
    </div>
    <TradeCardItem
      v-for="card in cards"
      :key="card.id"
      :card="card"
      :type="type"
    />
  </div>
</template>

<script setup lang="ts">
import type { Card } from '@/models/Card.model';
import TradeCardItem from '@/components/atoms/trade/TradeCardItem.vue';

defineProps<{
  title: string;
  cards: Card[];
  type: 'OFFERING' | 'RECEIVING';
}>();
</script>

<style scoped lang="scss">
$trade-card-list-title-size: 1.1rem;
$trade-card-list-title-weight: 600;
$trade-card-list-title-radius: 8px;
$trade-card-list-title-padding: 0.25rem 0;
$trade-card-list-title-margin: 0.5rem;
$trade-card-list-title-offering: #22c55e;
$trade-card-list-title-receiving: #3b82f6;

.trade-card-list {
  width: 100%;

  &__title {
    font-size: $trade-card-list-title-size;
    font-weight: $trade-card-list-title-weight;
    margin-bottom: $trade-card-list-title-margin;
    border-radius: $trade-card-list-title-radius;
    padding: $trade-card-list-title-padding;

    &--offering {
      color: $trade-card-list-title-offering;
    }
    &--receiving {
      color: $trade-card-list-title-receiving;
    }
  }
}
</style>