<template>
  <div v-if="open" class="modal__backdrop">
    <div class="modal__content">
      <p class="modal__message">{{ message }}</p>
      <div class="modal__actions">
        <Button variant="secondary" @click="onCancel">Cancelar</Button>
        <Button variant="primary" @click="onConfirm">Confirmar</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import Button from '@/components/atoms/Button.vue';

defineProps<{
  open: boolean;
  message: string;
}>();

const emit = defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();

function onConfirm() {
  emit('confirm');
}
function onCancel() {
  emit('cancel');
}
</script>

<style scoped lang="scss">
$modal-backdrop-bg: rgba(0,0,0,0.3);
$modal-radius: 8px;
$modal-bg: #fff;
$modal-padding: 2rem;
$modal-min-width: 320px;
$modal-shadow: 0 2px 16px rgba(0,0,0,0.15);
$modal-message-margin: 1.5rem;
$modal-message-font-size: 1.1rem;
$modal-actions-gap: 1rem;
$mobile-breakpoint: 768px;

.modal {
  &__backdrop {
    position: fixed;
    inset: 0;
    background: $modal-backdrop-bg;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  &__content {
    background: $modal-bg;
    border-radius: $modal-radius;
    padding: $modal-padding;
    min-width: $modal-min-width;
    box-shadow: $modal-shadow;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: $mobile-breakpoint) {
      width: 300px;
    }
  }

  &__message {
    margin-bottom: $modal-message-margin;
    font-size: $modal-message-font-size;
    text-align: center;
  }

  &__actions {
    display: flex;
    gap: $modal-actions-gap;
  }
}
</style>