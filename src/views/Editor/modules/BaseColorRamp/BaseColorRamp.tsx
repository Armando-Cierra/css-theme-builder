import { uid } from 'uid';
import { HexColorPicker } from 'react-colorful';
import { IconReload, IconCopy, IconInfoCircle } from '@tabler/icons-react';
import { Input, Button } from '@/components';
import { getDynamicContrastColor } from '@/utils/tools';
import { Accordion } from '../../components';
import { useBaseColorRamp } from './useBaseColorRamp';
import { useBaseColorRampControls } from './useBaseColorRampControls';
import { tooltipID } from '@/utils';
import './baseColorRamp.scss';

export const BaseColorRamp = () => {
  const {
    t,
    copyColor,
    theme,
    selectedMode,
    onSelectColorMode,
    baseColor,
    contrastColor,
    colorRamp,
    handleColorRampChange,
    contrastPercentages,
    handleContrastPercentagesChange,
    resetValues,
    contrastStandadizationValidation,
    standardizeContrastsPercentages,
    colorStandadizationValidation,
    standardizeColors,
  } = useBaseColorRamp();

  const {
    inputBaseColor,
    inputContrastColor,
    handleInputColorChange,
    inputContrastPercentages,
    handleInputContrastPercentageChange,
  } = useBaseColorRampControls({
    baseColor,
    contrastColor,
    handleColorRampChange,
    contrastPercentages,
    handleContrastPercentagesChange,
  });

  return (
    <Accordion
      title={t('editor.baseColorRamp.title')}
      description={t('editor.baseColorRamp.description')}
      themeType={theme.type}
      selectedMode={selectedMode}
      onSelectColorMode={onSelectColorMode}
      className="editor_baseColorRamp"
      isDefaultOpen
    >
      <div className="editor_baseColorRamp_colorPickersBox">
        <div className="editor_baseColorRamp_colorPicker">
          <HexColorPicker
            color={baseColor}
            onChange={handleColorRampChange('base')}
          />
          <div className="editor_baseColorRamp_colorPickerControl">
            <div className="editor_baseColorRamp_colorPickerControlLabel">
              <span>{t('editor.baseColorRamp.baseColor')}</span>
              <IconInfoCircle
                data-tooltip-id={tooltipID}
                data-tooltip-html={t('editor.baseColorRamp.baseColorInfo')}
                data-tooltip-place="right"
              />
            </div>
            <Input
              value={inputBaseColor}
              onChange={handleInputColorChange('base')}
            />
          </div>
        </div>
        <div className="editor_baseColorRamp_colorPicker">
          <HexColorPicker
            color={contrastColor}
            onChange={handleColorRampChange('contrast')}
          />
          <div className="editor_baseColorRamp_colorPickerControl">
            <div className="editor_baseColorRamp_colorPickerControlLabel">
              <span>{t('editor.baseColorRamp.contrastColor')}</span>
              <IconInfoCircle
                data-tooltip-id={tooltipID}
                data-tooltip-html={t('editor.baseColorRamp.contrastColorInfo')}
                data-tooltip-place="right"
              />
            </div>
            <Input
              value={inputContrastColor}
              onChange={handleInputColorChange('contrast')}
            />
          </div>
        </div>
      </div>
      <div className="editor_baseColorRamp_colorRamp">
        <div className="editor_baseColorRamp_colorRampLabel">
          <span>{t('editor.baseColorRamp.percentages')}</span>
          <IconInfoCircle
            data-tooltip-id={tooltipID}
            data-tooltip-html={t('editor.baseColorRamp.percentagesInfo')}
          />
        </div>
        <div className="editor_baseColorRamp_percentageInputsBox">
          {inputContrastPercentages.map((percentage, index) => (
            <Input
              autoSelect
              key={`baseColorRampPercentage_${index}`}
              value={String(percentage)}
              onChange={handleInputContrastPercentageChange(index)}
            />
          ))}
        </div>
        <div className="editor_baseColorRamp_scaleBox">
          {colorRamp.map((color, index) => (
            <div
              key={uid()}
              className="editor_baseColorRamp_scaleStep"
              style={{ background: color }}
              onClick={copyColor(color)}
              data-tooltip-id={tooltipID}
              data-tooltip-html={color}
              data-tooltip-place="bottom"
            >
              {index !== 6 && (
                <IconCopy style={{ color: getDynamicContrastColor(color) }} />
              )}
              {index === 6 && (
                <div className="editor_baseColorRamp_centerScaleStep">
                  <IconCopy style={{ color: getDynamicContrastColor(color) }} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="editor_baseColorRamp_contrastButtonActions">
          {contrastStandadizationValidation && (
            <Button
              variant="contrast"
              data-tooltip-id={tooltipID}
              data-tooltip-html={t(
                'editor.baseColorRamp.standardizeContrastsInfo',
              )}
              data-tooltip-place="bottom-start"
              data-tooltip-delay-show={1000}
              onClick={standardizeContrastsPercentages}
            >
              {t('editor.baseColorRamp.standardizeContrasts')}
            </Button>
          )}
          {colorStandadizationValidation && (
            <Button
              variant="contrast"
              data-tooltip-id={tooltipID}
              data-tooltip-html={t(
                'editor.baseColorRamp.standardizeColorsInfo',
              )}
              data-tooltip-place="bottom-start"
              data-tooltip-delay-show={1000}
              onClick={standardizeColors}
            >
              {t('editor.baseColorRamp.standardizeColors')}
            </Button>
          )}
          <Button
            onClick={resetValues}
            data-tooltip-id={tooltipID}
            data-tooltip-html={t('editor.baseColorRamp.resetPercentagesInfo')}
            data-tooltip-place="bottom-start"
            data-tooltip-delay-show={1000}
          >
            <IconReload />
            {t('editor.baseColorRamp.resetPercentages')}
          </Button>
        </div>
      </div>
    </Accordion>
  );
};
