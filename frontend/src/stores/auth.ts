import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IUser } from '@/interfaces/IUser'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<IUser | null>(null)
  const token = ref<string | null>(null)

  function setUser(u: IUser) {
    user.value = u
  }

  function setToken(t: string) {
    token.value = t
  }

  function logout() {
    user.value = null
    token.value = null
  }

  return { user, token, setUser, setToken, logout }
}, {
  persist: true
})