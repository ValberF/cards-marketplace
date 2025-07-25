<template>
  <div class="register">
    <div class="register__content">
      <AuthForm
        baseClass="register"
        title="Criar Conta"
        subtitle="Registre-se para começar a trocar cartas"
        buttonText="Criar conta"
        :fields="fields"
        :fieldStates="fieldStates"
        :isFormValid="isFormValid"
        :onSubmit="onSubmit"
        footerText="Já tem uma conta?"
        footerLink="/login"
        footerLinkText="Faça login"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthForm from '@/components/organisms/form/AuthForm.vue';
import { useRegisterForm } from '@/composables/useRegisterForm';

const { fields, fieldStates, isFormValid, onSubmit } = useRegisterForm();
</script>

<style scoped lang="scss">
$mobile-breakpoint: 768px;

.register {
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