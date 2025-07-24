import { computed, ref } from 'vue';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import type { Card, CardsResponse, PostUserCardsBody } from '@/models/Card.model';
import { useApi } from '@/composables/useApi';

export function useCards() {
  const page = ref(1);
  const rpp = ref(10);
  const queryClient = useQueryClient();
  const { get, post } = useApi();

  const {
    data: cardsData,
    isLoading: cardsLoading,
    error: cardsError,
    refetch: refetchCards
  } = useQuery({
    queryKey: ['cards', { page, rpp }],
    queryFn: async () => {
      return await get<CardsResponse>('/cards', {
        params: { page: page.value, rpp: rpp.value }
      });
    },
    staleTime: 3 * 60 * 1000,
  });

  const {
    data: allCardsData,
    isLoading: allCardsLoading,
    error: allCardsError
  } = useQuery({
    queryKey: ['cards', 'all'],
    queryFn: async () => {
      return await get<CardsResponse>('/cards', {
        params: { page: 1, rpp: 9999 }
      });
    },
    staleTime: 10 * 60 * 1000,
  });

  const {
    data: userCardsData,
    isLoading: userCardsLoading,
    error: userCardsError,
    refetch: refetchUserCards
  } = useQuery({
    queryKey: ['userCards'],
    queryFn: async () => {
      return await get<Card[]>('/me/cards');
    },
    staleTime: 2 * 60 * 1000, 
  });

  const addUserCardsMutation = useMutation({
    mutationFn: async (body: PostUserCardsBody) => {
      return await post('/me/cards', body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userCards'] });
      queryClient.invalidateQueries({ queryKey: ['cards', 'all'] });
    },
    onError: (error) => {
      console.error('Erro ao adicionar cartas:', error);
    }
  });

  const cards = computed(() => cardsData.value?.list || []);
  const more = computed(() => cardsData.value?.more || false);
  const allCards = computed(() => allCardsData.value?.list || []);
  const userCards = computed(() => userCardsData.value || []);

  const loading = computed(() => 
    cardsLoading.value || allCardsLoading.value || userCardsLoading.value || addUserCardsMutation.isPending.value
  );

  const error = computed(() => 
    cardsError.value || allCardsError.value || userCardsError.value || addUserCardsMutation.error.value
  );

  const nextPage = () => {
    if (more.value) page.value++;
  };

  const prevPage = () => {
    if (page.value > 1) page.value--;
  };

  const addUserCards = async (body: PostUserCardsBody) => {
    try {
      const result = await addUserCardsMutation.mutateAsync(body);
      return result;
    } catch (error) {
      return false;
    }
  };

  const invalidateCards = () => {
    queryClient.invalidateQueries({ queryKey: ['cards'] });
  };

  const prefetchNextPage = () => {
    if (more.value) {
      queryClient.prefetchQuery({
        queryKey: ['cards', { page: page.value + 1, rpp }],
        queryFn: async () => {
          return await get<CardsResponse>('/cards', {
            params: { page: page.value + 1, rpp: rpp.value }
          });
        },
        staleTime: 3 * 60 * 1000,
      });
    }
  };

  return {
    cards,
    allCards,
    userCards,
    page,
    rpp,
    more,
    loading,
    error,
    cardsLoading,
    allCardsLoading,
    userCardsLoading,
    addUserCards,
    nextPage,
    prevPage,
    refetchCards,
    refetchUserCards,
    invalidateCards,
    prefetchNextPage,
    isAddingCards: computed(() => addUserCardsMutation.isPending.value),
    addCardsError: computed(() => addUserCardsMutation.error.value),
  };
}