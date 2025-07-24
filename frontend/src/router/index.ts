import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import RegisterView from '@/views/RegisterView.vue';
import CardsView from '@/views/CardsView.vue';
import UserCardsView from '@/views/UserCardsView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', component: HomeView },
      { path: '/cards', component: CardsView, meta: { requiresAuth: true } },
      { path: '/user-cards', component: UserCardsView, meta: { requiresAuth: true } },
    ]
  },
  {
    path: '/',
    component: AuthLayout,
    children: [
      { path: '/login', component: LoginView },
      { path: '/register', component: RegisterView },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.token) {
    next({ path: '/login' });
  } else {
    next();
  }
});

export default router;