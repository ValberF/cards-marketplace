<template>
  <transition name="drawer-fade">
    <div v-if="open" class="side-drawer__overlay" @click.self="$emit('close')">
      <aside class="side-drawer">
        <div class="side-drawer__header">
          <Button variant="secondary" @click="$emit('close')" aria-label="Fechar menu">
            <Icon name="X" :size="24" />
          </Button>
        </div>
        <div class="side-drawer__content">
          <slot />
        </div>
      </aside>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps<{ open: boolean }>();
import Button from '@/components/atoms/Button.vue';
import Icon from '@/components/atoms/Icon.vue';
</script>

<style lang="scss" scoped>
.side-drawer__overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.25);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
}

.side-drawer {
  width: 260px;
  max-width: 80vw;
  height: 100%;
  background: #fff;
  box-shadow: -2px 0 8px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  animation: slideIn 0.2s;
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

.side-drawer__header {
  display: flex;
  justify-content: flex-end;
  padding: 1rem 1rem 0.5rem 1rem;
}

.side-drawer__content {
  flex: 1;
  padding: 0 1.5rem 2rem 1.5rem;
  overflow-y: auto;
}

.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.2s;
}
.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}
</style>