import { ref } from 'vue';
import { useApi } from '@/composables/useApi';
import { useAuthStore } from '@/store/auth';
import type { User } from '@/models/User.model';

export function useLogin() {
  const { post, error } = useApi();
  const authStore = useAuthStore();
  const loginLoading = ref(false);

  async function login(email: string, password: string) {
    loginLoading.value = true;
    try {
      const data = await post<{ user: User; token: string }>('/login', { email, password });
      authStore.setUser(data.user);
      authStore.setToken(data.token);
      return true;
    } catch (e) {
      return false;
    } finally {
      loginLoading.value = false;
    }
  }

  return {
    login,
    loading: loginLoading,
    error,
  };
}