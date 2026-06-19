import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// ✅ Sahi path – `i18n.ts` src/ mein, locales/ bhi src/ mein
import en from './locales/en/translation.json';
import ur from './locales/ur/translation.json';
import hi from './locales/hi/translation.json';

const resources = {
  en: { translation: en },
  ur: { translation: ur },
  hi: { translation: hi },
};
   
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;