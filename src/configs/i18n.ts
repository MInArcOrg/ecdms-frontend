import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files directly — bundled into the app at build time,
// so they are never exposed as publicly accessible static endpoints.
import en from '../locales/en.json';
import am from '../locales/am.json';
import ar from '../locales/ar.json';
import fr from '../locales/fr.json';

i18n
  // Enable automatic language detection
  .use(LanguageDetector)

  // Enables the hook initialization module
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      am: { translation: am },
      ar: { translation: ar },
      fr: { translation: fr }
    },
    fallbackLng: 'en', // Fallback to English if the detected language is not available
    debug: false,
    react: {
      useSuspense: false
    },
    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    }
  });

export default i18n;