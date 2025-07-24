<template>
  <div class="multi-select" ref="root">
    <div
      class="multi-select__control"
      @click="toggleDropdown"
      :tabindex="0"
      @keydown.enter.prevent="toggleDropdown"
      @keydown.space.prevent="toggleDropdown"
    >
      <span
        v-if="selectedOptions.length"
        class="multi-select__placeholder"
        :title="selectedOptions.map(opt => opt[labelKey]).join(', ')"
      >
        {{ selectedSummary }}
      </span>
      <span v-else class="multi-select__placeholder--empty">
        {{ placeholder }}
      </span>
      <span class="multi-select__arrow" :class="{ 'multi-select__arrow--open': open }">
        <Icon name="ChevronDown" :size="16" color="#18181b" />
      </span>
    </div>
    <div v-if="open" class="multi-select__dropdown">
      <div
        v-for="option in options"
        :key="option[valueKey]"
        class="multi-select__option"
        @click.stop="toggleOption(option)"
      >
        <input
          type="checkbox"
          :checked="selectedValues.includes(option[valueKey])"
          @change="toggleOption(option)"
          @click.stop
        />
        <span>{{ option[labelKey] }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Icon from '@/components/atoms/Icon.vue';
import { useMultiSelect } from '@/composables/useMultiSelect';
import type { Option } from '@/composables/useMultiSelect';

const props = defineProps<{
  options: Option[];
  modelValue: string[];
  label?: string;
  value?: string;
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
}>();

const root = ref<HTMLElement | null>(null);

const {
  labelKey,
  valueKey,
  placeholder,
  selectedValues,
  open,
  selectedOptions,
  selectedSummary,
  toggleDropdown,
  toggleOption,
} = useMultiSelect(props, emit, root);
</script>

<style lang="scss" scoped>
$multi-select-border: #ccc;
$multi-select-border-focus: #888;
$multi-select-radius: 0.5rem;
$multi-select-bg: #fff;
$multi-select-placeholder: #333;
$multi-select-placeholder-empty: #aaa;
$multi-select-arrow-size: 16px;
$multi-select-arrow-color: #18181b;
$multi-select-dropdown-shadow: 0 2px 12px rgba(0,0,0,0.08);
$multi-select-option-hover: #f5f5f5;
$multi-select-checkbox-accent: #1976d2;

.multi-select {
  position: relative;
  width: 100%;
  font-family: inherit;

  &__control {
    border: 1px solid $multi-select-border;
    border-radius: $multi-select-radius;
    padding: 0.5rem 1rem;
    background: $multi-select-bg;
    cursor: pointer;
    min-height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    outline: none;
    transition: border 0.2s;

    &:focus, &:active {
      border-color: $multi-select-border-focus;
    }
  }

  &__placeholder {
    color: $multi-select-placeholder;
    font-size: 1rem;
    display: inline-block;
    max-width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;

    &--empty {
      color: $multi-select-placeholder-empty;
    }
  }

  &__arrow {
    margin-left: 1rem;
    font-size: 0.9rem;
    transition: transform 0.2s;

    &--open {
      transform: rotate(180deg);
    }
  }

  &__dropdown {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    width: 100%;
    background: $multi-select-bg;
    border: 1px solid $multi-select-border;
    border-radius: $multi-select-radius;
    box-shadow: $multi-select-dropdown-shadow;
    z-index: 10;
    max-height: 220px;
    overflow-y: auto;
    padding: 0.5rem 0;
  }

  &__option {
    display: flex;
    align-items: center;
    padding: 0.4rem 1rem;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.15s;

    &:hover {
      background: $multi-select-option-hover;
    }

    input[type="checkbox"] {
      margin-right: 0.7rem;
      accent-color: $multi-select-checkbox-accent;
    }
  }
}
</style>