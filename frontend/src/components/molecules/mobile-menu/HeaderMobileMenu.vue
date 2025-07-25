<template>
  <div class="header__mobile-menu">
    <Button 
      variant="secondary" 
      @click="toggleMenu"
      class="header__mobile-toggle"
      aria-label="Toggle menu"
    >
      <Icon :name="isMenuOpen ? 'X' : 'Menu'" :size="24" />
    </Button>
    
    <MobileSidebar 
      :isOpen="isMenuOpen" 
      @close="closeMenu"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from '@/components/atoms/Button.vue';
import Icon from '@/components/atoms/Icon.vue';
import MobileSidebar from '@/components/organisms/mobile-menu/MobileSidebar.vue';

const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
}
</script>

<style lang="scss" scoped>
$mobile-breakpoint: 768px;

.header {
  &__mobile-menu {
    display: none;

    @media (max-width: $mobile-breakpoint) {
      display: block;
    }
  }

  &__mobile-toggle {
    padding: 0.5rem;
    border: none;
    background: transparent;
  }
}
</style>