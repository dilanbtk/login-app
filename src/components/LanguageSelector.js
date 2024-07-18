// src/components/LanguageSelector.js
import React from 'react';
import i18n from '../i18n';

import { withNamespaces } from 'react-i18next';


const LanguageSelector = ({t}) => {

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
      }

  return (
    <div className="language-selector flex items-center">
      <button
        onClick={() => changeLanguage('en')}
        className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md mr-2"
      >
        English
      </button>
      <button
        onClick={() => changeLanguage('tr')}
        className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md"
      >
        Türkçe
      </button>
    </div>
  );
};

export default withNamespaces()(LanguageSelector);

