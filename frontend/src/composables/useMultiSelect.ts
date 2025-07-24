import { ref, computed, watch, onMounted, onBeforeUnmount, type Ref } from 'vue';

export interface Option {
  [key: string]: any;
}

interface UseMultiSelectProps {
  options: Option[];
  modelValue: string[];
  label?: string;
  value?: string;
  placeholder?: string;
}

export function useMultiSelect(
  props: UseMultiSelectProps,
  emit: (e: 'update:modelValue', value: string[]) => void,
  root: Ref<HTMLElement | null>
) {
  const labelKey = props.label ?? 'label';
  const valueKey = props.value ?? 'value';
  const placeholder = props.placeholder ?? 'Selecione...';

  const selectedValues = ref<string[]>([...(props.modelValue || [])]);
  const open = ref(false);

  watch(
    () => props.modelValue,
    (newVal) => {
      selectedValues.value = [...(newVal || [])];
    }
  );

  const selectedOptions = computed(() =>
    props.options.filter(opt => selectedValues.value.includes(opt[valueKey]))
  );

  const MAX_LABELS = 2;
  const selectedSummary = computed(() => {
    if (selectedOptions.value.length <= MAX_LABELS) {
      return selectedOptions.value.map(opt => opt[labelKey]).join(', ');
    }
    const firstLabels = selectedOptions.value.slice(0, MAX_LABELS).map(opt => opt[labelKey]);
    const more = selectedOptions.value.length - MAX_LABELS;
    return `${firstLabels.join(', ')}, +${more}`;
  });

  function toggleDropdown() {
    open.value = !open.value;
  }

  function closeDropdown(e?: MouseEvent) {
    if (!root.value) return;
    if (e && root.value.contains(e.target as Node)) return;
    open.value = false;
  }

  function toggleOption(option: Option) {
    const idx = selectedValues.value.indexOf(option[valueKey]);
    if (idx === -1) {
      selectedValues.value.push(option[valueKey]);
    } else {
      selectedValues.value.splice(idx, 1);
    }
    emit('update:modelValue', [...selectedValues.value]);
  }

  onMounted(() => {
    document.addEventListener('click', closeDropdown);
  });
  onBeforeUnmount(() => {
    document.removeEventListener('click', closeDropdown);
  });

  return {
    labelKey,
    valueKey,
    placeholder,
    selectedValues,
    open,
    selectedOptions,
    selectedSummary,
    toggleDropdown,
    closeDropdown,
    toggleOption,
  };
}