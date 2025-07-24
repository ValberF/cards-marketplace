<template>
  <form
    class="form__container"
    :style="containerStyle"
  >
    <slot />
  </form>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps<{
  width?: string;
  maxWidth?: string;
  gap?: string;
  padding?: string;
}>();

const containerStyle = computed(() => ({
  width: props.width || '100%',
  maxWidth: props.maxWidth || 'none',
  padding: props.padding || '2rem 0',
  display: 'flex',
  flexDirection: 'column' as const,
  gap: props.gap || '1.5rem',
}));
</script>

<style lang="scss" scoped>
$form-bg: transparent;
$form-radius: 8px;

.form {
  &__container {
    background: $form-bg;
  }
}
</style>