import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { EditorContext } from '../../context';
import {
  ColorMode,
  DualTheme,
  EditorContextProps,
  SemanticColors,
  SimpleTheme,
} from '@/types';
import { getColorScale } from '@/utils';

const colorTypes = {
  primary: 0,
  secondary: 1,
  success: 2,
  warning: 3,
  danger: 4,
};

export const useSemanticColors = () => {
  const { t } = useTranslation();
  const { theme, themeActions } = useContext(
    EditorContext,
  ) as EditorContextProps;
  const themeType = theme.type;

  const [selectedMode, setSelectedMode] = useState<ColorMode>('light');

  const semanticColors =
    themeType === 'simple'
      ? (theme as SimpleTheme).theme.semanticColors
      : selectedMode === 'light'
        ? (theme as DualTheme).lightTheme.semanticColors
        : (theme as DualTheme).darkTheme.semanticColors;

  const onSelectColorMode = (colorMode: ColorMode) => {
    setSelectedMode(colorMode);
  };

  const copyColor = (color: string) => () => {
    navigator.clipboard.writeText(color).then(() => {
      toast('Copied to clipboard');
    });
  };

  //Color Ramps Management
  const handleColorRampsChange =
    (colorType: SemanticColors) => (newColor: string) => {
      const baseColorRamp =
        themeType === 'simple'
          ? (theme as SimpleTheme).theme.baseColor.colorRamp
          : selectedMode === 'light'
            ? (theme as DualTheme).lightTheme.baseColor.colorRamp
            : (theme as DualTheme).darkTheme.baseColor.colorRamp;

      const newColorRamp = getColorScale({
        baseColor: baseColorRamp[0],
        color: newColor,
        contrastColor: baseColorRamp[12],
      });

      newColorRamp.shift();
      newColorRamp.pop();

      const changeColorRamp = {
        primary: () =>
          themeActions.changeSemanticColorRamp(
            'primary',
            newColorRamp,
            selectedMode,
          ),
        secondary: () =>
          themeActions.changeSemanticColorRamp(
            'secondary',
            newColorRamp,
            selectedMode,
          ),
        success: () =>
          themeActions.changeSemanticColorRamp(
            'success',
            newColorRamp,
            selectedMode,
          ),
        warning: () =>
          themeActions.changeSemanticColorRamp(
            'warning',
            newColorRamp,
            selectedMode,
          ),
        danger: () =>
          themeActions.changeSemanticColorRamp(
            'danger',
            newColorRamp,
            selectedMode,
          ),
      };

      changeColorRamp[colorType]();
    };

  const getSemanticColor = (
    colorType: SemanticColors,
    property: 'colorRamp' | 'baseColor' | 'background' | 'variants',
  ) => {
    const themeColor =
      themeType === 'simple'
        ? (theme as SimpleTheme).theme.semanticColors
        : selectedMode === 'light'
          ? (theme as DualTheme).lightTheme.semanticColors
          : (theme as DualTheme).darkTheme.semanticColors;

    const properties = {
      colorRamp: () => themeColor[colorTypes[colorType]].colorRamp,
      baseColor: () => themeColor[colorTypes[colorType]].colorRamp[5],
      background: () => themeColor[colorTypes[colorType]].background,
      variants: () => themeColor[colorTypes[colorType]].variants,
    };

    return properties[property]();
  };

  // Success
  const editSuccessStateColor = (index: number, newValue: string) =>
    themeActions.changeSemanticStateColor(
      'success',
      index,
      newValue,
      selectedMode,
    );

  const editSuccessBackgroundColor = (index: number, newValue: string) =>
    themeActions.changeSemanticBackgroundColor(
      'success',
      index,
      newValue,
      selectedMode,
    );

  return {
    t,
    copyColor,
    themeType,
    semanticColors,
    selectedMode,
    onSelectColorMode,
    handleColorRampsChange,
    successColor: getSemanticColor('success', 'baseColor') as string,
    editSuccessStateColor,
    editSuccessBackgroundColor,
    warningColor: getSemanticColor('warning', 'baseColor') as string,
  };
};

