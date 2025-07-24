<template>
  <div class="home">
    <h1>Marketplace de Troca de Cartas</h1>
    <span class="home__subtitle">
      Encontre as cartas que você procura e troque com outros colecionadores
    </span>
    <div class="home__add-trade" v-if="auth.user">
      <Button @click="openModal = true">Adicionar pedido de troca</Button>
    </div>
    <h2>Solicitações de trocas abertas</h2>
    <div class="home__pagination">
      <Pagination
        :current-page="page"
        :items-per-page="rpp"
        :total-items="trades.length"
        :has-more="more"
        :loading="loading"
        :error="!!error"
        @update:page="page = $event"
        @update:items-per-page="rpp = $event"
        @next-page="nextPage"
        @prev-page="prevPage"
      />
    </div>
    <div class="home__trades-list">
      <TradeCardBox
        v-for="trade in trades"
        :key="trade.id"
        :trade="trade"
        :onDelete="deleteTrade"
        :onAfterDelete="refetchTrades"
        class="home__trade"
      />
    </div>
    <UserCardsSelectModal
      :open="openModal"
      :userCards="userCards"
      :allCards="allCards"
      @cancel="openModal = false"
      @save="handleSave"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/atoms/Button.vue'
import UserCardsSelectModal from '@/components/organisms/modal/UserCardsSelectModal.vue'
import TradeCardBox from '@/components/organisms/trade/TradeCardBox.vue'
import Pagination from '@/components/organisms/pagination/Pagination.vue'
import { useCards } from '@/composables/useCards'
import { useTrades } from '@/composables/useTrades'
import { useAuthStore } from '@/store/auth'

const auth = useAuthStore()
const openModal = ref(false)

const { userCards, allCards } = useCards()
const {
  trades,
  page,
  rpp,
  more,
  loading,
  error,
  refetchTrades,
  nextPage,
  prevPage,
  createTrade,
  deleteTrade,
} = useTrades()

async function handleSave(offering: string[], receiving: string[]) {
  const cards = [
    ...offering.map(cardId => ({ cardId, type: 'OFFERING' as const })),
    ...receiving.map(cardId => ({ cardId, type: 'RECEIVING' as const })),
  ]
  await createTrade({ cards })
  openModal.value = false
}
</script>

<style lang="scss" scoped>
$cards-padding: 30px 220px;
$subtitle-margin-top: 10px;
$add-trade-margin-top: 50px;
$pagination-margin-top: 15px;

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $cards-padding;

  &__subtitle {
    font-size: 20px;
    margin-top: $subtitle-margin-top;
  }

  &__add-trade {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    margin-top: $add-trade-margin-top;
  }

  h2 {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    margin-top: $add-trade-margin-top;
  }

  &__pagination {
    width: 100%;
    margin-top: $pagination-margin-top;
    display: flex;
    justify-content: center;
  }

  &__trades-list {
    width: 100%;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }

  &__trade {
    width: 100%;
    max-width: 700px;
  }
}
</style>