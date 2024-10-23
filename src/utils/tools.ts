import { uid } from 'uid';
import chroma from 'chroma-js';
import { DualTheme, SimpleTheme, ThemeType } from '@/types';

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
  const invertedaseColorScale = getColorScale().reverse();

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
        name: 'danger',
        colorRamp: dangerColorScale,
        variants: [
          {
            name: 'danger',
            value: dangerColorScale[6],
          },
          {
            name: 'danger_hover',
            value: dangerColorScale[7],
          },
          {
            name: 'danger_active',
            value: dangerColorScale[8],
          },
        ],
        background: [
          {
            name: 'background',
            value: dangerColorScale[0],
          },
        ],
      },
      {
        name: 'warning',
        colorRamp: warningColorScale,
        variants: [
          {
            name: 'warning',
            value: warningColorScale[6],
          },
          {
            name: 'warning_hover',
            value: warningColorScale[7],
          },
          {
            name: 'warning_active',
            value: warningColorScale[8],
          },
        ],
        background: [
          {
            name: 'background',
            value: warningColorScale[0],
          },
        ],
      },
    ],
    customColors: [],
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
            colorRamp: invertedaseColorScale,
            backgrounds: [
              {
                name: 'background_1',
                value: invertedaseColorScale[0],
              },
              {
                name: 'background_2',
                value: invertedaseColorScale[1],
              },
              {
                name: 'background_3',
                value: invertedaseColorScale[2],
              },
            ],
            contrastBackgrounds: [
              {
                name: 'background_contrast_1',
                value: invertedaseColorScale[baseColorScale.length - 1],
              },
              {
                name: 'background_contrast_2',
                value: invertedaseColorScale[baseColorScale.length - 2],
              },
              {
                name: 'background_contrast_3',
                value: invertedaseColorScale[baseColorScale.length - 3],
              },
            ],
            text: [
              {
                name: 'text',
                value: invertedaseColorScale[baseColorScale.length - 1],
              },
              {
                name: 'text_muted',
                value: invertedaseColorScale[baseColorScale.length - 4],
              },
            ],
            contrastText: [
              {
                name: 'text',
                value: invertedaseColorScale[0],
              },
              {
                name: 'text_muted',
                value: invertedaseColorScale[3],
              },
            ],
            borders: [
              {
                name: 'border',
                value: invertedaseColorScale[3],
              },
              {
                name: 'border_active',
                value: invertedaseColorScale[5],
              },
            ],
            contrastBorders: [
              {
                name: 'border_contrast',
                value: invertedaseColorScale[invertedaseColorScale.length - 4],
              },
              {
                name: 'border_contrast_active',
                value: invertedaseColorScale[invertedaseColorScale.length - 5],
              },
            ],
          },
          semanticColors: [
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
              name: 'danger',
              colorRamp: invertedDangerColorScale,
              variants: [
                {
                  name: 'danger',
                  value: invertedDangerColorScale[6],
                },
                {
                  name: 'danger_hover',
                  value: invertedDangerColorScale[7],
                },
                {
                  name: 'danger_active',
                  value: invertedDangerColorScale[8],
                },
              ],
              background: [
                {
                  name: 'background',
                  value: invertedDangerColorScale[0],
                },
              ],
            },
            {
              name: 'warning',
              colorRamp: invertedWarningColorScale,
              variants: [
                {
                  name: 'warning',
                  value: invertedWarningColorScale[6],
                },
                {
                  name: 'warning_hover',
                  value: invertedWarningColorScale[7],
                },
                {
                  name: 'warning_active',
                  value: invertedWarningColorScale[8],
                },
              ],
              background: [
                {
                  name: 'background',
                  value: invertedWarningColorScale[0],
                },
              ],
            },
          ],
          customColors: [],
        },
      };
    },
  };

  return themeTypes[type]();
};
