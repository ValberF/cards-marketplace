<template>
  <header class="header">
    <HeaderLogo />
    <HeaderActions />
  </header>
</template>

<script setup lang="ts">
import HeaderLogo from '@/components/molecules/header/HeaderLogo.vue';
import HeaderActions from '@/components/molecules/header/HeaderActions.vue';
</script>

<style lang="scss" scoped>
$header-height: 10vh;
$header-padding: 1rem 7rem;
$header-bg: #fff;
$header-shadow: 0 2px 8px rgba(0,0,0,0.05);

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
}
</style>