<template>
  <Icon :name="direction === 'left' ? 'ChevronLeft' : 'ChevronRight'" :size="16"/>
</template>

<script setup lang="ts">
import Icon from '../Icon.vue';

defineProps<{
  direction: 'left' | 'right';
}>();
</script>