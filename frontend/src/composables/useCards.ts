import { ref, watch } from 'vue'
import type { Card, CardsResponse, PostUserCardsBody } from '@/models/Card.model'
import { useApi } from '@/composables/useApi'

export function useCards() {
  const cards = ref<Card[]>([])
  const page = ref(1)
  const rpp = ref(9)
  const more = ref(false)

  const { get, post, loading, error } = useApi()

  const fetchCards = async () => {
    try {
      const data = await get<CardsResponse>('/cards', {
        params: { page: page.value, rpp: rpp.value }
      })
      if (data) {
        cards.value = data.list
        more.value = data.more
      }
    } catch (e) {
      cards.value = []
      more.value = false
    }
  }

  const nextPage = () => {
    if (more.value) page.value++
  }

  const prevPage = () => {
    if (page.value > 1) page.value--
  }

  watch([page, rpp], fetchCards, { immediate: true })

  const addUserCards = async (body: PostUserCardsBody) => {
    try {
      return await post('/me/cards', body)
    } catch (e) {
      return false
    }
  }

  return {
    cards,
    page,
    rpp,
    more,
    loading,
    error,
    fetchCards,
    nextPage,
    prevPage,
    addUserCards,
  }
}