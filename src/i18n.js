// src/i18n.js
import i18n from 'i18next';
import { reactI18nextModule } from "react-i18next";

import en from './locales/en/translation.json';
import tr from './locales/tr/translation.json';

const resources = {
  en: {
    translation: en
  },
  tr: {
    translation: tr
  } 
};


i18n
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });



export default i18n;
