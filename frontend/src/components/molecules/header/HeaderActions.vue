<template>
  <div class="header__actions">
    <template v-if="isLoggedIn">
      <Button variant="secondary" @click="onHome">
        Início
      </Button>
      <Button variant="secondary" @click="onCards">
        Cartas
      </Button>
      <Button variant="secondary" @click="onUserCards">
        Suas cartas
      </Button>
      <Button @click="onLogout">
        Sair
      </Button>
    </template>
    <template v-else>
      <Button variant="secondary" @click="onLogin">
        Login
      </Button>
      <Button @click="onRegister">
        Registrar
      </Button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/store/auth';
import Button from '@/components/atoms/Button.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const auth = useAuthStore();
const isLoggedIn = computed(() => !!auth.token);

function onHome() {
  router.push('/');
}

function onLogin() {
  router.push('/login');
}

function onRegister() {
  router.push('/register');
}

function onCards() {
  router.push('/cards');
}

function onUserCards() {
  router.push('/user-cards');
}

function onLogout() {
  auth.logout();
  router.push('/');
}
</script>

<style lang="scss" scoped>
$header-actions-gap: 1rem;

.header {
  &__actions {
    display: flex;
    align-items: center;
    gap: $header-actions-gap;
  }
}
</style>