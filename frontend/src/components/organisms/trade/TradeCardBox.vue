<template>
  <Box class="trade-box" :padding="'1.5rem'">
    <div class="trade-box__header">
      <div class="trade-box__header-left">
        <span class="trade-box__user">{{ trade.user.name }}</span>
        <span class="trade-box__date">{{ formattedDate }}</span>
      </div>
      <button
        v-if="isOwner"
        class="trade-box__delete"
        @click="handleDeleteClick"
        title="Excluir troca"
      >
        <Trash :size="20" color="#ef4444" />
      </button>
    </div>
    <div class="trade-box__columns">
      <TradeCardList
        title="Oferece"
        :cards="offeringCards"
        type="OFFERING"
      />
      <TradeCardList
        title="Procura"
        :cards="receivingCards"
        type="RECEIVING"
      />
    </div>
    <ConfirmModal
      :open="showDeleteModal"
      message="Tem certeza que deseja excluir esta troca?"
      @confirm="handleConfirmDelete"
      @cancel="handleCancelDelete"
    />
  </Box>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Trash } from 'lucide-vue-next';
import Box from '@/components/atoms/Box.vue';
import TradeCardList from '@/components/molecules/trade/TradeCardList.vue';
import ConfirmModal from '../modal/ConfirmModal.vue';
import type { Trade } from '@/models/Trade.model';
import { useAuthStore } from '@/store/auth';
import { formatDate } from '@/utils/formatDate';

const props = defineProps<{
  trade: Trade;
  onDelete: (id: string) => Promise<any>;
  onAfterDelete: () => void;
}>();

const auth = useAuthStore();
const isOwner = computed(() => auth.user?.id === props.trade.userId);

const showDeleteModal = ref(false);
const deleting = ref(false);

const handleDeleteClick = () => {
  showDeleteModal.value = true;
};

const handleConfirmDelete = async () => {
  deleting.value = true;
  await props.onDelete(props.trade.id);
  props.onAfterDelete();
  showDeleteModal.value = false;
  deleting.value = false;
};

const handleCancelDelete = () => {
  showDeleteModal.value = false;
};

const offeringCards = computed(() =>
  props.trade.tradeCards.filter(tc => tc.type === 'OFFERING').map(tc => tc.card)
);

const receivingCards = computed(() =>
  props.trade.tradeCards.filter(tc => tc.type === 'RECEIVING').map(tc => tc.card)
);

const formattedDate = computed(() => formatDate(props.trade.createdAt));
</script>

<style scoped lang="scss">
$trade-box-header-margin-bottom: 1.5rem;
$trade-box-header-font-size: 1rem;
$trade-box-header-color: #888;
$trade-box-user-color: #222;
$trade-box-user-font-weight: bold;
$trade-box-columns-gap: 2rem;
$trade-box-delete-padding: 0.25rem;
$trade-box-delete-hover: #dc2626;

.trade-box {
  &__header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $trade-box-header-margin-bottom;
    font-size: $trade-box-header-font-size;
    color: $trade-box-header-color;
  }

  &__header-left {
    display: flex;
    flex-direction: column;
  }

  &__user {
    font-weight: $trade-box-user-font-weight;
    color: $trade-box-user-color;
  }

  &__columns {
    display: flex;
    gap: $trade-box-columns-gap;
    width: 100%;
    justify-content: space-between;
  }

  &__delete {
    background: none;
    border: none;
    cursor: pointer;
    padding: $trade-box-delete-padding;
    display: flex;
    align-items: center;
    transition: color 0.2s;

    &:hover svg {
      color: $trade-box-delete-hover;
    }
  }
}

@media (max-width: 600px) {
  .trade-box__columns {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>