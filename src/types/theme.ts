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
  background: ColorVariable[];
}

export interface BaseColor {
  colorRamp: string[];
  //Color Ramp Abstraction
  backgrounds: ColorVariable[];
  contrastBackgrounds: ColorVariable[];
  text: ColorVariable[];
  contrastText: ColorVariable[];
  borders: ColorVariable[];
  contrastBorders: ColorVariable[];
}

type ThemeContent = {
  contrastPercentages: number[];
  baseColor: BaseColor;
  semanticColors: CustomColor[];
  brandColors: CustomColor[];
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
    addBackgroundSpace: (
      addBackgroundSpace: 'backgrounds' | 'contrastBackgrounds',
    ) => void;
    removeBackgroundSpace: (
      index: number,
      property: 'backgrounds' | 'contrastBackgrounds',
    ) => void;
    changeBaseColorProperty: (
      property:
        | 'backgrounds'
        | 'contrastBackgrounds'
        | 'text'
        | 'contrastText'
        | 'borders'
        | 'contrastBorders',
      index: number,
      newValue: string,
      colorMode?: ColorMode,
    ) => void;
    resetBaseColorSections: () => void;
    changeSuccessColorRamp: (
      newColorRamp: string[],
      colorMode?: ColorMode,
    ) => void;
    changeSuccessStateColor: (
      index: number,
      newValue: string,
      colorMode?: ColorMode,
    ) => void;
    changeSuccessBackgroundColor: (
      index: number,
      newValue: string,
      colorMode?: ColorMode,
    ) => void;
    changeWarningColorRamp: (
      newColorRamp: string[],
      colorMode?: ColorMode,
    ) => void;
    changeWarningStateColor: (
      index: number,
      newValue: string,
      colorMode?: ColorMode,
    ) => void;
    changeWarningBackgroundColor: (
      index: number,
      newValue: string,
      colorMode?: ColorMode,
    ) => void;
  };
}
