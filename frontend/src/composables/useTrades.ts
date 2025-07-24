import { computed, ref } from 'vue';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import type { TradesResponse, PostTradeBody } from '@/models/Trade.model';
import { useApi } from '@/composables/useApi';

export function useTrades() {
  const page = ref(1);
  const rpp = ref(10);
  const queryClient = useQueryClient();
  const { get, post, del } = useApi();

  const {
    data: tradesData,
    isLoading: tradesLoading,
    error: tradesError,
    refetch: refetchTrades,
  } = useQuery({
    queryKey: ['trades', { page, rpp }],
    queryFn: async () => {
      return await get<TradesResponse>('/trades', {
        params: { page: page.value, rpp: rpp.value }
      });
    },
    staleTime: 3 * 60 * 1000,
  });

  const createTradeMutation = useMutation({
    mutationFn: async (body: PostTradeBody) => {
      return await post('/trades', body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trades'] });
    },
    onError: (error) => {
      console.error('Erro ao criar trade:', error);
    }
  });

  const deleteTradeMutation = useMutation({
    mutationFn: async (id: string) => {
      return await del(`/trades/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trades'] });
    },
    onError: (error) => {
      console.error('Erro ao deletar trade:', error);
    }
  });

  const trades = computed(() => tradesData.value?.list || []);
  const more = computed(() => tradesData.value?.more || false);

  const loading = computed(() =>
    tradesLoading.value ||
    createTradeMutation.isPending.value ||
    deleteTradeMutation.isPending.value
  );

  const error = computed(() =>
    tradesError.value ||
    createTradeMutation.error.value ||
    deleteTradeMutation.error.value
  );

  const nextPage = () => {
    if (more.value) page.value++;
  };

  const prevPage = () => {
    if (page.value > 1) page.value--;
  };

  const createTrade = async (body: PostTradeBody) => {
    try {
      return await createTradeMutation.mutateAsync(body);
    } catch (error) {
      return false;
    }
  };

  const deleteTrade = async (id: string) => {
    try {
      await deleteTradeMutation.mutateAsync(id);
      return true;
    } catch (error) {
      return false;
    }
  };

  const invalidateTrades = () => {
    queryClient.invalidateQueries({ queryKey: ['trades'] });
  };

  return {
    trades,
    page,
    rpp,
    more,
    loading,
    error,
    tradesLoading,
    nextPage,
    prevPage,
    refetchTrades,
    createTrade,
    deleteTrade,
    invalidateTrades,
    isCreatingTrade: computed(() => createTradeMutation.isPending.value),
    createTradeError: computed(() => createTradeMutation.error.value),
    isDeletingTrade: computed(() => deleteTradeMutation.isPending.value),
    deleteTradeError: computed(() => deleteTradeMutation.error.value),
  };
}