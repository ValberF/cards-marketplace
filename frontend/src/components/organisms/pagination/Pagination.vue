<template>
  <div class="pagination">
    <div class="pagination__status">
      <PaginationStatus
        :current-page="currentPage"
        :items-per-page="itemsPerPage"
        :total-items="totalItems"
        :loading="loading"
        :error="error"
      />
    </div>
    
    <div class="pagination__controls">
      <ItemsPerPageSelector
        v-if="showItemsPerPageSelector"
        :items-per-page="itemsPerPage"
        :options="itemsPerPageOptions"
        @change="handleItemsPerPageChange"
        class="pagination__items-selector"
      />
      <PaginationControls
        :current-page="currentPage"
        :can-go-prev="canGoPrev"
        :can-go-next="canGoNext"
        @prev="handlePrevPage"
        @next="handleNextPage"
        class="pagination__nav-controls"
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
$tablet: 768px;
$mobile: 480px;
$pagination-gap: 1rem;
$pagination-gap-mobile: 0.75rem;
$vertical-gap: 0.75rem;

.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  flex-wrap: wrap;
  gap: $vertical-gap;
  
  @media (max-width: $tablet) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    padding: 0.75rem;
  }
  
  @media (max-width: $mobile) {
    padding: 0.5rem;
    gap: 0.75rem;
  }

  &__status {
    flex: 1;
    min-width: 0;
    
    @media (max-width: $tablet) {
      flex: none;
      text-align: center;
      width: 100%;
    }
  }

  &__controls {
    display: flex;
    align-items: center;
    gap: $pagination-gap;
    flex-shrink: 0;
    
    @media (max-width: $tablet) {
      flex-direction: column-reverse;
      width: 100%;
      gap: $vertical-gap;
    }
    
    @media (max-width: $mobile) {
      gap: $pagination-gap-mobile;
    }
  }
  
  &__items-selector {
    @media (max-width: $tablet) {
      width: 100%;
    }
  }
  
  &__nav-controls {
    @media (max-width: $tablet) {
      width: 100%;
      justify-content: center;
    }
  }
}

.pagination--compact {
  padding: 0.5rem 0.75rem;
  
  .pagination__controls {
    gap: 0.5rem;
  }
  
  @media (max-width: $tablet) {
    padding: 0.5rem;
    
    .pagination__controls {
      gap: 0.5rem;
    }
  }
}

.pagination--clean {
  background: transparent;
  border: none;
  padding: 0.5rem 0;
}
</style>