import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { EditorContext } from '../../context';
import { ColorMode, DualTheme, EditorContextProps, SimpleTheme } from '@/types';
import { getColorScale } from '@/utils';

export const useSemanticColors = () => {
  const { t } = useTranslation();
  const { theme, themeActions } = useContext(
    EditorContext,
  ) as EditorContextProps;
  const themeType = theme.type;

  const [selectedMode, setSelectedMode] = useState<ColorMode>('light');

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
    (colorType: 'success' | 'warning' | 'danger') => (newColor: string) => {
      const newColorRamp = getColorScale({
        baseColor:
          themeType === 'simple'
            ? (theme as SimpleTheme).theme.baseColor.colorRamp[0]
            : selectedMode === 'light'
              ? (theme as DualTheme).lightTheme.baseColor.colorRamp[0]
              : (theme as DualTheme).darkTheme.baseColor.colorRamp[0],
        color: newColor,
        contrastColor:
          themeType === 'simple'
            ? (theme as SimpleTheme).theme.baseColor.colorRamp[12]
            : selectedMode === 'light'
              ? (theme as DualTheme).lightTheme.baseColor.colorRamp[12]
              : (theme as DualTheme).darkTheme.baseColor.colorRamp[12],
      });
      newColorRamp.shift();
      newColorRamp.pop();

      const semanticColors = {
        success: () =>
          themeActions.changeSuccessColorRamp(newColorRamp, selectedMode),
        warning: () =>
          themeActions.changeWarningColorRamp(newColorRamp, selectedMode),
        danger: () => {},
      };

      semanticColors[colorType]();
    };

  // Success
  const successColor =
    themeType === 'simple'
      ? (theme as SimpleTheme).theme.semanticColors[0].colorRamp[5]
      : selectedMode === 'light'
        ? (theme as DualTheme).lightTheme.semanticColors[0].colorRamp[5]
        : (theme as DualTheme).darkTheme.semanticColors[0].colorRamp[5];

  const successBackgroundColor =
    themeType === 'simple'
      ? (theme as SimpleTheme).theme.semanticColors[0].background
      : selectedMode === 'light'
        ? (theme as DualTheme).lightTheme.semanticColors[0].background
        : (theme as DualTheme).darkTheme.semanticColors[0].background;

  const successVariantsColor =
    themeType === 'simple'
      ? (theme as SimpleTheme).theme.semanticColors[0].variants
      : selectedMode === 'light'
        ? (theme as DualTheme).lightTheme.semanticColors[0].variants
        : (theme as DualTheme).darkTheme.semanticColors[0].variants;

  const successColorRamp =
    themeType === 'simple'
      ? (theme as SimpleTheme).theme.semanticColors[0].colorRamp
      : selectedMode === 'light'
        ? (theme as DualTheme).lightTheme.semanticColors[0].colorRamp
        : (theme as DualTheme).darkTheme.semanticColors[0].colorRamp;

  const editSuccessStateColor = (index: number, newValue: string) =>
    themeActions.changeSuccessStateColor(index, newValue, selectedMode);

  const editSuccessBackgroundColor = (index: number, newValue: string) =>
    themeActions.changeSuccessBackgroundColor(index, newValue, selectedMode);

  // Warning
  const warningColor =
    themeType === 'simple'
      ? (theme as SimpleTheme).theme.semanticColors[1].colorRamp[5]
      : selectedMode === 'light'
        ? (theme as DualTheme).lightTheme.semanticColors[1].colorRamp[5]
        : (theme as DualTheme).darkTheme.semanticColors[1].colorRamp[5];

  const warningBackgroundColor =
    themeType === 'simple'
      ? (theme as SimpleTheme).theme.semanticColors[1].background
      : selectedMode === 'light'
        ? (theme as DualTheme).lightTheme.semanticColors[1].background
        : (theme as DualTheme).darkTheme.semanticColors[1].background;

  const warningVariantsColor =
    themeType === 'simple'
      ? (theme as SimpleTheme).theme.semanticColors[1].variants
      : selectedMode === 'light'
        ? (theme as DualTheme).lightTheme.semanticColors[1].variants
        : (theme as DualTheme).darkTheme.semanticColors[1].variants;

  const warningColorRamp =
    themeType === 'simple'
      ? (theme as SimpleTheme).theme.semanticColors[1].colorRamp
      : selectedMode === 'light'
        ? (theme as DualTheme).lightTheme.semanticColors[1].colorRamp
        : (theme as DualTheme).darkTheme.semanticColors[1].colorRamp;

  const editWarningStateColor = (index: number, newValue: string) =>
    themeActions.changeWarningStateColor(index, newValue, selectedMode);

  const editWarningBackgroundColor = (index: number, newValue: string) =>
    themeActions.changeWarningBackgroundColor(index, newValue, selectedMode);

  return {
    t,
    theme,
    themeType,
    selectedMode,
    onSelectColorMode,
    copyColor,
    handleColorRampsChange,
    successColor,
    successBackgroundColor,
    successVariantsColor,
    successColorRamp,
    editSuccessStateColor,
    editSuccessBackgroundColor,
    warningColor,
    warningBackgroundColor,
    warningVariantsColor,
    warningColorRamp,
    editWarningBackgroundColor,
    editWarningStateColor,
  };
};
