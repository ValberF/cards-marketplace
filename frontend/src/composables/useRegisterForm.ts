import { computed } from 'vue';
import { useForm, useField } from 'vee-validate';
import { useApi } from './useApi';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';

type FieldConfig = {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
};

export function useRegisterForm() {
  const { post, loading, error } = useApi();
  const router = useRouter();
  const toast = useToast();

  const fields: FieldConfig[] = [
    { name: 'name', label: 'Nome', placeholder: 'Digite seu nome' },
    { name: 'email', label: 'E-mail', placeholder: 'Digite seu e-mail', type: 'email' },
    { name: 'password', label: 'Senha', placeholder: 'Digite sua senha', type: 'password' },
    { name: 'confirmPassword', label: 'Confirmar senha', placeholder: 'Confirme sua senha', type: 'password' }
  ];

  const { handleSubmit } = useForm({
    validationSchema: {
      name: (value: string) => {
        if (!value) return 'Nome é obrigatório';
        if (value.length < 2) return 'Nome deve ter pelo menos 2 caracteres';
        return true;
      },
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
      },
      confirmPassword: (value: string, ctx: any) => {
        if (!value) return 'Confirmação de senha é obrigatória';
        if (value !== ctx.form.password) return 'As senhas não coincidem';
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

const onSubmit = handleSubmit(async (values) => {
  try {
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    await post('/register', payload);
    toast.success('Usuário registrado com sucesso!');
    router.push('/login');
  } catch (err) {
    toast.error('Erro ao registrar usuário. Tente novamente.');

  }
});

  return {
    fields,
    fieldStates,
    isFormValid,
    onSubmit
  };
}