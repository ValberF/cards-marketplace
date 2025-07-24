<template>
  <div class="pagination-controls">
    <Button
      :disabled="!canGoPrev"
      @click="emitPrev"
    >
      <ArrowIcon direction="left" />
      <span class="pagination-controls__text">Anterior</span>
    </Button>

    <span class="pagination-controls__page-info">
      Página {{ currentPage }}
    </span>

    <Button
      :disabled="!canGoNext"
      @click="emitNext"
    >
      <span class="pagination-controls__text">Próximo</span>
      <ArrowIcon direction="right" />
    </Button>
  </div>
</template>

<script setup lang="ts">
import ArrowIcon from '@/components/atoms/pagination/ArrowIcon.vue';
import Button from '@/components/atoms/Button.vue';

defineProps<{
  currentPage: number;
  canGoPrev: boolean;
  canGoNext: boolean;
}>();

const emit = defineEmits<{
  (e: 'prev'): void;
  (e: 'next'): void;
}>();

function emitPrev() {
  emit('prev');
}

function emitNext() {
  emit('next');
}
</script>

<style lang="scss" scoped>
$pagination-gap: 8px;
$pagination-info-padding: 8px 16px;
$pagination-info-font-size: 14px;
$pagination-info-color: #6b7280;
$pagination-text-margin: 0 4px;

.pagination-controls {
  display: flex;
  align-items: center;
  gap: $pagination-gap;

  &__page-info {
    padding: $pagination-info-padding;
    font-size: $pagination-info-font-size;
    color: $pagination-info-color;
  }

  &__text {
    margin: $pagination-text-margin;
  }
}
</style>