import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enNs1 from './locales/en/en.json';
import uaNs1 from './locales/ua/ua.json';

export const defaultNS = 'ns1';

const lang = localStorage.getItem('lng')

i18next.use(initReactI18next).init({
  lng:  lang || 'ua',
  // debug: true,
  defaultNS,
  resources: {
    en: {
      ns1: enNs1,
    },
    ua: {
      ns1: uaNs1,
    },
  },
});

export default i18next;