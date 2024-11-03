import { useState } from 'react';
import { Location } from 'react-router-dom';
import {
  getInitialSettingsForTheme,
  updateBrandColors,
  updateSemanticColors,
} from '@/utils';
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
      contrastBackgrounds: [
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
        updatedTheme.theme.semanticColors = updateSemanticColors(
          updatedTheme,
          themeType,
          newColorRamp,
        );
        updatedTheme.theme.brandColors = updateBrandColors(
          updatedTheme,
          themeType,
          newColorRamp,
        );
        setTheme({ ...updatedTheme });
      },
      dual: () => {
        const updatedTheme = theme as DualTheme;
        const colorModes = {
          light: () => {
            updatedTheme.lightTheme.baseColor = updatedBaseColorProperties;
            updatedTheme.lightTheme.semanticColors = updateSemanticColors(
              updatedTheme,
              themeType,
              newColorRamp,
              'light',
            );
            updatedTheme.lightTheme.brandColors = updateBrandColors(
              updatedTheme,
              themeType,
              newColorRamp,
              'light',
            );
            setTheme({ ...updatedTheme });
          },
          dark: () => {
            updatedTheme.darkTheme.baseColor = updatedBaseColorProperties;
            updatedTheme.darkTheme.semanticColors = updateSemanticColors(
              updatedTheme,
              themeType,
              newColorRamp,
              'dark',
            );
            updatedTheme.darkTheme.brandColors = updateBrandColors(
              updatedTheme,
              themeType,
              newColorRamp,
              'dark',
            );
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

  const addNewContrastBackgroundSpace = () => {
    const themeTypes = {
      simple: () => {
        const updatedTheme = theme as SimpleTheme;
        updatedTheme.theme.baseColor.contrastBackgrounds = [
          ...updatedTheme.theme.baseColor.contrastBackgrounds,
          {
            name: `background_${updatedTheme.theme.baseColor.contrastBackgrounds.length}`,
            value:
              updatedTheme.theme.baseColor.colorRamp[
                updatedTheme.theme.baseColor.colorRamp.length -
                  1 -
                  updatedTheme.theme.baseColor.contrastBackgrounds.length
              ],
          },
        ];
        setTheme({ ...updatedTheme });
      },
      dual: () => {
        const updatedTheme = theme as DualTheme;

        updatedTheme.lightTheme.baseColor.contrastBackgrounds = [
          ...updatedTheme.lightTheme.baseColor.contrastBackgrounds,
          {
            name: `background_${updatedTheme.lightTheme.baseColor.contrastBackgrounds.length}`,
            value:
              updatedTheme.lightTheme.baseColor.colorRamp[
                updatedTheme.lightTheme.baseColor.colorRamp.length -
                  1 -
                  updatedTheme.lightTheme.baseColor.contrastBackgrounds.length
              ],
          },
        ];

        updatedTheme.darkTheme.baseColor.contrastBackgrounds = [
          ...updatedTheme.darkTheme.baseColor.contrastBackgrounds,
          {
            name: `background_${updatedTheme.darkTheme.baseColor.contrastBackgrounds.length}`,
            value:
              updatedTheme.darkTheme.baseColor.colorRamp[
                updatedTheme.darkTheme.baseColor.colorRamp.length -
                  1 -
                  updatedTheme.darkTheme.baseColor.contrastBackgrounds.length
              ],
          },
        ];

        setTheme({ ...updatedTheme });
      },
    };
    themeTypes[themeType]();
  };

  const removeContrastBackgroundSpace = (index: number) => {
    function updateContrastBackgroundsName(
      contrastBackgrounds: ColorVariable[],
    ) {
      const updatedBackgroundsNames: ColorVariable[] = [];
      contrastBackgrounds.forEach((color, index) => {
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
        updatedTheme.theme.baseColor.contrastBackgrounds.splice(index, 1);
        updatedTheme.theme.baseColor.contrastBackgrounds =
          updateContrastBackgroundsName(
            updatedTheme.theme.baseColor.contrastBackgrounds,
          );
        setTheme({ ...updatedTheme });
      },
      dual: () => {
        const updatedTheme = theme as DualTheme;

        updatedTheme.lightTheme.baseColor.contrastBackgrounds.splice(index, 1);
        updatedTheme.lightTheme.baseColor.contrastBackgrounds =
          updateContrastBackgroundsName(
            updatedTheme.lightTheme.baseColor.contrastBackgrounds,
          );

        updatedTheme.darkTheme.baseColor.contrastBackgrounds.splice(index, 1);
        updatedTheme.darkTheme.baseColor.contrastBackgrounds =
          updateContrastBackgroundsName(
            updatedTheme.darkTheme.baseColor.contrastBackgrounds,
          );

        setTheme({ ...updatedTheme });
      },
    };

    themesTypes[themeType]();
  };

  const changeContrastBackgroundColor = (
    index: number,
    newValue: string,
    colorMode?: ColorMode,
  ) => {
    const themeTypes = {
      simple: () => {
        const updatedTheme = theme as SimpleTheme;
        updatedTheme.theme.baseColor.contrastBackgrounds[index].value =
          newValue;

        setTheme({ ...updatedTheme });
      },
      dual: () => {
        const updatedTheme = theme as DualTheme;
        const colorModes = {
          light: () =>
            (updatedTheme.lightTheme.baseColor.contrastBackgrounds[
              index
            ].value = newValue),
          dark: () =>
            (updatedTheme.darkTheme.baseColor.contrastBackgrounds[index].value =
              newValue),
        };

        colorModes[colorMode as ColorMode]();
        setTheme({ ...updatedTheme });
      },
    };

    themeTypes[themeType]();
  };

  const changeTextColor = (
    index: number,
    newValue: string,
    colorMode?: ColorMode,
  ) => {
    const themeTypes = {
      simple: () => {
        const updatedTheme = theme as SimpleTheme;
        updatedTheme.theme.baseColor.text[index].value = newValue;

        setTheme({ ...updatedTheme });
      },
      dual: () => {
        const updatedTheme = theme as DualTheme;
        const colorModes = {
          light: () =>
            (updatedTheme.lightTheme.baseColor.text[index].value = newValue),
          dark: () =>
            (updatedTheme.darkTheme.baseColor.text[index].value = newValue),
        };

        colorModes[colorMode as ColorMode]();
        setTheme({ ...updatedTheme });
      },
    };

    themeTypes[themeType]();
  };

  const changeContrastTextColor = (
    index: number,
    newValue: string,
    colorMode?: ColorMode,
  ) => {
    const themeTypes = {
      simple: () => {
        const updatedTheme = theme as SimpleTheme;
        updatedTheme.theme.baseColor.contrastText[index].value = newValue;

        setTheme({ ...updatedTheme });
      },
      dual: () => {
        const updatedTheme = theme as DualTheme;
        const colorModes = {
          light: () =>
            (updatedTheme.lightTheme.baseColor.contrastText[index].value =
              newValue),
          dark: () =>
            (updatedTheme.darkTheme.baseColor.contrastText[index].value =
              newValue),
        };

        colorModes[colorMode as ColorMode]();
        setTheme({ ...updatedTheme });
      },
    };

    themeTypes[themeType]();
  };

  const changeBorderColor = (
    index: number,
    newValue: string,
    colorMode?: ColorMode,
  ) => {
    const themeTypes = {
      simple: () => {
        const updatedTheme = theme as SimpleTheme;
        updatedTheme.theme.baseColor.borders[index].value = newValue;

        setTheme({ ...updatedTheme });
      },
      dual: () => {
        const updatedTheme = theme as DualTheme;
        const colorModes = {
          light: () =>
            (updatedTheme.lightTheme.baseColor.borders[index].value = newValue),
          dark: () =>
            (updatedTheme.darkTheme.baseColor.borders[index].value = newValue),
        };

        colorModes[colorMode as ColorMode]();
        setTheme({ ...updatedTheme });
      },
    };

    themeTypes[themeType]();
  };

  const changeContrastBorderColor = (
    index: number,
    newValue: string,
    colorMode?: ColorMode,
  ) => {
    const themeTypes = {
      simple: () => {
        const updatedTheme = theme as SimpleTheme;
        updatedTheme.theme.baseColor.contrastBorders[index].value = newValue;

        setTheme({ ...updatedTheme });
      },
      dual: () => {
        const updatedTheme = theme as DualTheme;
        const colorModes = {
          light: () =>
            (updatedTheme.lightTheme.baseColor.contrastBorders[index].value =
              newValue),
          dark: () =>
            (updatedTheme.darkTheme.baseColor.contrastBorders[index].value =
              newValue),
        };

        colorModes[colorMode as ColorMode]();
        setTheme({ ...updatedTheme });
      },
    };

    themeTypes[themeType]();
  };

  const resetBaseColorSections = () => {
    const themeTypes = {
      simple: () => {
        const updatedTheme = theme as SimpleTheme;
        const baseColorScale = updatedTheme.theme.baseColor.colorRamp;

        updatedTheme.theme.baseColor = {
          ...updatedTheme.theme.baseColor,
          backgrounds: [
            {
              name: 'background_1',
              value: baseColorScale[0],
            },
            {
              name: 'background_2',
              value: baseColorScale[1],
            },
            {
              name: 'background_3',
              value: baseColorScale[2],
            },
          ],
          contrastBackgrounds: [
            {
              name: 'background_contrast_1',
              value: baseColorScale[baseColorScale.length - 1],
            },
            {
              name: 'background_contrast_2',
              value: baseColorScale[baseColorScale.length - 2],
            },
            {
              name: 'background_contrast_3',
              value: baseColorScale[baseColorScale.length - 3],
            },
          ],
          text: [
            {
              name: 'text',
              value: baseColorScale[baseColorScale.length - 1],
            },
            {
              name: 'text_muted',
              value: baseColorScale[baseColorScale.length - 4],
            },
          ],
          contrastText: [
            {
              name: 'text',
              value: baseColorScale[0],
            },
            {
              name: 'text_muted',
              value: baseColorScale[3],
            },
          ],
          borders: [
            {
              name: 'border',
              value: baseColorScale[3],
            },
            {
              name: 'border_active',
              value: baseColorScale[5],
            },
          ],
          contrastBorders: [
            {
              name: 'border_contrast',
              value: baseColorScale[baseColorScale.length - 4],
            },
            {
              name: 'border_contrast_active',
              value: baseColorScale[baseColorScale.length - 5],
            },
          ],
        };

        setTheme({ ...updatedTheme });
      },
      dual: () => {
        const updatedTheme = theme as DualTheme;
        const baseLightColorScale = updatedTheme.lightTheme.baseColor.colorRamp;
        const baseDarkColorScale = updatedTheme.darkTheme.baseColor.colorRamp;

        updatedTheme.lightTheme.baseColor = {
          ...updatedTheme.lightTheme.baseColor,
          backgrounds: [
            {
              name: 'background_1',
              value: baseLightColorScale[0],
            },
            {
              name: 'background_2',
              value: baseLightColorScale[1],
            },
            {
              name: 'background_3',
              value: baseLightColorScale[2],
            },
          ],
          contrastBackgrounds: [
            {
              name: 'background_contrast_1',
              value: baseLightColorScale[baseLightColorScale.length - 1],
            },
            {
              name: 'background_contrast_2',
              value: baseLightColorScale[baseLightColorScale.length - 2],
            },
            {
              name: 'background_contrast_3',
              value: baseLightColorScale[baseLightColorScale.length - 3],
            },
          ],
          text: [
            {
              name: 'text',
              value: baseLightColorScale[baseLightColorScale.length - 1],
            },
            {
              name: 'text_muted',
              value: baseLightColorScale[baseLightColorScale.length - 4],
            },
          ],
          contrastText: [
            {
              name: 'text',
              value: baseLightColorScale[0],
            },
            {
              name: 'text_muted',
              value: baseLightColorScale[3],
            },
          ],
          borders: [
            {
              name: 'border',
              value: baseLightColorScale[3],
            },
            {
              name: 'border_active',
              value: baseLightColorScale[5],
            },
          ],
          contrastBorders: [
            {
              name: 'border_contrast',
              value: baseLightColorScale[baseLightColorScale.length - 4],
            },
            {
              name: 'border_contrast_active',
              value: baseLightColorScale[baseLightColorScale.length - 5],
            },
          ],
        };

        updatedTheme.darkTheme.baseColor = {
          ...updatedTheme.darkTheme.baseColor,
          backgrounds: [
            {
              name: 'background_1',
              value: baseDarkColorScale[0],
            },
            {
              name: 'background_2',
              value: baseDarkColorScale[1],
            },
            {
              name: 'background_3',
              value: baseDarkColorScale[2],
            },
          ],
          contrastBackgrounds: [
            {
              name: 'background_contrast_1',
              value: baseDarkColorScale[baseDarkColorScale.length - 1],
            },
            {
              name: 'background_contrast_2',
              value: baseDarkColorScale[baseDarkColorScale.length - 2],
            },
            {
              name: 'background_contrast_3',
              value: baseDarkColorScale[baseDarkColorScale.length - 3],
            },
          ],
          text: [
            {
              name: 'text',
              value: baseDarkColorScale[baseDarkColorScale.length - 1],
            },
            {
              name: 'text_muted',
              value: baseDarkColorScale[baseDarkColorScale.length - 4],
            },
          ],
          contrastText: [
            {
              name: 'text',
              value: baseDarkColorScale[0],
            },
            {
              name: 'text_muted',
              value: baseDarkColorScale[3],
            },
          ],
          borders: [
            {
              name: 'border',
              value: baseDarkColorScale[3],
            },
            {
              name: 'border_active',
              value: baseDarkColorScale[5],
            },
          ],
          contrastBorders: [
            {
              name: 'border_contrast',
              value: baseDarkColorScale[baseDarkColorScale.length - 4],
            },
            {
              name: 'border_contrast_active',
              value: baseDarkColorScale[baseDarkColorScale.length - 5],
            },
          ],
        };

        setTheme({ ...updatedTheme });
      },
    };

    themeTypes[themeType]();
  };

  // --- Semantic Colors
  // Success
  const changeSuccessColorRamp = (
    newColorRamp: string[],
    colorMode?: ColorMode,
  ) => {
    const updatedTheme = { ...theme };

    const themesTypes = {
      simple: () => {
        (updatedTheme as SimpleTheme).theme.semanticColors[0] = {
          name: 'success',
          colorRamp: newColorRamp,
          background: [
            {
              name: 'background',
              value: newColorRamp[0],
            },
          ],
          variants: [
            {
              name: 'success',
              value: newColorRamp[5],
            },
            {
              name: 'success_hover',
              value: newColorRamp[6],
            },
            {
              name: 'success_active',
              value: newColorRamp[7],
            },
          ],
        };
        setTheme({ ...updatedTheme });
      },
      dual: () => {
        const colorModes = {
          light: () => {
            (updatedTheme as DualTheme).lightTheme.semanticColors[0] = {
              name: 'success',
              colorRamp: newColorRamp,
              background: [
                {
                  name: 'background',
                  value: newColorRamp[0],
                },
              ],
              variants: [
                {
                  name: 'success',
                  value: newColorRamp[5],
                },
                {
                  name: 'success_hover',
                  value: newColorRamp[6],
                },
                {
                  name: 'success_active',
                  value: newColorRamp[7],
                },
              ],
            };
          },
          dark: () => {
            (updatedTheme as DualTheme).darkTheme.semanticColors[0] = {
              name: 'success',
              colorRamp: newColorRamp,
              background: [
                {
                  name: 'background',
                  value: newColorRamp[0],
                },
              ],
              variants: [
                {
                  name: 'success',
                  value: newColorRamp[4],
                },
                {
                  name: 'success_hover',
                  value: newColorRamp[5],
                },
                {
                  name: 'success_active',
                  value: newColorRamp[6],
                },
              ],
            };
          },
        };

        colorModes[colorMode as ColorMode]();
        setTheme({ ...updatedTheme });
      },
    };

    themesTypes[themeType]();
  };

  const changeSuccessStateColor = (
    index: number,
    newValue: string,
    colorMode?: ColorMode,
  ) => {
    const themeTypes = {
      simple: () => {
        const updatedTheme = theme as SimpleTheme;
        updatedTheme.theme.semanticColors[0].variants[index].value = newValue;

        setTheme({ ...updatedTheme });
      },
      dual: () => {
        const updatedTheme = theme as DualTheme;
        const colorModes = {
          light: () =>
            (updatedTheme.lightTheme.semanticColors[0].variants[index].value =
              newValue),
          dark: () =>
            (updatedTheme.darkTheme.semanticColors[0].variants[index].value =
              newValue),
        };

        colorModes[colorMode as ColorMode]();
        setTheme({ ...updatedTheme });
      },
    };

    themeTypes[themeType]();
  };

  const changeSuccessBackgroundColor = (
    index: number,
    newValue: string,
    colorMode?: ColorMode,
  ) => {
    const themeTypes = {
      simple: () => {
        const updatedTheme = theme as SimpleTheme;
        updatedTheme.theme.semanticColors[0].background[index].value = newValue;

        setTheme({ ...updatedTheme });
      },
      dual: () => {
        const updatedTheme = theme as DualTheme;
        const colorModes = {
          light: () =>
            (updatedTheme.lightTheme.semanticColors[0].background[index].value =
              newValue),
          dark: () =>
            (updatedTheme.darkTheme.semanticColors[0].background[index].value =
              newValue),
        };

        colorModes[colorMode as ColorMode]();
        setTheme({ ...updatedTheme });
      },
    };

    themeTypes[themeType]();
  };

  // Warning
  const changeWarningColorRamp = (
    newColorRamp: string[],
    colorMode?: ColorMode,
  ) => {
    const updatedTheme = { ...theme };

    const themesTypes = {
      simple: () => {
        (updatedTheme as SimpleTheme).theme.semanticColors[1] = {
          name: 'warning',
          colorRamp: newColorRamp,
          background: [
            {
              name: 'background',
              value: newColorRamp[0],
            },
          ],
          variants: [
            {
              name: 'warning',
              value: newColorRamp[5],
            },
            {
              name: 'warning_hover',
              value: newColorRamp[6],
            },
            {
              name: 'warning_active',
              value: newColorRamp[7],
            },
          ],
        };
        setTheme({ ...updatedTheme });
      },
      dual: () => {
        const colorModes = {
          light: () => {
            (updatedTheme as DualTheme).lightTheme.semanticColors[1] = {
              name: 'warning',
              colorRamp: newColorRamp,
              background: [
                {
                  name: 'background',
                  value: newColorRamp[0],
                },
              ],
              variants: [
                {
                  name: 'warning',
                  value: newColorRamp[5],
                },
                {
                  name: 'warning_hover',
                  value: newColorRamp[6],
                },
                {
                  name: 'warning_active',
                  value: newColorRamp[7],
                },
              ],
            };
          },
          dark: () => {
            (updatedTheme as DualTheme).darkTheme.semanticColors[1] = {
              name: 'warning',
              colorRamp: newColorRamp,
              background: [
                {
                  name: 'background',
                  value: newColorRamp[0],
                },
              ],
              variants: [
                {
                  name: 'warning',
                  value: newColorRamp[4],
                },
                {
                  name: 'warning_hover',
                  value: newColorRamp[5],
                },
                {
                  name: 'warning_active',
                  value: newColorRamp[6],
                },
              ],
            };
          },
        };

        colorModes[colorMode as ColorMode]();
        setTheme({ ...updatedTheme });
      },
    };

    themesTypes[themeType]();
  };

  const changeWarningStateColor = (
    index: number,
    newValue: string,
    colorMode?: ColorMode,
  ) => {
    const themeTypes = {
      simple: () => {
        const updatedTheme = theme as SimpleTheme;
        updatedTheme.theme.semanticColors[1].variants[index].value = newValue;

        setTheme({ ...updatedTheme });
      },
      dual: () => {
        const updatedTheme = theme as DualTheme;
        const colorModes = {
          light: () =>
            (updatedTheme.lightTheme.semanticColors[1].variants[index].value =
              newValue),
          dark: () =>
            (updatedTheme.darkTheme.semanticColors[1].variants[index].value =
              newValue),
        };

        colorModes[colorMode as ColorMode]();
        setTheme({ ...updatedTheme });
      },
    };

    themeTypes[themeType]();
  };

  const changeWarningBackgroundColor = (
    index: number,
    newValue: string,
    colorMode?: ColorMode,
  ) => {
    const themeTypes = {
      simple: () => {
        const updatedTheme = theme as SimpleTheme;
        updatedTheme.theme.semanticColors[1].background[index].value = newValue;

        setTheme({ ...updatedTheme });
      },
      dual: () => {
        const updatedTheme = theme as DualTheme;
        const colorModes = {
          light: () =>
            (updatedTheme.lightTheme.semanticColors[1].background[index].value =
              newValue),
          dark: () =>
            (updatedTheme.darkTheme.semanticColors[1].background[index].value =
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
    addNewContrastBackgroundSpace,
    removeContrastBackgroundSpace,
    changeContrastBackgroundColor,
    changeTextColor,
    changeContrastTextColor,
    changeBorderColor,
    changeContrastBorderColor,
    resetBaseColorSections,
    changeSuccessColorRamp,
    changeSuccessStateColor,
    changeSuccessBackgroundColor,
    changeWarningColorRamp,
    changeWarningStateColor,
    changeWarningBackgroundColor,
  };

  return { themeType, theme, themeActions };
};
