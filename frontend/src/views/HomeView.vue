<template>
  <div class="home">
    <div class="home__header">
      <h1 class="home__title">Marketplace de Troca de Cartas</h1>
      <span class="home__subtitle">
        Encontre as cartas que você procura e troque com outros colecionadores
      </span>
    </div>
    
    <div class="home__content">
      <div class="home__actions" v-if="auth.user">
        <Button @click="openModal = true" class="home__add-button">
          <Icon name="Plus" :size="18" />
          <span class="home__add-text">Adicionar pedido de troca</span>
        </Button>
      </div>
      
      <div class="home__section">
        <h2 class="home__section-title">Solicitações de trocas abertas</h2>
        
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
      </div>
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
import Icon from '@/components/atoms/Icon.vue'
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
$desktop: 1200px;
$tablet: 768px;
$mobile: 480px;
$padding-desktop: 2rem 8rem;
$padding-tablet: 2rem 3rem;
$padding-mobile: 1.5rem 1rem;
$section-gap: 3rem;
$section-gap-mobile: 2rem;
$text-primary: #1f2937;
$text-secondary: #6b7280;
$border-color: #e5e7eb;

.home {
  min-height: calc(100vh - 10vh);
  padding: $padding-desktop;
  
  @media (max-width: $desktop) {
    padding: $padding-tablet;
  }
  
  @media (max-width: $tablet) {
    padding: $padding-mobile;
  }
  
  &__header {
    text-align: center;
    margin-bottom: $section-gap;
    
    @media (max-width: $tablet) {
      margin-bottom: $section-gap-mobile;
    }
  }
  
  &__title {
    font-size: 2.5rem;
    font-weight: 700;
    color: $text-primary;
    margin: 0 0 1rem 0;
    line-height: 1.2;
    
    @media (max-width: $tablet) {
      font-size: 2rem;
    }
    
    @media (max-width: $mobile) {
      font-size: 1.75rem;
      line-height: 1.3;
    }
  }
  
  &__subtitle {
    font-size: 1.25rem;
    color: $text-secondary;
    line-height: 1.5;
    max-width: 600px;
    margin: 0 auto;
    
    @media (max-width: $tablet) {
      font-size: 1.125rem;
    }
    
    @media (max-width: $mobile) {
      font-size: 1rem;
      padding: 0 1rem;
    }
  }
  
  &__content {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }
  
  &__actions {
    margin-bottom: 2rem;
    
    @media (max-width: $tablet) {
      text-align: center;
    }
  }
  
  &__add-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 500;
    
    @media (max-width: $mobile) {
      width: 100%;
      justify-content: center;
      padding: 1rem;
    }
  }
  
  &__add-text {
    @media (max-width: $mobile) {
      font-size: 0.9rem;
    }
  }
  
  &__section {
    &-title {
      font-size: 1.75rem;
      font-weight: 600;
      color: $text-primary;
      margin: 0 0 1.5rem 0;
      
      @media (max-width: $tablet) {
        font-size: 1.5rem;
        text-align: center;
      }
      
      @media (max-width: $mobile) {
        font-size: 1.25rem;
        margin-bottom: 1rem;
      }
    }
  }
  
  &__pagination {
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    
    @media (max-width: $mobile) {
      margin-bottom: 1.5rem;
    }
  }
  
  &__trades-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    
    @media (max-width: $mobile) {
      gap: 1rem;
    }
  }
  
  &__trade {
    width: 100%;
    max-width: 800px;
    
    @media (max-width: $tablet) {
      max-width: none;
    }
  }
}

.home__trades-list:empty::before {
  display: block;
  text-align: center;
  color: $text-secondary;
  font-size: 1.125rem;
  padding: 3rem 1rem;
  border: 2px dashed $border-color;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 600px;
}
</style>