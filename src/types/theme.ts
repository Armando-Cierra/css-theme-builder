export type ThemeType = 'simple' | 'dual';

export type ColorMode = 'light' | 'dark';

export type ColorVariable = {
  name: string;
  value: string;
};

export interface CustomColor {
  name: string;
  colorRamp: string[];
  //Color Ramp Abstraction
  variants: ColorVariable[];
  background: ColorVariable;
}

type ThemeContent = {
  contrastPercentages: number[];
  baseColor: {
    colorRamp: string[];
    //Color Ramp Abstraction
    backgrounds: ColorVariable[];
    constrastbackgrounds: ColorVariable[];
    text: ColorVariable[];
    contrastText: ColorVariable[];
    borders: ColorVariable[];
    contrastBorders: ColorVariable[];
  };
  semanticColors: CustomColor[];
  customColors: CustomColor[];
};

interface BaseThemeContent {
  name: string;
  favorite: boolean;
  id: string;
}

export interface SimpleTheme extends BaseThemeContent {
  type: 'simple';
  theme: ThemeContent;
}

export interface DualTheme extends BaseThemeContent {
  type: 'dual';
  lightTheme: ThemeContent;
  darkTheme: ThemeContent;
}

export type ThemeItem = SimpleTheme | DualTheme;

export type ThemesCollection = ThemeItem[];

export interface ThemesContext {
  themesCollection: ThemesCollection;
  addTheme: (newTheme: ThemeItem) => void;
  removeTheme: (themeId: string) => void;
}

export interface EditorContextProps {
  theme: ThemeItem;
  themeActions: {
    editThemeName: (newName: string) => void;
    editContrastPercentages: (
      newContrastPercentages: number[],
      colorMode?: ColorMode,
    ) => void;
    toggleThemeFavoriteOption: () => void;
    editBaseColorRamp: (newColorRamp: string[], colorMode?: ColorMode) => void;
    addNewBackgroundSpace: (colorMode?: ColorMode) => void;
    removeBackgroundSpace: (index: number, colorMode?: ColorMode) => void;
    changeBackgroundColor: (
      index: number,
      newValue: string,
      colorMode?: ColorMode,
    ) => void;
  };
}
