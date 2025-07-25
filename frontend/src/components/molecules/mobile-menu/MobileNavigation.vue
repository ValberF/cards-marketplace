<template>
  <nav class="mobile-nav">
    <template v-if="isLoggedIn">
      <MobileNavItem 
        icon="Home" 
        label="Início" 
        @click="onHome"
      />
      <MobileNavItem 
        icon="CreditCard" 
        label="Cartas" 
        @click="onCards"
      />
      <MobileNavItem 
        icon="User" 
        label="Suas cartas" 
        @click="onUserCards"
      />
      
      <div class="mobile-nav__divider"></div>
      
      <MobileNavItem 
        icon="LogOut" 
        label="Sair" 
        variant="danger"
        @click="onLogout"
      />
    </template>
    
    <template v-else>
      <MobileNavItem 
        icon="LogIn" 
        label="Login" 
        @click="onLogin"
      />
      <MobileNavItem 
        icon="UserPlus" 
        label="Registrar" 
        variant="primary"
        @click="onRegister"
      />
    </template>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';
import MobileNavItem from '@/components/atoms/mobile-menu/MobileNavItem.vue';

const router = useRouter();
const auth = useAuthStore();

const isLoggedIn = computed(() => !!auth.token);


const emit = defineEmits<{
  navigate: [];
}>();

function onHome() {
  router.push('/');
  emit('navigate');
}

function onLogin() {
  router.push('/login');
  emit('navigate');
}

function onRegister() {
  router.push('/register');
  emit('navigate');
}

function onCards() {
  router.push('/cards');
  emit('navigate');
}

function onUserCards() {
  router.push('/user-cards');
  emit('navigate');
}

function onLogout() {
  auth.logout();
  router.push('/');
  emit('navigate');
}
</script>

<style lang="scss" scoped>
$divider-color: #e4e4e7;

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  &__divider {
    height: 1px;
    background: $divider-color;
    margin: 1rem 0;
  }
}
</style>