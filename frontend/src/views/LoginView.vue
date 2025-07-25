<template>
  <div class="login">
    <div class="login__content">
      <AuthForm
        baseClass="login"
        title="Fazer Login"
        subtitle="Entre com sua conta para acessar o marketplace"
        buttonText="Entrar"
        :fields="fields"
        :fieldStates="fieldStates"
        :isFormValid="isFormValid"
        :onSubmit="onSubmit"
        footerText="Não tem uma conta?"
        footerLink="/register"
        footerLinkText="Registre-se"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthForm from '@/components/organisms/form/AuthForm.vue';
import { useLoginForm } from '@/composables/useLoginForm';

const { fields, fieldStates, isFormValid, onSubmit } = useLoginForm();
</script>

<style scoped lang="scss">
$mobile-breakpoint: 768px;

.login {
  width: 100%;
  display: flex;
  justify-content: center;

  &__content {
    width: 30%;

    @media (max-width: $mobile-breakpoint) {
      width: 90%;
    }
  }
}
</style>