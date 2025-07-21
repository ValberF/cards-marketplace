import { ref, watch } from 'vue'
import type { Trade, TradesResponse, PostTradeBody } from '@/models/Trade.model'
import { useApi } from '@/composables/useApi'

export function useTrades() {
  const trades = ref<Trade[]>([])
  const page = ref(1)
  const rpp = ref(10)
  const more = ref(false)

  const { get, post, loading, error } = useApi()

  const fetchTrades = async () => {
    try {
      const data = await get<TradesResponse>('/trades', {
        params: { page: page.value, rpp: rpp.value }
      })
      if (data) {
        trades.value = data.list
        more.value = data.more
      }
    } catch (e) {
      trades.value = []
      more.value = false
    }
  }

  const nextPage = () => {
    if (more.value) page.value++
  }

  const prevPage = () => {
    if (page.value > 1) page.value--
  }

  watch([page, rpp], fetchTrades, { immediate: true })

  const createTrade = async (body: PostTradeBody) => {
    try {
      return await post('/trades', body)
    } catch (e) {
      return false
    }
  }

  return {
    trades,
    page,
    rpp,
    more,
    loading,
    error,
    fetchTrades,
    nextPage,
    prevPage,
    createTrade,
  }
}