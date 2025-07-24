<template>
  <div class="pagination">
    <PaginationStatus
      :current-page="currentPage"
      :items-per-page="itemsPerPage"
      :total-items="totalItems"
      :loading="loading"
      :error="error"
    />
    <div class="pagination__controls">
      <ItemsPerPageSelector
        v-if="showItemsPerPageSelector"
        :items-per-page="itemsPerPage"
        :options="itemsPerPageOptions"
        @change="handleItemsPerPageChange"
      />
      <PaginationControls
        :current-page="currentPage"
        :can-go-prev="canGoPrev"
        :can-go-next="canGoNext"
        @prev="handlePrevPage"
        @next="handleNextPage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import PaginationStatus from '@/components/molecules/pagination/PaginationStatus.vue';
import ItemsPerPageSelector from '@/components/molecules/pagination/ItemsPerPageSelector.vue';
import PaginationControls from '@/components/molecules/pagination/PaginationControls.vue';

const props = withDefaults(
  defineProps<{
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    hasMore: boolean;
    loading?: boolean;
    error?: boolean;
    showItemsPerPageSelector?: boolean;
    itemsPerPageOptions?: number[];
  }>(),
  {
    loading: false,
    error: false,
    showItemsPerPageSelector: true,
    itemsPerPageOptions: () => [5, 10, 15, 20, 25]
  }
);

const emit = defineEmits<{
  (e: 'update:page', page: number): void;
  (e: 'update:itemsPerPage', itemsPerPage: number): void;
  (e: 'next-page'): void;
  (e: 'prev-page'): void;
}>();

const canGoPrev = computed(() => props.currentPage > 1);
const canGoNext = computed(() => props.hasMore);

function handlePrevPage() {
  if (canGoPrev.value) {
    emit('prev-page');
  }
}

function handleNextPage() {
  if (canGoNext.value) {
    emit('next-page');
  }
}

function handleItemsPerPageChange(newValue: number) {
  emit('update:itemsPerPage', newValue);
}
</script>

<style lang="scss" scoped>
$pagination-gap: 16px;

.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  &__controls {
    display: flex;
    gap: $pagination-gap;
  }
}
</style>