<template>
  <div class="card__content">
    <small class="card__date">{{ formattedDate }}</small>
    <CardTitle :title="name" />
    <CardDescription :description="description" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CardTitle from '@/components/atoms/card/CardTitle.vue';
import CardDescription from '@/components/atoms/card/CardDescription.vue';
import { formatDate } from '@/utils/formatDate';

const props = defineProps<{
  name: string;
  description: string;
  createdAt: string;
}>();

const formattedDate = computed(() => formatDate(props.createdAt, 'pt-BR'));
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