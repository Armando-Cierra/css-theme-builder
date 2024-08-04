import { uid } from 'uid';
import chroma from 'chroma-js';
import { DualTheme, SimpleTheme, ThemeType } from '@/types';

const defaultContrastPercentages = [
  0, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 1,
];

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
  const successColorScale = getColorScale();
  const warningColorScale = getColorScale();
  const dangerColorScale = getColorScale();

  const lightTheme = {
    contrastPercentages: defaultContrastPercentages,
    baseColor: {
      colorRamp: baseColorScale,
      backgorunds: [
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
      constrastBackgorunds: [
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
            value: successColorScale[6],
          },
          {
            name: 'interactive_1',
            value: successColorScale[7],
          },
          {
            name: 'interactive_2',
            value: successColorScale[8],
          },
        ],
        background: {
          name: 'background',
          value: successColorScale[0],
        },
      },
      {
        name: 'danger',
        colorRamp: dangerColorScale,
        variants: [
          {
            name: 'success',
            value: dangerColorScale[6],
          },
          {
            name: 'interactive_1',
            value: dangerColorScale[7],
          },
          {
            name: 'interactive_2',
            value: dangerColorScale[8],
          },
        ],
        background: {
          name: 'background',
          value: dangerColorScale[0],
        },
      },
      {
        name: 'warning',
        colorRamp: warningColorScale,
        variants: [
          {
            name: 'success',
            value: warningColorScale[6],
          },
          {
            name: 'interactive_1',
            value: warningColorScale[7],
          },
          {
            name: 'interactive_2',
            value: warningColorScale[8],
          },
        ],
        background: {
          name: 'background',
          value: warningColorScale[0],
        },
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
            colorRamp: baseColorScale,
            backgorunds: [
              {
                name: 'background_1',
                value: baseColorScale[baseColorScale.length - 1],
              },
              {
                name: 'background_2',
                value: baseColorScale[baseColorScale.length - 2],
              },
              {
                name: 'background_3',
                value: baseColorScale[baseColorScale.length - 3],
              },
            ],
            constrastBackgorunds: [
              {
                name: 'background_contrast_1',
                value: baseColorScale[0],
              },
              {
                name: 'background_contrast_2',
                value: baseColorScale[1],
              },
              {
                name: 'background_contrast_3',
                value: baseColorScale[2],
              },
            ],
            text: [
              {
                name: 'text',
                value: baseColorScale[0],
              },
              {
                name: 'text_muted',
                value: baseColorScale[3],
              },
            ],
            contrastText: [
              {
                name: 'text',
                value: baseColorScale[baseColorScale.length - 1],
              },
              {
                name: 'text_muted',
                value: baseColorScale[baseColorScale.length - 4],
              },
            ],
            borders: [
              {
                name: 'border',
                value: baseColorScale[baseColorScale.length - 4],
              },
              {
                name: 'border_active',
                value: baseColorScale[baseColorScale.length - 5],
              },
            ],
            contrastBorders: [
              {
                name: 'border_contrast',
                value: baseColorScale[3],
              },
              {
                name: 'border_contrast_active',
                value: baseColorScale[5],
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
                  value: successColorScale[6],
                },
                {
                  name: 'interactive_1',
                  value: successColorScale[5],
                },
                {
                  name: 'interactive_2',
                  value: successColorScale[4],
                },
              ],
              background: {
                name: 'background',
                value: successColorScale[successColorScale.length - 1],
              },
            },
            {
              name: 'danger',
              colorRamp: dangerColorScale,
              variants: [
                {
                  name: 'success',
                  value: dangerColorScale[6],
                },
                {
                  name: 'interactive_1',
                  value: dangerColorScale[5],
                },
                {
                  name: 'interactive_2',
                  value: dangerColorScale[4],
                },
              ],
              background: {
                name: 'background',
                value: dangerColorScale[dangerColorScale.length - 1],
              },
            },
            {
              name: 'warning',
              colorRamp: warningColorScale,
              variants: [
                {
                  name: 'success',
                  value: warningColorScale[6],
                },
                {
                  name: 'interactive_1',
                  value: warningColorScale[5],
                },
                {
                  name: 'interactive_2',
                  value: warningColorScale[4],
                },
              ],
              background: {
                name: 'background',
                value: warningColorScale[warningColorScale.length - 1],
              },
            },
          ],
          customColors: [],
        },
      };
    },
  };

  return themeTypes[type]();
};
