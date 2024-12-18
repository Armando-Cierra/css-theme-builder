import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EditorContext } from '../../context';
import { ColorMode, EditorContextProps, SimpleTheme, DualTheme } from '@/types';

export const useBaseColorSections = () => {
  const { t } = useTranslation();
  const { theme, themeActions } = useContext(
    EditorContext,
  ) as EditorContextProps;
  const themeType = theme.type;

  const [selectedMode, setSelectedMode] = useState<ColorMode>('light');

  const onSelectColorMode = (colorMode: ColorMode) => {
    setSelectedMode(colorMode);
  };

  const backgrounds =
    themeType === 'simple'
      ? (theme as SimpleTheme).theme.baseColor.backgrounds
      : selectedMode === 'light'
        ? (theme as DualTheme).lightTheme.baseColor.backgrounds
        : (theme as DualTheme).darkTheme.baseColor.backgrounds;

  const contrastBackgrounds =
    themeType === 'simple'
      ? (theme as SimpleTheme).theme.baseColor.contrastBackgrounds
      : selectedMode === 'light'
        ? (theme as DualTheme).lightTheme.baseColor.contrastBackgrounds
        : (theme as DualTheme).darkTheme.baseColor.contrastBackgrounds;

  const text =
    themeType === 'simple'
      ? (theme as SimpleTheme).theme.baseColor.text
      : selectedMode === 'light'
        ? (theme as DualTheme).lightTheme.baseColor.text
        : (theme as DualTheme).darkTheme.baseColor.text;

  const contrastText =
    themeType === 'simple'
      ? (theme as SimpleTheme).theme.baseColor.contrastText
      : selectedMode === 'light'
        ? (theme as DualTheme).lightTheme.baseColor.contrastText
        : (theme as DualTheme).darkTheme.baseColor.contrastText;

  const borders =
    themeType === 'simple'
      ? (theme as SimpleTheme).theme.baseColor.borders
      : selectedMode === 'light'
        ? (theme as DualTheme).lightTheme.baseColor.borders
        : (theme as DualTheme).darkTheme.baseColor.borders;

  const contrastBorders =
    themeType === 'simple'
      ? (theme as SimpleTheme).theme.baseColor.contrastBorders
      : selectedMode === 'light'
        ? (theme as DualTheme).lightTheme.baseColor.contrastBorders
        : (theme as DualTheme).darkTheme.baseColor.contrastBorders;

  const addNewBackground = () => themeActions.addBackgroundSpace('backgrounds');

  const editBackgroundColor = (index: number, newValue: string) =>
    themeActions.changeBaseColorProperty(
      'backgrounds',
      index,
      newValue,
      selectedMode,
    );

  const removeBackgroundSpace = (index: number) =>
    themeActions.removeBackgroundSpace(index, 'backgrounds');

  const addNewContrastBackground = () =>
    themeActions.addBackgroundSpace('contrastBackgrounds');

  const editContrastBackgroundColor = (index: number, newValue: string) =>
    themeActions.changeBaseColorProperty(
      'contrastBackgrounds',
      index,
      newValue,
      selectedMode,
    );

  const removeContrastBackgroundSpace = (index: number) =>
    themeActions.removeBackgroundSpace(index, 'contrastBackgrounds');

  const editTextColor = (index: number, newValue: string) =>
    themeActions.changeBaseColorProperty('text', index, newValue, selectedMode);

  const editContrastTextColor = (index: number, newValue: string) =>
    themeActions.changeBaseColorProperty(
      'contrastText',
      index,
      newValue,
      selectedMode,
    );

  const editBorderColor = (index: number, newValue: string) =>
    themeActions.changeBaseColorProperty(
      'borders',
      index,
      newValue,
      selectedMode,
    );

  const editContrastBorderColor = (index: number, newValue: string) =>
    themeActions.changeBaseColorProperty(
      'contrastBorders',
      index,
      newValue,
      selectedMode,
    );

  const resetBaseColorSections = () => themeActions.resetBaseColorSections();

  return {
    t,
    theme,
    themeType,
    selectedMode,
    onSelectColorMode,
    backgrounds,
    contrastBackgrounds,
    text,
    contrastText,
    borders,
    contrastBorders,
    addNewBackground,
    editBackgroundColor,
    removeBackgroundSpace,
    addNewContrastBackground,
    editContrastBackgroundColor,
    removeContrastBackgroundSpace,
    editTextColor,
    editContrastTextColor,
    editBorderColor,
    editContrastBorderColor,
    resetBaseColorSections,
  };
};
