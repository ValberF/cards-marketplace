<template>
  <header class="header">
    <HeaderLogo />
    <HeaderActions class="header__actions--desktop" />
    <HeaderMobileMenu />
  </header>
</template>

<script setup lang="ts">
import HeaderLogo from '@/components/molecules/header/HeaderLogo.vue';
import HeaderActions from '@/components/molecules/header/HeaderActions.vue';
import HeaderMobileMenu from '@/components/molecules/mobile-menu/HeaderMobileMenu.vue';
</script>

<style lang="scss" scoped>
$header-height: 10vh;
$header-padding: 1rem 7rem;
$header-padding-mobile: 1rem 1.5rem;
$header-bg: #fff;
$header-shadow: 0 2px 8px rgba(0,0,0,0.05);
$mobile-breakpoint: 768px;

.header {
  width: 100%;
  height: $header-height;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $header-padding;
  background: $header-bg;
  box-shadow: $header-shadow;
  position: sticky;
  top: 0;
  z-index: 10;

  &__actions--desktop {
    @media (max-width: $mobile-breakpoint) {
      display: none;
    }
  }

  @media (max-width: $mobile-breakpoint) {
    padding: $header-padding-mobile;
  }
}
</style>