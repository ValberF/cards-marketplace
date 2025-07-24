import { computed, ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import { useLogin } from '@/composables/useLogin';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';

type FieldConfig = {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
};

export function useLoginForm() {
  const { login, loading, error } = useLogin();
  const router = useRouter();
  const toast = useToast();

  const fields: FieldConfig[] = [
    { name: 'email', label: 'E-mail', placeholder: 'Digite seu e-mail', type: 'email' },
    { name: 'password', label: 'Senha', placeholder: 'Digite sua senha', type: 'password' }
  ];

  const { handleSubmit } = useForm({
    validationSchema: {
      email: (value: string) => {
        if (!value) return 'E-mail é obrigatório';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Digite um e-mail válido';
        return true;
      },
      password: (value: string) => {
        if (!value) return 'Senha é obrigatória';
        if (value.length < 6) return 'Senha deve ter pelo menos 6 caracteres';
        return true;
      }
    }
  });

  const fieldStates = fields.reduce((acc, field) => {
    const { value, errorMessage } = useField<string>(field.name);
    acc[field.name] = { value, errorMessage };
    return acc;
  }, {} as Record<string, { value: any; errorMessage: any }>);

  const isFormValid = computed(() => {
    return fields.every(
      (field) =>
        !fieldStates[field.name].errorMessage.value &&
        fieldStates[field.name].value.value
    );
  });

  const formError = ref<string | null>(null);

const onSubmit = handleSubmit(async (values) => {
  formError.value = null;
  try {
    const success = await login(values.email, values.password);
    if (success) {
      toast.success('Logado com sucesso!');
      router.push('/');
    } else {
      formError.value = 'E-mail ou senha inválidos';
      toast.error('E-mail ou senha inválidos');
    }
  } catch (err) {
    formError.value = 'Erro ao tentar logar. Tente novamente.';
    toast.error('Erro ao tentar logar. Tente novamente.');
  }
});

  return {
    fields,
    fieldStates,
    isFormValid,
    onSubmit,
    loading,
    error,
    formError
  };
}