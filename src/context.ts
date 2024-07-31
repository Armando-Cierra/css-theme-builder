import { createContext } from 'react';
import type { ThemesContext as ThemesContextProps } from '@/types';

export const ThemesContext = createContext<ThemesContextProps | undefined>(
  undefined,
);
