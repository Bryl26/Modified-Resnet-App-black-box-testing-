import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import all translations
import en from './locales/en.json';
import tl from './locales/tl.json';
import il from './locales/il.json';
import ib from './locales/ib.json';
import gd from './locales/gd.json';
import cb from './locales/cb.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      tl: { translation: tl },
      il: { translation: il },
      ib: { translation: ib },
      gd: { translation: gd },
      cb: { translation: cb }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;