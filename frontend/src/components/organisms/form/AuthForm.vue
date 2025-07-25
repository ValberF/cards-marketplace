<template>
  <div :class="baseClass">
    <RouterLink to="/">
      <h1 @click="" :class="`${baseClass}__title`">
        <Icon name="ArrowLeftRight" :size="40" color="#2664eb" />
        <span :class="`${baseClass}__brand`">Cards Marketplace</span>
      </h1>
    </RouterLink>
    <Box width="100%" padding="2.5rem">
      <h2 :class="`${baseClass}__subtitle`">
        {{ title }}
        <small :class="`${baseClass}__subtitle-text`">{{ subtitle }}</small>
      </h2>
      <FormContainer @submit="onSubmit">
        <Input
          v-for="field in fields"
          :key="field.name"
          v-model="fieldStates[field.name].value.value"
          :label="field.label"
          :placeholder="field.placeholder"
          :type="field.type || 'text'"
          :error="fieldStates[field.name].errorMessage.value"
        />
        <Button type="submit" :disabled="!isFormValid">{{ buttonText }}</Button>
      </FormContainer>
      <p :class="`${baseClass}__footer-link`">
        {{ footerText }}
        <RouterLink :to="footerLink">{{ footerLinkText }}</RouterLink>
      </p>
    </Box>
  </div>
</template>

<script setup lang="ts">
import Icon from '@/components/atoms/Icon.vue';
import Input from '@/components/atoms/form/Input.vue';
import Box from '@/components/atoms/Box.vue';
import FormContainer from '@/components/atoms/form/FormContainer.vue';
import Button from '@/components/atoms/Button.vue';

defineProps<{
  baseClass: string,
  title: string,
  subtitle: string,
  buttonText: string,
  fields: any[],
  fieldStates: any,
  isFormValid: boolean,
  onSubmit: () => void,
  footerText: string,
  footerLink: string,
  footerLinkText: string,
}>();
</script>

<style lang="scss" scoped>
$gap: 50px;
$subtitle-gap: 5px;
$subtitle-color: #a8b8c0;
$subtitle-font-size: 18px;

.login, .register {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: $gap;
  height: 100vh;
  
  a {
    text-decoration: none;
  }

  &__title {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__brand {
    font-size: 2rem;
    font-weight: bold;
    color: #18181b;
  }

  &__subtitle {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $subtitle-gap;

    &-text {
      color: $subtitle-color;
      font-weight: normal;
      font-size: $subtitle-font-size;
    }
  }

  &__footer-link {
    margin-top: 1rem;
    text-align: center;
  }
}
</style>