<template>
  <div
    class="box__container"
    :style="containerStyle"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

const props = defineProps<{
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
  padding?: string;
}>();

const containerStyle = computed(() => ({
  width: props.width || '100%',
  height: props.height || 'auto',
  maxWidth: props.maxWidth || 'none',
  maxHeight: props.maxHeight || 'none',
  padding: props.padding || '2rem',
}));
</script>

<style lang="scss" scoped>
$box-bg: #fff;
$box-radius: 16px;
$box-shadow: 0 4px 24px 0 rgba(0,0,0,0.10);

.box {
  &__container {
    background: $box-bg;
    border-radius: $box-radius;
    box-shadow: $box-shadow;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>