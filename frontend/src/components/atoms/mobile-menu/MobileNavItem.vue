<template>
  <button 
    class="mobile-nav-item"
    :class="[
      `mobile-nav-item--${variant}`
    ]"
    @click="$emit('click')"
  >
    <span class="mobile-nav-item__label">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  icon: string;
  label: string;
  variant?: 'default' | 'primary' | 'danger';
}

withDefaults(defineProps<Props>(), {
  variant: 'default'
});

defineEmits<{
  click: [];
}>();
</script>

<style lang="scss" scoped>
$item-padding: 1rem;
$item-radius: 0.5rem;
$item-transition: all 0.2s ease;

// Colors
$default-color: #374151;
$default-bg-hover: #f3f4f6;
$primary-color: #2664eb;
$primary-bg-hover: #eff6ff;
$danger-color: #dc2626;
$danger-bg-hover: #fef2f2;

.mobile-nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: $item-padding;
  border: none;
  border-radius: $item-radius;
  background: transparent;
  text-align: left;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: $item-transition;
  
  &__label {
    flex: 1;
  }
  
  // Variants
  &--default {
    color: $default-color;
    
    &:hover {
      background: $default-bg-hover;
    }
  }
  
  &--primary {
    color: $primary-color;
    
    &:hover {
      background: $primary-bg-hover;
    }
  }
  
  &--danger {
    color: $danger-color;
    
    &:hover {
      background: $danger-bg-hover;
    }
  }
  
  &:active {
    transform: scale(0.98);
  }
}
</style>