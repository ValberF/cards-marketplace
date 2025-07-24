<template>
  <div @click="navigateHome" class="header__logo">
    <Icon name="ArrowLeftRight" :size="40" color="#2664eb" />
    <span class="header__title">Cards Marketplace</span>
  </div>
</template>

<script setup lang="ts">
import Icon from '@/components/atoms/Icon.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function navigateHome () {
  router.push('/');
}
</script>

<style lang="scss" scoped>
$header-title-font-size: 1.5rem;
$header-title-font-weight: bold;
$header-title-color: #18181b;
$header-logo-gap: 0.5rem;

.header {
  &__logo {
    display: flex;
    align-items: center;
    gap: $header-logo-gap;
    cursor: pointer;
  }

  &__title {
    font-size: $header-title-font-size;
    font-weight: $header-title-font-weight;
    color: $header-title-color;
  }
}
</style>