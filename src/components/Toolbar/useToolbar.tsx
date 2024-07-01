import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

export const useToolbar = () => {
  const { pathname } = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem('colormode'));
  const [lang, setLang] = useState(i18next.language);
  const { t } = useTranslation();

  const changeTheme = (selectedTheme: 'light' | 'dark' | 'auto') => () => {
    if (selectedTheme === 'auto') {
      const systemPreference = window.matchMedia(
        '(prefers-color-scheme: light)',
      );

      if (systemPreference.matches) {
        document.body.className = 'light';
      } else {
        document.body.className = 'dark';
      }

      window.localStorage.setItem('colormode', selectedTheme);
      setTheme(selectedTheme);
    } else {
      document.body.className = selectedTheme;
      window.localStorage.setItem('colormode', selectedTheme);
      setTheme(selectedTheme);
    }
  };

  const changeLanguage = (lang: 'en' | 'es') => () => {
    i18next.changeLanguage(lang);
    setLang(lang);
  };

  return { t, pathname, theme, changeTheme, changeLanguage, activeLang: lang };
};
