<template>
  <div class="pagination-status">
    <div v-if="loading" class="pagination-status__loading">
      <div class="pagination-status__spinner"></div>
      <span>Carregando...</span>
    </div>
    <span v-else-if="error" class="pagination-status__error">
      Erro ao carregar dados
    </span>
    <span v-else-if="totalItems > 0" class="pagination-status__info">
      Mostrando {{ startItem }} - {{ endItem }} de {{ totalItems }} itens
    </span>
    <span v-else class="pagination-status__empty">
      Nenhum item encontrado
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    loading?: boolean;
    error?: boolean;
  }>(),
  {
    loading: false,
    error: false
  }
);

const startItem = computed(() => {
  if (props.totalItems === 0) return 0;
  return (props.currentPage - 1) * props.itemsPerPage + 1;
});

const endItem = computed(() => {
  const end = props.currentPage * props.itemsPerPage;
  return Math.min(end, props.totalItems);
});
</script>

<style lang="scss" scoped>
$pagination-font-size: 14px;
$pagination-loading-color: #6b7280;
$pagination-spinner-size: 16px;
$pagination-spinner-border: 2px solid #3b82f6;
$pagination-spinner-border-top: transparent;
$pagination-error-color: #dc2626;
$pagination-info-color: #6b7280;
$pagination-empty-color: #9ca3af;
$pagination-gap: 8px;

.pagination-status {
  font-size: $pagination-font-size;

  &__loading {
    display: flex;
    align-items: center;
    gap: $pagination-gap;
    color: $pagination-loading-color;
  }

  &__spinner {
    width: $pagination-spinner-size;
    height: $pagination-spinner-size;
    border: $pagination-spinner-border;
    border-top-color: $pagination-spinner-border-top;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  &__error {
    color: $pagination-error-color;
  }

  &__info {
    color: $pagination-info-color;
  }

  &__empty {
    color: $pagination-empty-color;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>