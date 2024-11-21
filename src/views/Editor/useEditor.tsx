import { useState } from 'react';
import { Location } from 'react-router-dom';
import { getInitialSettingsForTheme, updateSemanticColors } from '@/utils';
import {
  BaseColor,
  ColorMode,
  ColorVariable,
  DualTheme,
  SemanticColors,
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
    const updateContrastPercentages = (
      updatedTheme: SimpleTheme | DualTheme,
    ) => {
      if (themeType === 'simple') {
        (updatedTheme as SimpleTheme).theme.contrastPercentages =
          newContrastPercentages;
      } else {
        const dualTheme = updatedTheme as DualTheme;
        const targetTheme =
          colorMode === 'dark' ? dualTheme.darkTheme : dualTheme.lightTheme;
        targetTheme.contrastPercentages = newContrastPercentages;
      }
      setTheme({ ...updatedTheme });
    };

    updateContrastPercentages(theme);
  };

  //Base Color Actions
  const editBaseColorRamp = (newColorRamp: string[], colorMode?: ColorMode) => {
    const updatedBaseColorProperties = {
      colorRamp: newColorRamp,
      backgrounds: Array.from({ length: 3 }, (_, i) => ({
        name: `background_${i + 1}`,
        value: newColorRamp[i],
      })),
      contrastBackgrounds: Array.from({ length: 3 }, (_, i) => ({
        name: `background_contrast_${i + 1}`,
        value: newColorRamp[newColorRamp.length - 1 - i],
      })),
      text: [
        { name: 'text', value: newColorRamp[newColorRamp.length - 1] },
        { name: 'text_muted', value: newColorRamp[newColorRamp.length - 4] },
      ],
      contrastText: [
        { name: 'text', value: newColorRamp[0] },
        { name: 'text_muted', value: newColorRamp[3] },
      ],
      borders: [
        { name: 'border', value: newColorRamp[3] },
        { name: 'border_active', value: newColorRamp[5] },
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

    const applyUpdates = (
      updatedTheme: SimpleTheme | DualTheme,
      mode?: ColorMode,
    ) => {
      const targetTheme =
        themeType === 'simple'
          ? (updatedTheme as SimpleTheme).theme
          : mode === 'dark'
            ? (updatedTheme as DualTheme).darkTheme
            : (updatedTheme as DualTheme).lightTheme;

      targetTheme.baseColor = updatedBaseColorProperties;
      targetTheme.semanticColors = updateSemanticColors(
        updatedTheme,
        themeType,
        newColorRamp,
        mode,
      );
    };

    const updatedTheme = { ...theme };
    if (themeType === 'simple') {
      applyUpdates(updatedTheme as SimpleTheme);
    } else if (colorMode) {
      applyUpdates(updatedTheme as DualTheme, colorMode);
    }

    setTheme(updatedTheme);
  };

  const addBackgroundSpace = (
    property: 'backgrounds' | 'contrastBackgrounds',
  ) => {
    const addSpaceToBaseColor = (baseColor: {
      backgrounds: ColorVariable[];
      contrastBackgrounds: ColorVariable[];
      colorRamp: string[];
    }) => {
      const newSpaceIndex = baseColor[property].length;
      const rampIndex =
        property === 'backgrounds'
          ? newSpaceIndex
          : baseColor.colorRamp.length - 1 - newSpaceIndex;

      baseColor[property] = [
        ...baseColor[property],
        {
          name: `${property}_${newSpaceIndex}`,
          value: baseColor.colorRamp[rampIndex],
        },
      ];
    };

    const updatedTheme = { ...theme };

    if (themeType === 'simple') {
      addSpaceToBaseColor((updatedTheme as SimpleTheme).theme.baseColor);
    } else {
      const dualTheme = updatedTheme as DualTheme;
      addSpaceToBaseColor(dualTheme.lightTheme.baseColor);
      addSpaceToBaseColor(dualTheme.darkTheme.baseColor);
    }

    setTheme(updatedTheme);
  };

  const removeBackgroundSpace = (
    index: number,
    property: 'backgrounds' | 'contrastBackgrounds',
  ) => {
    const updateNames = (colorArray: ColorVariable[]) =>
      colorArray.map((color, i) => ({
        ...color,
        name: `${property}_${i + 1}`,
      }));

    const removeSpaceAndRename = (baseColor: {
      backgrounds: ColorVariable[];
      contrastBackgrounds: ColorVariable[];
    }) => {
      baseColor[property].splice(index, 1); // Eliminar el elemento en el índice especificado
      baseColor[property] = updateNames(baseColor[property]); // Renombrar los elementos restantes
    };

    const updatedTheme = { ...theme };

    if (themeType === 'simple') {
      removeSpaceAndRename((updatedTheme as SimpleTheme).theme.baseColor);
    } else {
      const dualTheme = updatedTheme as DualTheme;
      removeSpaceAndRename(dualTheme.lightTheme.baseColor);
      removeSpaceAndRename(dualTheme.darkTheme.baseColor);
    }

    setTheme(updatedTheme);
  };

  const changeBaseColorProperty = (
    property:
      | 'backgrounds'
      | 'contrastBackgrounds'
      | 'text'
      | 'contrastText'
      | 'borders'
      | 'contrastBorders',
    index: number,
    newValue: string,
    colorMode?: ColorMode,
  ) => {
    const updateProperty = (baseColor: BaseColor) => {
      if (Array.isArray(baseColor[property]) && baseColor[property][index]) {
        baseColor[property][index].value = newValue;
      }
    };

    const updatedTheme = { ...theme };

    if (themeType === 'simple') {
      updateProperty((updatedTheme as SimpleTheme).theme.baseColor);
    } else {
      const dualTheme = updatedTheme as DualTheme;
      const modeBaseColor =
        colorMode === 'light'
          ? dualTheme.lightTheme.baseColor
          : dualTheme.darkTheme.baseColor;
      updateProperty(modeBaseColor);
    }

    setTheme(updatedTheme);
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
  const changeSemanticColorRamp = (
    colorName: SemanticColors,
    newColorRamp: string[],
    colorMode?: ColorMode,
  ) => {
    const updatedTheme = { ...theme };

    const createColorConfig = (ramp: string[]) => ({
      name: colorName,
      colorRamp: ramp,
      background: [
        {
          name: 'background',
          value: ramp[0],
        },
      ],
      variants: [
        {
          name: colorName,
          value: ramp[4],
        },
        {
          name: `${colorName}_hover`,
          value: ramp[5],
        },
        {
          name: `${colorName}_active`,
          value: ramp[6],
        },
      ],
    });

    const colors = {
      primary: 0,
      secondary: 1,
      success: 2,
      warning: 3,
      danger: 4,
    };

    const themesTypes = {
      simple: () => {
        (updatedTheme as SimpleTheme).theme.semanticColors[colors[colorName]] =
          createColorConfig(newColorRamp);
        setTheme({ ...updatedTheme });
      },
      dual: () => {
        const colorModes = {
          light: () => {
            (updatedTheme as DualTheme).lightTheme.semanticColors[
              colors[colorName]
            ] = createColorConfig(newColorRamp);
          },
          dark: () => {
            (updatedTheme as DualTheme).darkTheme.semanticColors[
              colors[colorName]
            ] = createColorConfig(newColorRamp);
          },
        };

        colorModes[colorMode as ColorMode]();
        setTheme({ ...updatedTheme });
      },
    };

    themesTypes[themeType]();
  };

  const changeSemanticStateColor = (
    colorName: SemanticColors,
    index: number,
    newValue: string,
    colorMode?: ColorMode,
  ) => {
    const colors = {
      primary: 0,
      secondary: 1,
      success: 2,
      warning: 3,
      danger: 4,
    };

    const themeTypes = {
      simple: () => {
        const updatedTheme = theme as SimpleTheme;
        updatedTheme.theme.semanticColors[colors[colorName]].variants[
          index
        ].value = newValue;

        setTheme({ ...updatedTheme });
      },
      dual: () => {
        const updatedTheme = theme as DualTheme;
        const colorModes = {
          light: () =>
            (updatedTheme.lightTheme.semanticColors[colors[colorName]].variants[
              index
            ].value = newValue),
          dark: () =>
            (updatedTheme.darkTheme.semanticColors[colors[colorName]].variants[
              index
            ].value = newValue),
        };

        colorModes[colorMode as ColorMode]();
        setTheme({ ...updatedTheme });
      },
    };

    themeTypes[themeType]();
  };

  const changeSemanticBackgroundColor = (
    colorName: SemanticColors,
    index: number,
    newValue: string,
    colorMode?: ColorMode,
  ) => {
    const colors = {
      primary: 0,
      secondary: 1,
      success: 2,
      warning: 3,
      danger: 4,
    };

    const themeTypes = {
      simple: () => {
        const updatedTheme = theme as SimpleTheme;
        updatedTheme.theme.semanticColors[colors[colorName]].background[
          index
        ].value = newValue;

        setTheme({ ...updatedTheme });
      },
      dual: () => {
        const updatedTheme = theme as DualTheme;
        const colorModes = {
          light: () =>
            (updatedTheme.lightTheme.semanticColors[
              colors[colorName]
            ].background[index].value = newValue),
          dark: () =>
            (updatedTheme.darkTheme.semanticColors[
              colors[colorName]
            ].background[index].value = newValue),
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
    changeBaseColorProperty,
    addBackgroundSpace,
    removeBackgroundSpace,
    resetBaseColorSections,
    changeSemanticColorRamp,
    changeSemanticStateColor,
    changeSemanticBackgroundColor,
  };

  return { themeType, theme, themeActions };
};
