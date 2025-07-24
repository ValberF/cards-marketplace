<template>
  <div class="input">
    <label v-if="label" :for="inputId" class="input__label">{{ label }}</label>
    <input
      :id="inputId"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      :disabled="disabled"
      class="input__field"
      v-bind="$attrs"
      :class="{ 'input__field--error': error }"
    />
    <span v-if="error" class="input__error-message">{{ error }}</span>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, defineEmits } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue: String;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    type?: string;
    id?: string;
    error?: string;
  }>(),
  {
    label: '',
    placeholder: '',
    disabled: false,
    type: 'text',
    id: undefined,
    error: '',
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const inputId = computed(() => props.id || `input-${Math.random().toString(36).substr(2, 9)}`);

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
}
</script>

<style lang="scss" scoped>
$input-border: #ccc;
$input-error: #e74c3c;
$input-radius: 4px;
$input-padding: 8px;
$input-disabled-bg: #f5f5f5;
$input-disabled-color: #aaa;
$input-label-font-weight: 500;
$input-label-margin-bottom: 4px;
$input-error-font-size: 0.9em;
$input-error-margin-top: 2px;

.input {
  &__label {
    display: block;
    margin-bottom: $input-label-margin-bottom;
    font-weight: $input-label-font-weight;
  }

  &__field {
    padding: $input-padding;
    border: 1px solid $input-border;
    border-radius: $input-radius;
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.2s;

    &--error {
      border-color: $input-error;
    }

    &:disabled {
      background: $input-disabled-bg;
      color: $input-disabled-color;
      cursor: not-allowed;
    }
  }

  &__error-message {
    color: $input-error;
    font-size: $input-error-font-size;
    margin-top: $input-error-margin-top;
    display: block;
  }
}
</style>