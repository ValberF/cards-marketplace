<template>
  <div class="card__content">
    <CardTitle :title="name" />
    <CardDescription :description="description" />
    <small class="card__date">{{ formattedDate }}</small>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CardTitle from '@/components/atoms/card/CardTitle.vue';
import CardDescription from '@/components/atoms/card/CardDescription.vue';

const props = defineProps<{
  name: string;
  description: string;
  createdAt: string;
}>();

const formattedDate = computed(() =>
  new Date(props.createdAt).toLocaleDateString()
);
</script>

<style lang="scss" scoped>
$card-date-color: #888;
$card-date-font-size: 0.85rem;

.card {
  &__date {
    color: $card-date-color;
    font-size: $card-date-font-size;
  }
}
</style>