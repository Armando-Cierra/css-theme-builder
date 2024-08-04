import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getInitialSettingsForTheme } from '@/utils';
import {
  // ColorMode,
  // DualTheme,
  // SimpleTheme,
  ThemeItem,
  ThemeType,
} from '@/types';

export const useEditor = () => {
  const location = useLocation();
  const { theme: localTheme, type } = location.state;
  const themeType = localTheme
    ? (localTheme as ThemeItem).type
    : (type as ThemeType);
  const [theme, setTheme] = useState(
    (localTheme as ThemeItem) ?? getInitialSettingsForTheme(themeType),
  );

  return { themeType, theme, setTheme };
};
