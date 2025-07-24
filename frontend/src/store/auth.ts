import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/models/User.model'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)

  function setUser(u: User) {
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