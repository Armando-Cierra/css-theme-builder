import { uid } from 'uid';
import chroma from 'chroma-js';
import {
  ColorMode,
  ColorVariable,
  CustomColor,
  DualTheme,
  SimpleTheme,
  ThemeItem,
  ThemeType,
} from '@/types';

export const defaultContrastPercentages = [
  0, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 1,
];

export const getDynamicContrastColor = (color: string) => {
  return chroma(color).luminance() > 0.5 ? 'black' : 'white';
};

export const getColorScale = (settings?: {
  baseColor?: string;
  color?: string;
  contrastColor?: string;
  contrastPercentages?: number[];
}) => {
  let chromaSettings;

  if (settings) {
    chromaSettings = {
      baseColor: settings.baseColor ?? 'white',
      color: settings.color,
      contrastColor: settings.contrastColor ?? 'black',
      contrastPercentages:
        settings.contrastPercentages ?? defaultContrastPercentages,
    };
  } else {
    chromaSettings = {
      baseColor: 'white',
      contrastColor: 'black',
      contrastPercentages: defaultContrastPercentages,
    };
  }

  const { baseColor, color, contrastColor, contrastPercentages } =
    chromaSettings;

  const scale = color
    ? chroma.scale([baseColor, color, contrastColor])
    : chroma.scale([baseColor, contrastColor]);

  const colorRamp: string[] = [];
  contrastPercentages.forEach((e) => {
    colorRamp.push(scale(e).hex());
  });

  return colorRamp;
};

export const getInitialSettingsForTheme = (type: ThemeType) => {
  const baseColorScale = getColorScale();
  const invertedBaseColorScale = getColorScale().reverse();

  const primaryColorScale = getColorScale({ color: '#3b82f6' });
  primaryColorScale.shift();
  primaryColorScale.pop();
  const invertedPrimaryColorScale = [...primaryColorScale].reverse();

  const secondaryColorScale = getColorScale({ color: '#7c3aed' });
  secondaryColorScale.shift();
  secondaryColorScale.pop();
  const invertedSecondaryColorScale = [...secondaryColorScale].reverse();

  const successColorScale = getColorScale({ color: '#22c55e' });
  successColorScale.shift();
  successColorScale.pop();
  const invertedSuccessColorScale = [...successColorScale].reverse();

  const warningColorScale = getColorScale({ color: '#f59e0b' });
  warningColorScale.shift();
  warningColorScale.pop();
  const invertedWarningColorScale = [...warningColorScale].reverse();

  const dangerColorScale = getColorScale({ color: '#ef4444' });
  dangerColorScale.shift();
  dangerColorScale.pop();
  const invertedDangerColorScale = [...dangerColorScale].reverse();

  const lightTheme = {
    contrastPercentages: defaultContrastPercentages,
    baseColor: {
      colorRamp: baseColorScale,
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
    },
    semanticColors: [
      {
        name: 'primary',
        colorRamp: primaryColorScale,
        variants: [
          {
            name: 'primary',
            value: primaryColorScale[5],
          },
          {
            name: 'primary_hover',
            value: primaryColorScale[6],
          },
          {
            name: 'primary_active',
            value: primaryColorScale[7],
          },
        ],
        background: [
          {
            name: 'background',
            value: primaryColorScale[0],
          },
        ],
      },
      {
        name: 'secondary',
        colorRamp: secondaryColorScale,
        variants: [
          {
            name: 'secondary',
            value: secondaryColorScale[5],
          },
          {
            name: 'secondary_hover',
            value: secondaryColorScale[6],
          },
          {
            name: 'secondary_active',
            value: secondaryColorScale[7],
          },
        ],
        background: [
          {
            name: 'background',
            value: secondaryColorScale[0],
          },
        ],
      },
      {
        name: 'success',
        colorRamp: successColorScale,
        variants: [
          {
            name: 'success',
            value: successColorScale[5],
          },
          {
            name: 'success_hover',
            value: successColorScale[6],
          },
          {
            name: 'success_active',
            value: successColorScale[7],
          },
        ],
        background: [
          {
            name: 'background',
            value: successColorScale[0],
          },
        ],
      },
      {
        name: 'warning',
        colorRamp: warningColorScale,
        variants: [
          {
            name: 'warning',
            value: warningColorScale[5],
          },
          {
            name: 'warning_hover',
            value: warningColorScale[6],
          },
          {
            name: 'warning_active',
            value: warningColorScale[7],
          },
        ],
        background: [
          {
            name: 'background',
            value: warningColorScale[0],
          },
        ],
      },
      {
        name: 'danger',
        colorRamp: dangerColorScale,
        variants: [
          {
            name: 'danger',
            value: dangerColorScale[5],
          },
          {
            name: 'danger_hover',
            value: dangerColorScale[6],
          },
          {
            name: 'danger_active',
            value: dangerColorScale[7],
          },
        ],
        background: [
          {
            name: 'background',
            value: dangerColorScale[0],
          },
        ],
      },
    ],
  };

  const themeTypes = {
    simple: (): SimpleTheme => {
      return {
        name: 'New Theme',
        id: uid(),
        type: 'simple',
        favorite: false,
        theme: lightTheme,
      };
    },
    dual: (): DualTheme => {
      return {
        name: 'New Theme',
        id: uid(),
        type: 'dual',
        favorite: false,
        lightTheme,
        darkTheme: {
          contrastPercentages: defaultContrastPercentages,
          baseColor: {
            colorRamp: invertedBaseColorScale,
            backgrounds: [
              {
                name: 'background_1',
                value: invertedBaseColorScale[0],
              },
              {
                name: 'background_2',
                value: invertedBaseColorScale[1],
              },
              {
                name: 'background_3',
                value: invertedBaseColorScale[2],
              },
            ],
            contrastBackgrounds: [
              {
                name: 'background_contrast_1',
                value: invertedBaseColorScale[baseColorScale.length - 1],
              },
              {
                name: 'background_contrast_2',
                value: invertedBaseColorScale[baseColorScale.length - 2],
              },
              {
                name: 'background_contrast_3',
                value: invertedBaseColorScale[baseColorScale.length - 3],
              },
            ],
            text: [
              {
                name: 'text',
                value: invertedBaseColorScale[baseColorScale.length - 1],
              },
              {
                name: 'text_muted',
                value: invertedBaseColorScale[baseColorScale.length - 4],
              },
            ],
            contrastText: [
              {
                name: 'text',
                value: invertedBaseColorScale[0],
              },
              {
                name: 'text_muted',
                value: invertedBaseColorScale[3],
              },
            ],
            borders: [
              {
                name: 'border',
                value: invertedBaseColorScale[3],
              },
              {
                name: 'border_active',
                value: invertedBaseColorScale[5],
              },
            ],
            contrastBorders: [
              {
                name: 'border_contrast',
                value:
                  invertedBaseColorScale[invertedBaseColorScale.length - 4],
              },
              {
                name: 'border_contrast_active',
                value:
                  invertedBaseColorScale[invertedBaseColorScale.length - 5],
              },
            ],
          },
          semanticColors: [
            {
              name: 'primary',
              colorRamp: invertedPrimaryColorScale,
              variants: [
                {
                  name: 'primary',
                  value: invertedPrimaryColorScale[4],
                },
                {
                  name: 'primary_hover',
                  value: invertedPrimaryColorScale[5],
                },
                {
                  name: 'primary_active',
                  value: invertedPrimaryColorScale[6],
                },
              ],
              background: [
                {
                  name: 'background',
                  value: invertedPrimaryColorScale[0],
                },
              ],
            },
            {
              name: 'secondary',
              colorRamp: invertedSecondaryColorScale,
              variants: [
                {
                  name: 'secondary',
                  value: invertedSecondaryColorScale[4],
                },
                {
                  name: 'secondary_hover',
                  value: invertedSecondaryColorScale[5],
                },
                {
                  name: 'secondary_active',
                  value: invertedSecondaryColorScale[6],
                },
              ],
              background: [
                {
                  name: 'background',
                  value: invertedSecondaryColorScale[0],
                },
              ],
            },
            {
              name: 'success',
              colorRamp: invertedSuccessColorScale,
              variants: [
                {
                  name: 'success',
                  value: invertedSuccessColorScale[4],
                },
                {
                  name: 'success_hover',
                  value: invertedSuccessColorScale[5],
                },
                {
                  name: 'success_active',
                  value: invertedSuccessColorScale[6],
                },
              ],
              background: [
                {
                  name: 'background',
                  value: invertedSuccessColorScale[0],
                },
              ],
            },
            {
              name: 'warning',
              colorRamp: invertedWarningColorScale,
              variants: [
                {
                  name: 'warning',
                  value: invertedWarningColorScale[4],
                },
                {
                  name: 'warning_hover',
                  value: invertedWarningColorScale[5],
                },
                {
                  name: 'warning_active',
                  value: invertedWarningColorScale[6],
                },
              ],
              background: [
                {
                  name: 'background',
                  value: invertedWarningColorScale[0],
                },
              ],
            },
            {
              name: 'danger',
              colorRamp: invertedDangerColorScale,
              variants: [
                {
                  name: 'danger',
                  value: invertedDangerColorScale[4],
                },
                {
                  name: 'danger_hover',
                  value: invertedDangerColorScale[5],
                },
                {
                  name: 'danger_active',
                  value: invertedDangerColorScale[6],
                },
              ],
              background: [
                {
                  name: 'background',
                  value: invertedDangerColorScale[0],
                },
              ],
            },
          ],
        },
      };
    },
  };

  return themeTypes[type]();
};

export const updateSemanticColors = (
  updatedTheme: ThemeItem,
  themeType: ThemeType,
  newColorRamp: string[],
  colorMode?: ColorMode,
) => {
  if (themeType === 'simple') {
    const semanticColors: CustomColor[] = [];

    (updatedTheme as SimpleTheme).theme.semanticColors.forEach(
      (semanticColor, index) => {
        const rawColorRamp = getColorScale({
          baseColor: newColorRamp[0],
          color: (updatedTheme as SimpleTheme).theme.semanticColors[index]
            .colorRamp[5],
          contrastColor: newColorRamp[newColorRamp.length - 1],
        });
        rawColorRamp.shift();
        rawColorRamp.pop();

        const colorRamp = rawColorRamp;
        const getVariants = (index: number) => {
          const variants: ColorVariable[] = [];

          (updatedTheme as SimpleTheme).theme.semanticColors[
            index
          ].variants.forEach((item, variantsIndex) =>
            variants.push({ ...item, value: colorRamp[variantsIndex + 5] }),
          );

          return variants;
        };

        semanticColors.push({
          ...semanticColor,
          colorRamp,
          variants: getVariants(index),
          background: [{ name: 'background', value: colorRamp[0] }],
        });
      },
    );

    return semanticColors;
  } else {
    if (colorMode === 'light') {
      const semanticColors: CustomColor[] = [];

      (updatedTheme as DualTheme).lightTheme.semanticColors.forEach(
        (semanticColor, index) => {
          const rawColorRamp = getColorScale({
            baseColor: newColorRamp[0],
            color: (updatedTheme as DualTheme).lightTheme.semanticColors[index]
              .colorRamp[5],
            contrastColor: newColorRamp[newColorRamp.length - 1],
          });
          rawColorRamp.shift();
          rawColorRamp.pop();

          const colorRamp = rawColorRamp;
          const getVariants = (index: number) => {
            const variants: ColorVariable[] = [];

            (updatedTheme as DualTheme).lightTheme.semanticColors[
              index
            ].variants.forEach((item, variantsIndex) =>
              variants.push({
                ...item,
                value: colorRamp[variantsIndex + 5],
              }),
            );

            return variants;
          };

          semanticColors.push({
            ...semanticColor,
            colorRamp,
            variants: getVariants(index),
            background: [{ name: 'background', value: colorRamp[0] }],
          });
        },
      );

      return semanticColors;
    } else {
      const semanticColors: CustomColor[] = [];

      (updatedTheme as DualTheme).darkTheme.semanticColors.forEach(
        (semanticColor, index) => {
          const rawColorRamp = getColorScale({
            baseColor: newColorRamp[0],
            color: (updatedTheme as DualTheme).darkTheme.semanticColors[index]
              .colorRamp[5],
            contrastColor: newColorRamp[newColorRamp.length - 1],
          });
          rawColorRamp.shift();
          rawColorRamp.pop();

          const colorRamp = rawColorRamp;
          const getVariants = (index: number) => {
            const variants: ColorVariable[] = [];

            (updatedTheme as DualTheme).darkTheme.semanticColors[
              index
            ].variants.forEach((item, variantsIndex) =>
              variants.push({
                ...item,
                value: colorRamp[variantsIndex + 5],
              }),
            );

            return variants;
          };

          semanticColors.push({
            ...semanticColor,
            colorRamp,
            variants: getVariants(index),
            background: [{ name: 'background', value: colorRamp[0] }],
          });
        },
      );

      return semanticColors;
    }
  }
};

