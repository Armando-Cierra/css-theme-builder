import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { EditorContext } from '../../context';
import { ColorMode, DualTheme, EditorContextProps, SimpleTheme } from '@/types';
import { getColorScale } from '@/utils';

export const useBaseColorRamp = () => {
  const { t } = useTranslation();
  const { theme, themeActions } = useContext(
    EditorContext,
  ) as EditorContextProps;
  const [selectedMode, setSelectedMode] = useState<ColorMode>('light');
  const themeType = theme.type;

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

  const handleColorRampChange =
    (colorType: 'base' | 'contrast') => (newColor: string) => {
      const baseColor = colorType === 'base' ? newColor : colorRamp[0];
      const contrastColor = colorType === 'base' ? colorRamp[12] : newColor;
      const contrastPercentages =
        themeType === 'simple'
          ? (theme as SimpleTheme).theme.contrastPercentages
          : selectedMode === 'light'
            ? (theme as DualTheme).lightTheme.contrastPercentages
            : (theme as DualTheme).darkTheme.contrastPercentages;

      const newColorRamp = getColorScale({
        baseColor,
        contrastColor,
        contrastPercentages,
      });

      themeActions.editBaseColorRamp(newColorRamp, selectedMode);
    };

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
  };
};
