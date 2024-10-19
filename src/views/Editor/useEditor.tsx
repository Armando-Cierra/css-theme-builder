import { useState } from 'react';
import { Location } from 'react-router-dom';
import { getInitialSettingsForTheme } from '@/utils';
import {
  ColorMode,
  ColorVariable,
  DualTheme,
  SimpleTheme,
  ThemeItem,
  ThemeType,
} from '@/types';

export const useEditor = (location: Location) => {
  const { theme: localTheme, type } = location.state;
  const themeType = localTheme
    ? (localTheme as ThemeItem).type
    : (type as ThemeType);

  const [theme, setTheme] = useState(
    (localTheme as ThemeItem) ?? getInitialSettingsForTheme(themeType),
  );

  // General Actions
  const editThemeName = (newName: string) => {
    setTheme((prevState) => ({ ...prevState, name: newName }));
  };

  const toggleThemeFavoriteOption = () => {
    setTheme((prevState) => ({ ...prevState, favorite: !prevState.favorite }));
  };

  const editContrastPercentages = (
    newContrastPercentages: number[],
    colorMode?: ColorMode,
  ) => {
    const themeTypes = {
      simple: () => {
        const updatedTheme = theme as SimpleTheme;
        updatedTheme.theme.contrastPercentages = newContrastPercentages;

        setTheme({ ...updatedTheme });
      },
      dual: () => {
        const updatedTheme = theme as DualTheme;

        const colorModes = {
          light: () => {
            updatedTheme.lightTheme.contrastPercentages =
              newContrastPercentages;
          },
          dark: () => {
            updatedTheme.darkTheme.contrastPercentages = newContrastPercentages;
          },
        };

        colorModes[colorMode as ColorMode]();
        setTheme({ ...updatedTheme });
      },
    };

    themeTypes[themeType]();
  };

  //Base Color Actions
  const editBaseColorRamp = (newColorRamp: string[], colorMode?: ColorMode) => {
    const updatedBaseColorProperties = {
      colorRamp: newColorRamp,
      backgrounds: [
        {
          name: 'background_1',
          value: newColorRamp[0],
        },
        {
          name: 'background_2',
          value: newColorRamp[1],
        },
        {
          name: 'background_3',
          value: newColorRamp[2],
        },
      ],
      constrastbackgrounds: [
        {
          name: 'background_contrast_1',
          value: newColorRamp[newColorRamp.length - 1],
        },
        {
          name: 'background_contrast_2',
          value: newColorRamp[newColorRamp.length - 2],
        },
        {
          name: 'background_contrast_3',
          value: newColorRamp[newColorRamp.length - 3],
        },
      ],
      text: [
        {
          name: 'text',
          value: newColorRamp[newColorRamp.length - 1],
        },
        {
          name: 'text_muted',
          value: newColorRamp[newColorRamp.length - 4],
        },
      ],
      contrastText: [
        {
          name: 'text',
          value: newColorRamp[0],
        },
        {
          name: 'text_muted',
          value: newColorRamp[3],
        },
      ],
      borders: [
        {
          name: 'border',
          value: newColorRamp[3],
        },
        {
          name: 'border_active',
          value: newColorRamp[5],
        },
      ],
      contrastBorders: [
        {
          name: 'border_contrast',
          value: newColorRamp[newColorRamp.length - 4],
        },
        {
          name: 'border_contrast_active',
          value: newColorRamp[newColorRamp.length - 5],
        },
      ],
    };

    const themeTypes = {
      simple: () => {
        const updatedTheme = theme as SimpleTheme;
        updatedTheme.theme.baseColor = updatedBaseColorProperties;
        setTheme({ ...updatedTheme });
      },
      dual: () => {
        const updatedTheme = theme as DualTheme;
        const colorModes = {
          light: () => {
            updatedTheme.lightTheme.baseColor = updatedBaseColorProperties;
            setTheme({ ...updatedTheme });
          },
          dark: () => {
            updatedTheme.darkTheme.baseColor = updatedBaseColorProperties;
            setTheme({ ...updatedTheme });
          },
        };
        colorModes[colorMode as ColorMode]();
      },
    };

    themeTypes[themeType]();
  };

  const addNewBackgroundSpace = () => {
    const themeTypes = {
      simple: () => {
        const updatedTheme = theme as SimpleTheme;
        updatedTheme.theme.baseColor.backgrounds = [
          ...updatedTheme.theme.baseColor.backgrounds,
          {
            name: `background_${updatedTheme.theme.baseColor.backgrounds.length}`,
            value:
              updatedTheme.theme.baseColor.colorRamp[
                updatedTheme.theme.baseColor.backgrounds.length
              ],
          },
        ];
        setTheme({ ...updatedTheme });
      },
      dual: () => {
        const updatedTheme = theme as DualTheme;

        updatedTheme.lightTheme.baseColor.backgrounds = [
          ...updatedTheme.lightTheme.baseColor.backgrounds,
          {
            name: `background_${updatedTheme.lightTheme.baseColor.backgrounds.length}`,
            value:
              updatedTheme.lightTheme.baseColor.colorRamp[
                updatedTheme.lightTheme.baseColor.backgrounds.length
              ],
          },
        ];

        updatedTheme.darkTheme.baseColor.backgrounds = [
          ...updatedTheme.darkTheme.baseColor.backgrounds,
          {
            name: `background_${updatedTheme.darkTheme.baseColor.backgrounds.length}`,
            value:
              updatedTheme.darkTheme.baseColor.colorRamp[
                updatedTheme.darkTheme.baseColor.backgrounds.length
              ],
          },
        ];

        setTheme({ ...updatedTheme });
      },
    };
    themeTypes[themeType]();
  };

  const removeBackgroundSpace = (index: number) => {
    function updateBackgroundsName(backgrounds: ColorVariable[]) {
      const updatedBackgroundsNames: ColorVariable[] = [];
      backgrounds.forEach((color, index) => {
        updatedBackgroundsNames.push({
          ...color,
          name: `background_${index + 1}`,
        });
      });

      return updatedBackgroundsNames;
    }

    const themesTypes = {
      simple: () => {
        const updatedTheme = theme as SimpleTheme;
        updatedTheme.theme.baseColor.backgrounds.splice(index, 1);
        updatedTheme.theme.baseColor.backgrounds = updateBackgroundsName(
          updatedTheme.theme.baseColor.backgrounds,
        );
        setTheme({ ...updatedTheme });
      },
      dual: () => {
        const updatedTheme = theme as DualTheme;

        updatedTheme.lightTheme.baseColor.backgrounds.splice(index, 1);
        updatedTheme.lightTheme.baseColor.backgrounds = updateBackgroundsName(
          updatedTheme.lightTheme.baseColor.backgrounds,
        );

        updatedTheme.darkTheme.baseColor.backgrounds.splice(index, 1);
        updatedTheme.darkTheme.baseColor.backgrounds = updateBackgroundsName(
          updatedTheme.darkTheme.baseColor.backgrounds,
        );

        setTheme({ ...updatedTheme });
      },
    };

    themesTypes[themeType]();
  };

  const changeBackgroundColor = (
    index: number,
    newValue: string,
    colorMode?: ColorMode,
  ) => {
    const themeTypes = {
      simple: () => {
        const updatedTheme = theme as SimpleTheme;
        updatedTheme.theme.baseColor.backgrounds[index].value = newValue;

        setTheme({ ...updatedTheme });
      },
      dual: () => {
        const updatedTheme = theme as DualTheme;
        const colorModes = {
          light: () =>
            (updatedTheme.lightTheme.baseColor.backgrounds[index].value =
              newValue),
          dark: () =>
            (updatedTheme.darkTheme.baseColor.backgrounds[index].value =
              newValue),
        };

        colorModes[colorMode as ColorMode]();
        setTheme({ ...updatedTheme });
      },
    };

    themeTypes[themeType]();
  };

  const themeActions = {
    editThemeName,
    editContrastPercentages,
    toggleThemeFavoriteOption,
    editBaseColorRamp,
    addNewBackgroundSpace,
    removeBackgroundSpace,
    changeBackgroundColor,
  };

  return { themeType, theme, themeActions };
};
