import { useState, useEffect, ChangeEvent } from 'react';
import chroma from 'chroma-js';

type SemanticColors = 'success' | 'warning' | 'danger';

interface Props {
  successColor: string;
  warningColor: string;
  // dangerColor: string;
  handleColorRampsChange: (
    colorType: SemanticColors,
  ) => (color: string) => void;
}

export const useSemanticColorsControls = ({
  successColor,
  warningColor,
  handleColorRampsChange,
}: Props) => {
  const [inputColors, setInputColors] = useState({
    success: successColor,
    warning: warningColor,
    danger: '',
  });

  const handleInputColorChange =
    (colorType: SemanticColors) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      const semanticColors = {
        success: () => {
          setInputColors((prevState) => ({ ...prevState, success: value }));
          chroma.valid(value) &&
            handleColorRampsChange('success')(chroma(value).hex());
        },
        warning: () => {
          setInputColors((prevState) => ({ ...prevState, warning: value }));
          chroma.valid(value) &&
            handleColorRampsChange('warning')(chroma(value).hex());
        },
        danger: () => {},
      };

      semanticColors[colorType]();
    };

  useEffect(() => {
    setInputColors((prevState) => ({
      ...prevState,
      success: successColor,
      warning: warningColor,
    }));
  }, [successColor, warningColor]);

  return {
    inputSuccessColor: inputColors.success,
    inputWarningColor: inputColors.warning,
    handleInputColorChange,
  };
};
