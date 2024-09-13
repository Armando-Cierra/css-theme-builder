import { uid } from 'uid';
import { HexColorPicker } from 'react-colorful';
import { IconReload, IconCopy } from '@tabler/icons-react';
import { Input, Button } from '@/components';
import { getDynamicContrastColor } from '@/utils/tools';
import { Accordion } from '../../components';
import { useBaseColorRamp } from './useBaseColorRamp';
import { useBaseColorRampControls } from './useBaseColorRampControls';
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
            <span>{t('editor.baseColorRamp.baseColor')}</span>
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
            <span>{t('editor.baseColorRamp.contrastColor')}</span>
            <Input
              value={inputContrastColor}
              onChange={handleInputColorChange('contrast')}
            />
          </div>
        </div>
      </div>
      <div className="editor_baseColorRamp_colorRamp">
        <span>{t('editor.baseColorRamp.percentages')}</span>
        <div className="editor_baseColorRamp_percentageInputsBox">
          {inputContrastPercentages.map((percentage, index) => (
            <Input
              key={`baseColorRampPercentage_${percentage}_${index}_${selectedMode}`}
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
        <Button onClick={resetValues}>
          <IconReload />
          {t('editor.baseColorRamp.resetPercentages')}
        </Button>
      </div>
    </Accordion>
  );
};
