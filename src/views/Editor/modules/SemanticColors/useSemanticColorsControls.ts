import { useState, useEffect } from 'react';
import chroma from 'chroma-js';

type SemanticColors = 'success' | 'warning' | 'danger';

interface Props {
  successColor: string;
  handleColorRampsChange: (
    colorType: SemanticColors,
  ) => (color: string) => void;
}

export const useSemanticColorsControls = ({
  successColor,
  handleColorRampsChange,
}: Props) => {
  const [inputColors, setInputColors] = useState({
    success: successColor,
    warning: '',
    danger: '',
  });

  const handleInputColorChange =
    (colorType: SemanticColors) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      const semanticColors = {
        success: () => {
          setInputColors((prevState) => ({ ...prevState, success: value }));
          chroma.valid(value) &&
            handleColorRampsChange('success')(chroma(value).hex());
        },
        warning: () => {},
        danger: () => {},
      };

      semanticColors[colorType]();
    };

  useEffect(() => {
    setInputColors((prevState) => ({ ...prevState, success: successColor }));
  }, [successColor]);

  return {
    inputSuccessColor: inputColors.success,
    handleInputColorChange,
  };
};
