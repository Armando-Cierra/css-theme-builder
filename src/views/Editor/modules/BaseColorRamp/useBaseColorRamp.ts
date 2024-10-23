import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { EditorContext } from '../../context';
import { ColorMode, DualTheme, EditorContextProps, SimpleTheme } from '@/types';
import { getColorScale, defaultContrastPercentages } from '@/utils';

export const useBaseColorRamp = () => {
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

  const baseColor =
    themeType === 'simple'
      ? (theme as SimpleTheme).theme.baseColor.colorRamp[0]
      : selectedMode === 'light'
        ? (theme as DualTheme).lightTheme.baseColor.colorRamp[0]
        : (theme as DualTheme).darkTheme.baseColor.colorRamp[0];

  const contrastColor =
    themeType === 'simple'
      ? (theme as SimpleTheme).theme.baseColor.colorRamp[12]
      : selectedMode === 'light'
        ? (theme as DualTheme).lightTheme.baseColor.colorRamp[12]
        : (theme as DualTheme).darkTheme.baseColor.colorRamp[12];

  const colorRamp =
    themeType === 'simple'
      ? (theme as SimpleTheme).theme.baseColor.colorRamp
      : selectedMode === 'light'
        ? (theme as DualTheme).lightTheme.baseColor.colorRamp
        : (theme as DualTheme).darkTheme.baseColor.colorRamp;

  const contrastPercentages =
    themeType === 'simple'
      ? (theme as SimpleTheme).theme.contrastPercentages
      : selectedMode === 'light'
        ? (theme as DualTheme).lightTheme.contrastPercentages
        : (theme as DualTheme).darkTheme.contrastPercentages;

  const handleColorRampChange =
    (colorType: 'base' | 'contrast') => (newColor: string) => {
      const baseColor = colorType === 'base' ? newColor : colorRamp[0];
      const contrastColor = colorType === 'base' ? colorRamp[12] : newColor;

      const newColorRamp = getColorScale({
        baseColor,
        contrastColor,
        contrastPercentages,
      });

      themeActions.editBaseColorRamp(newColorRamp, selectedMode);
    };

  const handleContrastPercentagesChange = (
    newContrastPercentages: number[],
  ) => {
    if (themeType === 'simple') {
      themeActions.editContrastPercentages(newContrastPercentages);
    } else {
      themeActions.editContrastPercentages(
        newContrastPercentages,
        selectedMode,
      );
    }

    themeActions.editBaseColorRamp(
      getColorScale({
        baseColor,
        contrastColor,
        contrastPercentages: newContrastPercentages,
      }),
      selectedMode,
    );
  };

  const resetValues = () => {
    if (themeType === 'simple') {
      themeActions.editContrastPercentages(defaultContrastPercentages);
      themeActions.editBaseColorRamp(getColorScale());
    } else {
      themeActions.editContrastPercentages(defaultContrastPercentages, 'light');
      themeActions.editContrastPercentages(defaultContrastPercentages, 'dark');
      themeActions.editBaseColorRamp(getColorScale(), 'light');
      themeActions.editBaseColorRamp(
        getColorScale({ baseColor: 'black', contrastColor: 'white' }),
        'dark',
      );
    }
  };

  const standardizeContrastsPercentages = () => {
    const currentLightModeContrastPercentages = (theme as DualTheme).lightTheme
      .contrastPercentages;
    themeActions.editContrastPercentages(
      currentLightModeContrastPercentages,
      'dark',
    );
  };

  const standardizeColors = () => {
    const currentLightColorRamp = [
      ...(theme as DualTheme).lightTheme.baseColor.colorRamp,
    ].reverse();
    themeActions.editBaseColorRamp(currentLightColorRamp, 'dark');
  };

  const baseColorRampsAreDifferent = () => {
    const lightColorRamp = (theme as DualTheme).lightTheme.baseColor.colorRamp;
    const darkColorRamp = [
      ...(theme as DualTheme).darkTheme.baseColor.colorRamp,
    ].reverse();

    return String(lightColorRamp) !== String(darkColorRamp);
  };

  const contrastStandadizationValidation =
    themeType === 'dual' &&
    selectedMode === 'light' &&
    theme.lightTheme.contrastPercentages !==
      theme.darkTheme.contrastPercentages;

  const colorStandadizationValidation =
    themeType === 'dual' &&
    selectedMode === 'light' &&
    baseColorRampsAreDifferent();

  return {
    t,
    theme,
    themeType,
    selectedMode,
    onSelectColorMode,
    copyColor,
    baseColor,
    contrastColor,
    colorRamp,
    handleColorRampChange,
    contrastPercentages,
    handleContrastPercentagesChange,
    resetValues,
    contrastStandadizationValidation,
    standardizeContrastsPercentages,
    colorStandadizationValidation,
    standardizeColors,
  };
};
