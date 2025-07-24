<template>
  <div class="cards">
    <div class="cards__container">
      <Card
        v-for="card in cards"
        :key="card.id"
        v-bind="card"
        showAddButton
        @add="openConfirm(card.id)"
      />
    </div>
    <div class="cards__pagination">
      <Pagination
        :current-page="page"
        :items-per-page="rpp"
        :total-items="cards.length"
        :has-more="more"
        :loading="loading"
        :error="!!error"
        @update:page="page = $event"
        @update:items-per-page="rpp = $event"
        @next-page="nextPage"
        @prev-page="prevPage"
      />
    </div>
    <ConfirmModal
      :open="showModal"
      message="Tem certeza que deseja adicionar esta carta?"
      @confirm="confirmAdd"
      @cancel="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCards } from '@/composables/useCards';
import Pagination from '@/components/organisms/pagination/Pagination.vue';
import Card from '@/components/organisms/card/Card.vue';
import ConfirmModal from '@/components/organisms/modal/ConfirmModal.vue';

const {
  cards,
  addUserCards,
  page,
  rpp,
  more,
  loading,
  error,
  nextPage,
  prevPage,
} = useCards();

const showModal = ref(false);
const selectedId = ref<string | null>(null);

function openConfirm(id: string) {
  selectedId.value = id;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  selectedId.value = null;
}

async function confirmAdd() {
  if (selectedId.value) {
    await addUserCards({ cardIds: [selectedId.value] });
  }
  closeModal();
}
</script>

<style lang="scss" scoped>
$cards-padding: 30px 100px;
$cards-gap: 24px;
$card-min-width: 220px;
$pagination-margin-top: 10px;

.cards {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $cards-padding;

  &__container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax($card-min-width, 1fr));
    gap: $cards-gap;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
  }

  @media (min-width: 1200px) {
    &__container {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  &__pagination {
    width: 100%;
    max-width: 1400px;
    margin: $pagination-margin-top auto 0 auto;
    display: flex;
    justify-content: center;
  }
}
</style>