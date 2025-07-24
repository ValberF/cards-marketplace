<template>
  <span class="icon">
    <component
      :is="iconComponent"
      v-if="iconComponent"
      :size="size"
      :color="color"
    />
  </span>
</template>

<script setup lang="ts">
import * as icons from 'lucide-vue-next';
import { computed } from 'vue';

const props = defineProps<{
  name: keyof typeof icons;
  size?: number;
  color?: string;
}>();

const iconComponent = computed(() => icons[props.name] as any);
const size = computed(() => props.size ?? 24);
const color = computed(() => props.color ?? 'currentColor');
</script>

<style lang="scss" scoped>
.icon {
  display: flex;
  align-items: center;
}
</style>