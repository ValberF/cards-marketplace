<template>
  <div v-if="open" class="user-cards-modal">
    <div class="user-cards-modal__backdrop" @click.self="onCancel"></div>
    <div class="user-cards-modal__content">
      <h2 class="user-cards-modal__title">{{ title }}</h2>
      <div v-if="userCards">
        <label>Cartas que você oferece</label>
        <Multiselect
          v-model="offering"
          :options="userCards"
          label="name"
          value="id"
          placeholder="Selecione as cartas para oferecer"
        />
      </div>
      <div v-if="allCards" style="margin-top: 1rem;">
        <label>Cartas que você quer receber</label>
        <Multiselect
          v-model="receiving"
          :options="allCards"
          label="name"
          value="id"
          placeholder="Selecione as cartas que deseja receber"
        />
      </div>
      <div v-if="options" style="margin-top: 1rem;">
        <Multiselect
          v-model="selected"
          :options="options"
          label="name"
          value="id"
          placeholder="Selecione as cartas"
        />
      </div>
      <div class="user-cards-modal__actions">
        <Button variant="secondary" @click="onCancel">Cancelar</Button>
        <Button
          variant="primary"
          @click="onSave"
          :disabled="isSaveDisabled"
        >Salvar</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits, computed } from 'vue';
import Multiselect from '@/components/atoms/form/Multiselect.vue';
import Button from '@/components/atoms/Button.vue';
import type { Card } from '@/models/Card.model';

const props = defineProps<{
  open: boolean;
  title?: string;
  userCards?: Card[];
  allCards?: Card[];
  options?: Card[];
  initialOffering?: string[];
  initialReceiving?: string[];
  initialSelected?: string[];
}>();

const emit = defineEmits<{
  (e: 'cancel'): void;
  (e: 'save', ...args: any[]): void;
}>();

const offering = ref<string[]>(props.initialOffering ? [...props.initialOffering] : []);
const receiving = ref<string[]>(props.initialReceiving ? [...props.initialReceiving] : []);
const selected = ref<string[]>(props.initialSelected ? [...props.initialSelected] : []);

watch(
  () => props.open,
  (val) => {
    if (val) {
      offering.value = props.initialOffering ? [...props.initialOffering] : [];
      receiving.value = props.initialReceiving ? [...props.initialReceiving] : [];
      selected.value = props.initialSelected ? [...props.initialSelected] : [];
    }
  }
);

const isSaveDisabled = computed(() => {
  if (props.userCards && props.allCards) {
    return !offering.value.length || !receiving.value.length;
  }
  if (props.options) {
    return !selected.value.length;
  }
  return true;
});

function onCancel() {
  emit('cancel');
}
function onSave() {
  if (props.userCards && props.allCards) {
    emit('save', offering.value, receiving.value);
  } else if (props.options) {
    emit('save', selected.value);
  }
}
</script>

<style lang="scss" scoped>
$user-cards-modal-radius: 10px;
$user-cards-modal-bg: #fff;
$user-cards-modal-shadow: 0 2px 16px rgba(0,0,0,0.18);
$user-cards-modal-backdrop: rgba(0,0,0,0.35);
$user-cards-modal-padding: 2rem 2.5rem 1.5rem 2.5rem;
$user-cards-modal-title-size: 1.2rem;
$user-cards-modal-title-weight: 600;
$user-cards-modal-title-margin: 1.2rem;
$user-cards-modal-actions-margin: 1.5rem;
$modal-actions-gap: 1rem;

.user-cards-modal {
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;

  &__backdrop {
    position: absolute;
    inset: 0;
    background: $user-cards-modal-backdrop;
  }

  &__content {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: $user-cards-modal-bg;
    border-radius: $user-cards-modal-radius;
    padding: $user-cards-modal-padding;
    min-width: 30%;
    min-height: 30%;
    box-shadow: $user-cards-modal-shadow;
    z-index: 1;
  }

  &__title {
    margin-bottom: $user-cards-modal-title-margin;
    font-size: $user-cards-modal-title-size;
    font-weight: $user-cards-modal-title-weight;
    text-align: center;
  }

  &__actions {
    display: flex;
    justify-content: center;
    margin-top: $user-cards-modal-actions-margin;
    gap: $modal-actions-gap;
  }
}
</style>