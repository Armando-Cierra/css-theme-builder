import { useState } from 'react';
import { ThemesCollection, ThemeItem } from '@/types';

export const useApp = () => {
  const localThemesCollection = localStorage.getItem('themesCollection');
  let initialThemesCollection: ThemesCollection;

  //Checks if there is a themes collection saved on the local storage. If there is not, it sets as initial value an empty array.
  if (localThemesCollection === null) {
    localStorage.setItem('themesCollection', JSON.stringify([]));
    initialThemesCollection = [];
  } else {
    initialThemesCollection = JSON.parse(localThemesCollection as string);
  }

  const [themesCollection, setThemesCollection] = useState<ThemesCollection>(
    initialThemesCollection,
  );

  const addTheme = (newTheme: ThemeItem) =>
    setThemesCollection((prevState) => [...prevState, newTheme]);

  const removeTheme = (themeId: string) =>
    setThemesCollection((prevState) =>
      prevState.filter((theme) => theme.id !== themeId),
    );

  return { themesCollection, addTheme, removeTheme };
};
