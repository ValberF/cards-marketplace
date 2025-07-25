<template>
  <div @click="navigateHome" class="header__logo">
    <Icon name="ArrowLeftRight" :size="iconSize" color="#2664eb" />
    <span class="header__title">{{ titleText }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import Icon from '@/components/atoms/Icon.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const screenWidth = ref(window.innerWidth);

const iconSize = computed(() => screenWidth.value <= 768 ? 32 : 40);
const titleText = computed(() => screenWidth.value <= 480 ? 'Cards' : 'Cards Marketplace');

function navigateHome() {
  router.push('/');
}

function updateScreenWidth() {
  screenWidth.value = window.innerWidth;
}

onMounted(() => {
  window.addEventListener('resize', updateScreenWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenWidth);
});
</script>

<style lang="scss" scoped>
$header-title-font-size: 1.5rem;
$header-title-font-size-mobile: 1.25rem;
$header-title-font-weight: bold;
$header-title-color: #18181b;
$header-logo-gap: 0.5rem;
$mobile-breakpoint: 768px;
$small-mobile-breakpoint: 480px;

.header {
  &__logo {
    display: flex;
    align-items: center;
    gap: $header-logo-gap;
    cursor: pointer;
    transition: transform 0.2s ease;
    
    &:hover {
      transform: scale(1.02);
    }
    
    &:active {
      transform: scale(0.98);
    }
  }
  
  &__title {
    font-size: $header-title-font-size;
    font-weight: $header-title-font-weight;
    color: $header-title-color;
    white-space: nowrap;
    
    @media (max-width: $mobile-breakpoint) {
      font-size: $header-title-font-size-mobile;
    }
    
    @media (max-width: $small-mobile-breakpoint) {
      font-size: 1.125rem;
    }
  }
}
</style>