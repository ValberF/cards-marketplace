<template>
  <Teleport to="body">
    <div v-if="isOpen" class="mobile-sidebar">
      <div 
        class="mobile-sidebar__overlay" 
        @click="$emit('close')"
      ></div>
      
      <nav class="mobile-sidebar__content">
        <div class="mobile-sidebar__header">
          <div class="mobile-sidebar__logo">
            <Icon name="ArrowLeftRight" :size="32" color="#2664eb" />
            <span class="mobile-sidebar__title">Cards Marketplace</span>
          </div>
          <Button 
            variant="secondary" 
            @click="$emit('close')"
            class="mobile-sidebar__close"
            aria-label="Close menu"
          >
            <Icon name="X" :size="24" />
          </Button>
        </div>
        
        <div class="mobile-sidebar__nav">
          <MobileNavigation @navigate="$emit('close')" />
        </div>
      </nav>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import Button from '@/components/atoms/Button.vue';
import Icon from '@/components/atoms/Icon.vue';
import MobileNavigation from '@/components/molecules/mobile-menu/MobileNavigation.vue';

interface Props {
  isOpen: boolean;
}

defineProps<Props>();
defineEmits<{
  close: [];
}>();
</script>

<style lang="scss" scoped>
$sidebar-width: 280px;
$sidebar-bg: #fff;
$sidebar-shadow: 0 4px 16px rgba(0,0,0,0.15);
$overlay-bg: rgba(0,0,0,0.5);
$border-color: #e4e4e7;
$header-height: 80px;

.mobile-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  
  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $overlay-bg;
    backdrop-filter: blur(2px);
  }
  
  &__content {
    position: absolute;
    top: 0;
    right: 0;
    width: $sidebar-width;
    height: 100%;
    background: $sidebar-bg;
    box-shadow: $sidebar-shadow;
    transform: translateX(0);
    animation: slideIn 0.3s ease-out;
    display: flex;
    flex-direction: column;
  }
  
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    border-bottom: 1px solid $border-color;
    height: $header-height;
    min-height: $header-height;
  }
  
  &__logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  &__title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #18181b;
  }
  
  &__close {
    padding: 0.5rem;
    border: none;
    background: transparent;
  }
  
  &__nav {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

// Prevent body scroll when sidebar is open
:global(body.mobile-sidebar-open) {
  overflow: hidden;
}
</style>