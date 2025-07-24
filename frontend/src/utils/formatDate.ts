export function formatDate(dateInput: string | number | Date, locale = 'pt-BR'): string {
  const date = new Date(dateInput);
  return date.toLocaleDateString(locale);
}