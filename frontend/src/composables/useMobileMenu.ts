import { ref, watch } from 'vue';

export function useMobileMenu() {
  const isMenuOpen = ref(false);

  function openMenu() {
    isMenuOpen.value = true;
  }

  function closeMenu() {
    isMenuOpen.value = false;
  }

  function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
  }

  watch(isMenuOpen, (newValue) => {
    if (newValue) {
      document.body.classList.add('mobile-sidebar-open');
    } else {
      document.body.classList.remove('mobile-sidebar-open');
    }
  });

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isMenuOpen.value) {
      closeMenu();
    }
  }

  return {
    isMenuOpen,
    openMenu,
    closeMenu,
    toggleMenu,
    handleKeydown
  };
}