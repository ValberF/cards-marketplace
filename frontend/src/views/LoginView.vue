<template>
  <AuthForm
    baseClass="login"
    boxWidth="30%"
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
</template>

<script setup lang="ts">
import AuthForm from '@/components/organisms/form/AuthForm.vue';
import { useLoginForm } from '@/composables/useLoginForm';

const { fields, fieldStates, isFormValid, onSubmit } = useLoginForm();
</script>