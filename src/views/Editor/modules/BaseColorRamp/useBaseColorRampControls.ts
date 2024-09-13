import { useState, useEffect } from 'react';
import chroma from 'chroma-js';

interface Props {
  baseColor: string;
  contrastColor: string;
  handleColorRampChange: (
    colorType: 'base' | 'contrast',
  ) => (color: string) => void;
  contrastPercentages: number[];
  handleContrastPercentagesChange: (percentages: number[]) => void;
}

export const useBaseColorRampControls = ({
  baseColor,
  contrastColor,
  handleColorRampChange,
  contrastPercentages,
  handleContrastPercentagesChange,
}: Props) => {
  const [inputBaseColor, setInputBaseColor] = useState(baseColor);
  const [inputContrastColor, setInputContrastColor] = useState(contrastColor);
  const [inputContrastPercentages, setInputContrastPercentages] = useState(
    contrastPercentages.map((percentage) =>
      Math.round(percentage * 100).toString(),
    ),
  );

  const handleInputColorChange =
    (colorType: 'base' | 'contrast') =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      if (colorType === 'base') {
        setInputBaseColor(value);
        chroma.valid(value) &&
          handleColorRampChange('base')(chroma(value).hex());
      } else {
        setInputContrastColor(value);
        chroma.valid(value) &&
          handleColorRampChange('contrast')(chroma(value).hex());
      }
    };

  const handleInputContrastPercentageChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const regex = /^(100|[1-9]?[0-9])$/;
      let value = event.target.value;

      if (!regex.test(value)) {
        value = value.slice(0, -1);
      }

      const newContrastPercentagesArray = inputContrastPercentages;
      newContrastPercentagesArray[index] = value;
      setInputContrastPercentages(newContrastPercentagesArray);
      handleContrastPercentagesChange(
        newContrastPercentagesArray.map((value) => Number(value) / 100),
      );
    };

  useEffect(() => {
    setInputBaseColor(baseColor);
    setInputContrastColor(contrastColor);
  }, [baseColor, contrastColor]);

  useEffect(() => {
    setInputContrastPercentages(
      contrastPercentages.map((percentage) =>
        Math.round(percentage * 100).toString(),
      ),
    );
  }, [contrastPercentages]);

  return {
    inputBaseColor,
    inputContrastColor,
    handleInputColorChange,
    inputContrastPercentages,
    handleInputContrastPercentageChange,
  };
};
