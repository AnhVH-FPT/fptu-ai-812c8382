import type { Lang } from './i18n';
import type { Faculty } from './faculty-data';
import { facultyData as defaultFacultyData } from './faculty-data';
import { translations as defaultTranslations } from './i18n';

const FACULTY_KEY = 'fpt-admin-faculty';
const GLOBAL_TEXT_KEY = 'fpt-admin-global-text';

// ---- Faculty ----
export function getStoredFaculty(): Faculty[] {
  const stored = localStorage.getItem(FACULTY_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch { /* fall through */ }
  }
  return defaultFacultyData;
}

export function saveStoredFaculty(data: Faculty[]) {
  localStorage.setItem(FACULTY_KEY, JSON.stringify(data));
}

// ---- Global Text overrides ----
export type GlobalTextOverrides = {
  hero?: Partial<typeof defaultTranslations.hero>;
  about?: Partial<typeof defaultTranslations.about>;
  contact?: Partial<typeof defaultTranslations.contact>;
  highlights?: Partial<typeof defaultTranslations.highlights>;
  footer?: Partial<typeof defaultTranslations.footer>;
};

export function getStoredGlobalText(): GlobalTextOverrides {
  const stored = localStorage.getItem(GLOBAL_TEXT_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch { /* fall through */ }
  }
  return {};
}

export function saveStoredGlobalText(data: GlobalTextOverrides) {
  localStorage.setItem(GLOBAL_TEXT_KEY, JSON.stringify(data));
}
