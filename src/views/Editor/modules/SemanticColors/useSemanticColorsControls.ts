import { useState, useEffect, ChangeEvent } from 'react';
import chroma from 'chroma-js';
import { SemanticColors } from '@/types';

interface Props {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
  };
  handleColorRampsChange: (
    colorType: SemanticColors,
  ) => (color: string) => void;
}

export const useSemanticColorsControls = ({
  colors,
  handleColorRampsChange,
}: Props) => {
  const [inputColors, setInputColors] = useState({
    primary: colors.primary,
    secondary: colors.secondary,
    success: colors.success,
    warning: colors.warning,
    danger: colors.danger,
  });

  const handleInputColorChange =
    (colorType: SemanticColors) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      setInputColors((prevState) => ({ ...prevState, [colorType]: value }));
      chroma.valid(value) &&
        handleColorRampsChange(colorType)(chroma(value).hex());
    };

  useEffect(() => {
    setInputColors((prevState) => ({
      ...prevState,
      primary: colors.primary,
      secondary: colors.secondary,
      success: colors.success,
      warning: colors.warning,
      danger: colors.danger,
    }));
  }, [
    colors.primary,
    colors.secondary,
    colors.success,
    colors.warning,
    colors.danger,
  ]);

  return {
    inputColors,
    handleInputColorChange,
  };
};

