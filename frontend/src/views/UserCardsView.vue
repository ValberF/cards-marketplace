<template>
  <div class="user-cards">
    <Button @click="openModal = true">Adicionar cartas</Button>
    <div v-if="!userCards.length" class="user-cards__empty">
      Sem cartas
    </div>
    <div v-else class="user-cards__container">
      <Card
        v-for="card in userCards"
        :key="card.id"
        v-bind="card"
      />
    </div>
    <UserCardsSelectModal
      :open="openModal"
      :options="allCards"
      @cancel="openModal = false"
      @save="handleSave"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCards } from '@/composables/useCards';
import UserCardsSelectModal from '@/components/organisms/modal/UserCardsSelectModal.vue';
import Card from '@/components/organisms/card/Card.vue';
import Button from '@/components/atoms/Button.vue';

const { allCards, userCards, addUserCards, refetchUserCards } = useCards();
const openModal = ref(false);

async function handleSave(cardIds: string[]) {
  await addUserCards({ cardIds });
  await refetchUserCards();
  openModal.value = false;
}
</script>

<style lang="scss" scoped>
$cards-padding: 30px 10%;
$cards-gap: 24px;
$card-min-width: 280px;
$pagination-margin-top: 10px;

.user-cards {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  padding: $cards-padding;
  min-height: 90vh;

  &__container {
    display: grid;
    gap: $cards-gap;
    grid-template-columns: repeat(auto-fit, minmax($card-min-width, 1fr));
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
  }

  @media (min-width: 1200px) {
    &__container {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  &__empty {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: #888;
  }
}
</style>