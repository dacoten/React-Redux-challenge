import i18n from 'i18next';
import { en } from "./locales/en/index";
import { jp } from "./locales/jp/index";
import { initReactI18next } from 'react-i18next';
import { SELECTED_LANGUAGE } from './constants/index';

const fallbackLng = ['en'];
const availableLanguages = ['en', 'jp'];

const options = {
  // order and from where user language should be detected
  order: ['navigator', 'htmlTag', 'path', 'subdomain'],

  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

  // optional expire and domain for set cookie
  cookieMinutes: 10,
  cookieDomain: 'myDomain',

  // optional htmlTag with lang attribute, the default is:
  htmlTag: document.documentElement,

  // only detect languages that are in the whitelist
  checkWhitelist: true
}

i18n.use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    fallbackLng, // if user computer language is not on the list of available languages, than we will be using the fallback language specified earlier
    debug: true,
    whitelist: availableLanguages,
    detection: options,
    interpolation: {
      escapeValue: false
    },
    lng: localStorage.getItem(SELECTED_LANGUAGE),
    resources: {
      en: en,
      jp: jp
    }
  });

export default i18n;