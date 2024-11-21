import { Fragment } from 'react/jsx-runtime';
import { HexColorPicker } from 'react-colorful';
import { IconCopy, IconInfoCircle } from '@tabler/icons-react';
import { uid } from 'uid';
import { Accordion, PaletteDisplayer } from '../../components';
import { useSemanticColors } from './useSemanticColors';
import { useSemanticColorsControls } from './useSemanticColorsControls';
import { Input } from '@/components';
import { getDynamicContrastColor, tooltipID } from '@/utils';
import { SemanticColors as SemanticColorNames } from '@/types';
import './semanticColors.scss';

export const SemanticColors = () => {
  const {
    t,
    copyColor,
    themeType,
    semanticColors,
    selectedMode,
    onSelectColorMode,
    handleColorRampsChange,
    editSuccessStateColor,
    editSuccessBackgroundColor,
  } = useSemanticColors();

  const { inputColors, handleInputColorChange } = useSemanticColorsControls({
    colors: {
      primary: semanticColors[0].colorRamp[5],
      secondary: semanticColors[1].colorRamp[5],
      success: semanticColors[2].colorRamp[5],
      warning: semanticColors[3].colorRamp[5],
      danger: semanticColors[4].colorRamp[5],
    },
    handleColorRampsChange,
  });

  return (
    <Accordion
      title={t('editor.semanticColors.title')}
      description={t('editor.semanticColors.description')}
      themeType={themeType}
      selectedMode={selectedMode}
      onSelectColorMode={onSelectColorMode}
      className="editor_semanticColors"
      isDefaultOpen
    >
      {semanticColors.map((semanticColor) => (
        <Fragment key={semanticColor.name}>
          <span className="editor_semanticColors_title">
            {semanticColor.name}
          </span>
          <div className="editor_semanticColors_color">
            <div className="editor_semanticColors_colorPickersBox">
              <div className="editor_semanticColors_colorPicker">
                <HexColorPicker
                  color={semanticColor.colorRamp[5]}
                  onChange={handleColorRampsChange(
                    semanticColor.name as SemanticColorNames,
                  )}
                />
                <div className="editor_semanticColors_colorPickerControl">
                  <div className="editor_semanticColors_colorPickerControlLabel">
                    <span>{t('editor.semanticColors.baseColor')}</span>
                  </div>
                  <Input
                    value={inputColors[semanticColor.name]}
                    onChange={handleInputColorChange(semanticColor.name)}
                  />
                </div>
              </div>
            </div>
            <div className="editor_semanticColors_colorRamp">
              <div className="editor_semanticColors_colorRampLabel">
                <span>{t('editor.semanticColors.colorRamp')}</span>
                <IconInfoCircle
                  data-tooltip-id={tooltipID}
                  data-tooltip-html={t(
                    `editor.semanticColors.${semanticColor.name}Info`,
                  )}
                />
              </div>
              <div className="editor_semanticColors_scaleBox">
                {semanticColor.colorRamp.map((color, index) => (
                  <div
                    key={uid()}
                    className="editor_semanticColors_scaleStep"
                    style={{ background: color }}
                    onClick={copyColor(color)}
                    data-tooltip-id={tooltipID}
                    data-tooltip-html={color}
                    data-tooltip-place="bottom"
                  >
                    {index !== 5 && (
                      <IconCopy
                        style={{ color: getDynamicContrastColor(color) }}
                      />
                    )}
                    {index === 5 && (
                      <div className="editor_semanticColors_centerScaleStep">
                        <IconCopy
                          style={{ color: getDynamicContrastColor(color) }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="editor_semanticColors_sectionsBox">
                <PaletteDisplayer
                  colors={semanticColor.background}
                  minArray={1}
                  maxArray={1}
                  title={t('editor.semanticColors.background')}
                  editColorAction={editSuccessBackgroundColor}
                />
                <PaletteDisplayer
                  colors={semanticColor.variants}
                  minArray={3}
                  maxArray={3}
                  title={t('editor.semanticColors.states')}
                  editColorAction={editSuccessStateColor}
                />
              </div>
            </div>
          </div>
        </Fragment>
      ))}
    </Accordion>
  );
};
