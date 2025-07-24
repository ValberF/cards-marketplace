<template>
  <AuthForm
    baseClass="register"
    boxWidth="30%"
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
</template>

<script setup lang="ts">
import AuthForm from '@/components/organisms/form/AuthForm.vue';
import { useRegisterForm } from '@/composables/useRegisterForm';

const { fields, fieldStates, isFormValid, onSubmit } = useRegisterForm();
</script>