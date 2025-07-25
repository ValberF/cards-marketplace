<template>
  <div class="header__actions">
    <template v-if="isMobile">
      <Button variant="secondary" @click="drawerOpen = true" aria-label="Abrir menu">
        <Icon name="Menu" :size="28" />
      </Button>
      <SideDrawer :open="drawerOpen" @close="drawerOpen = false">
        <div class="drawer__actions">
          <template v-if="isLoggedIn">
            <Button variant="secondary" @click="goAndClose(onHome)">Início</Button>
            <Button variant="secondary" @click="goAndClose(onCards)">Cartas</Button>
            <Button variant="secondary" @click="goAndClose(onUserCards)">Suas cartas</Button>
            <Button @click="goAndClose(onLogout)">Sair</Button>
          </template>
          <template v-else>
            <Button variant="secondary" @click="goAndClose(onLogin)">Login</Button>
            <Button @click="goAndClose(onRegister)">Registrar</Button>
          </template>
        </div>
      </SideDrawer>
    </template>

    <template v-else>
      <template v-if="isLoggedIn">
        <Button variant="secondary" @click="onHome">Início</Button>
        <Button variant="secondary" @click="onCards">Cartas</Button>
        <Button variant="secondary" @click="onUserCards">Suas cartas</Button>
        <Button @click="onLogout">Sair</Button>
      </template>
      <template v-else>
        <Button variant="secondary" @click="onLogin">Login</Button>
        <Button @click="onRegister">Registrar</Button>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '@/store/auth';
import Button from '@/components/atoms/Button.vue';
import Icon from '@/components/atoms/Icon.vue';
import SideDrawer from '@/components/molecules/SideDrawer.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const auth = useAuthStore();
const isLoggedIn = computed(() => !!auth.token);

const drawerOpen = ref(false);
const isMobile = ref(false);

function handleResize() {
  isMobile.value = window.innerWidth <= 768;
}

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

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

function goAndClose(fn: () => void) {
  return () => {
    fn();
    drawerOpen.value = false;
  };
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

.drawer__actions {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: 2rem;
}
</style>