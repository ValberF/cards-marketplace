<template>
  <div class="items-per-page-selector">
    <label class="items-per-page-selector__label">
      Itens por página:
    </label>
    <select
      :value="itemsPerPage"
      @change="onChange"
      class="items-per-page-selector__select"
    >
      <option
        v-for="option in options"
        :key="option"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    itemsPerPage: number;
    options?: number[];
  }>(),
  {
    options: () => [5, 10, 15, 20, 25]
  }
);

const emit = defineEmits<{
  (e: 'change', value: number): void;
}>();

function onChange(event: Event) {
  const value = Number((event.target as HTMLSelectElement).value);
  emit('change', value);
}
</script>

<style lang="scss" scoped>
$selector-gap: 8px;
$selector-label-font-size: 14px;
$selector-label-color: #6b7280;
$selector-select-padding: 4px 12px;
$selector-select-font-size: 14px;
$selector-select-border: #d1d5db;
$selector-select-radius: 6px;
$selector-select-focus: rgba(59, 130, 246, 0.5);

.items-per-page-selector {
  display: flex;
  align-items: center;
  gap: $selector-gap;

  &__label {
    font-size: $selector-label-font-size;
    color: $selector-label-color;
  }

  &__select {
    padding: $selector-select-padding;
    font-size: $selector-select-font-size;
    border: 1px solid $selector-select-border;
    border-radius: $selector-select-radius;
    cursor: pointer;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px $selector-select-focus;
    }
  }
}
</style>