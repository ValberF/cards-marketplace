<template>
  <div class="card">
    <CardImage :src="imageUrl" :alt="name" />
    <div class="card__body">
      <CardContent :name="name" :description="description" :createdAt="createdAt" />
      <Button v-if="showAddButton" @click="handleAdd">Adicionar</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import CardImage from '@/components/atoms/card/CardImage.vue';
import Button from '@/components/atoms/Button.vue';
import CardContent from '@/components/molecules/card/CardContent.vue';

const props = defineProps<{
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  showAddButton?: boolean;
}>();

const emit = defineEmits<{
  (e: 'add', id: string): void;
}>();

function handleAdd() {
  emit('add', props.id);
}
</script>

<style lang="scss" scoped>
$card-radius: 8px;
$card-shadow: 0 2px 8px rgba(0,0,0,0.1);
$card-bg: #fff;
$card-body-padding: 1rem;

.card {
  width: 100%;
  border-radius: $card-radius;
  box-shadow: $card-shadow;
  background: $card-bg;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &__body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: $card-body-padding;
  }
}
</style>