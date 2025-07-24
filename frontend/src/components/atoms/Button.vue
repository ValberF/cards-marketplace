<template>
  <button
    :class="[
      'button',
      `button__${variant}`,
      { 'button__disabled': disabled }
    ]"
    :type="type"
    :disabled="disabled"
    @click="emitClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
  }>(),
  {
    variant: 'primary',
    disabled: false
  }
);

const emit = defineEmits<{
  (e: 'click'): void;
}>();

function emitClick() {
  if (!props.disabled) {
    emit('click');
  }
}
</script>

<style lang="scss" scoped>
$button-bg-primary: #18181b;
$button-bg-primary-hover: #474752;
$button-bg-secondary: #ffffff;
$button-bg-secondary-hover: #f0f0f0;
$button-bg-primary-disabled: #d1d5db;
$button-bg-secondary-disabled: #f3f4f6;
$button-color-primary: #fff;
$button-color-secondary: #18181b;
$button-color-secondary-disabled: #9ca3af;
$button-radius: 6px;

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1.2rem;
  border: none;
  border-radius: $button-radius;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:active:not(.button__disabled) {
    outline: none;
    box-shadow: 0 0 0 2px $button-bg-primary;
  }

  &__primary {
    background-color: $button-bg-primary;
    color: $button-color-primary;

    &:hover:not(.button__disabled) {
      background-color: $button-bg-primary-hover;
    }
  }

  &__secondary {
    background-color: $button-bg-secondary;
    color: $button-color-secondary;

    &:hover:not(.button__disabled) {
      background-color: $button-bg-secondary-hover;
    }
  }

  &__disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &.button__primary {
      background-color: $button-bg-primary-disabled;
    }

    &.button__secondary {
      background-color: $button-bg-secondary-disabled;
      color: $button-color-secondary-disabled;
    }
  }
}
</style>