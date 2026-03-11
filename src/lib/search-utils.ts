/**
 * Remove Vietnamese diacritics for accent-insensitive search.
 */
export function removeDiacritics(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

export function normalizeSearch(str: string): string {
  return removeDiacritics(str).toLowerCase();
}
