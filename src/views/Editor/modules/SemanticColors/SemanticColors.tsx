import { Accordion, PaletteDisplayer } from '../../components';
import { useSemanticColors } from './useSemanticColors';
import { useSemanticColorsControls } from './useSemanticColorsControls';
import './semanticColors.scss';
import { HexColorPicker } from 'react-colorful';
import { Input } from '@/components';
import { IconCopy, IconInfoCircle } from '@tabler/icons-react';
import { getDynamicContrastColor, tooltipID } from '@/utils';
import { uid } from 'uid';

export const SemanticColors = () => {
  const {
    t,
    copyColor,
    theme,
    selectedMode,
    onSelectColorMode,
    handleColorRampsChange,
    successColor,
    successBackgroundColor,
    successVariantsColor,
    successColorRamp,
    editSuccessStateColor,
    editSuccessBackgroundColor,
    warningColor,
    warningBackgroundColor,
    warningVariantsColor,
    warningColorRamp,
    editWarningStateColor,
    editWarningBackgroundColor,
  } = useSemanticColors();

  const { inputSuccessColor, inputWarningColor, handleInputColorChange } =
    useSemanticColorsControls({
      successColor,
      warningColor,
      handleColorRampsChange,
    });

  return (
    <Accordion
      title={t('editor.semanticColors.title')}
      description={t('editor.semanticColors.description')}
      themeType={theme.type}
      selectedMode={selectedMode}
      onSelectColorMode={onSelectColorMode}
      className="editor_semanticColors"
      isDefaultOpen
    >
      {/* SUCCESS */}
      <span className="editor_semanticColors_title">Success</span>
      <div className="editor_semanticColors_color">
        <div className="editor_semanticColors_colorPickersBox">
          <div className="editor_semanticColors_colorPicker">
            <HexColorPicker
              color={successColor}
              onChange={handleColorRampsChange('success')}
            />
            <div className="editor_semanticColors_colorPickerControl">
              <div className="editor_semanticColors_colorPickerControlLabel">
                <span>{t('editor.semanticColors.baseColor')}</span>
              </div>
              <Input
                value={inputSuccessColor}
                onChange={handleInputColorChange('success')}
              />
            </div>
          </div>
        </div>
        <div className="editor_semanticColors_colorRamp">
          <div className="editor_semanticColors_colorRampLabel">
            <span>{t('editor.semanticColors.colorRamp')}</span>
            <IconInfoCircle
              data-tooltip-id={tooltipID}
              data-tooltip-html={t('editor.semanticColors.successInfo')}
            />
          </div>
          <div className="editor_semanticColors_scaleBox">
            {successColorRamp.map((color, index) => (
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
                  <IconCopy style={{ color: getDynamicContrastColor(color) }} />
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
              colors={successBackgroundColor}
              minArray={1}
              maxArray={1}
              title={t('editor.semanticColors.background')}
              editColorAction={editSuccessBackgroundColor}
            />
            <PaletteDisplayer
              colors={successVariantsColor}
              minArray={3}
              maxArray={3}
              title={t('editor.semanticColors.states')}
              editColorAction={editSuccessStateColor}
            />
          </div>
        </div>
      </div>
      {/* WARNING */}
      <span className="editor_semanticColors_title">Warning</span>
      <div className="editor_semanticColors_color">
        <div className="editor_semanticColors_colorPickersBox">
          <div className="editor_semanticColors_colorPicker">
            <HexColorPicker
              color={warningColor}
              onChange={handleColorRampsChange('warning')}
            />
            <div className="editor_semanticColors_colorPickerControl">
              <div className="editor_semanticColors_colorPickerControlLabel">
                <span>{t('editor.semanticColors.baseColor')}</span>
              </div>
              <Input
                value={inputWarningColor}
                onChange={handleInputColorChange('warning')}
              />
            </div>
          </div>
        </div>
        <div className="editor_semanticColors_colorRamp">
          <div className="editor_semanticColors_colorRampLabel">
            <span>{t('editor.semanticColors.colorRamp')}</span>
            <IconInfoCircle
              data-tooltip-id={tooltipID}
              data-tooltip-html={t('editor.semanticColors.warningInfo')}
            />
          </div>
          <div className="editor_semanticColors_scaleBox">
            {warningColorRamp.map((color, index) => (
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
                  <IconCopy style={{ color: getDynamicContrastColor(color) }} />
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
              colors={warningBackgroundColor}
              minArray={1}
              maxArray={1}
              title={t('editor.semanticColors.background')}
              editColorAction={editWarningBackgroundColor}
            />
            <PaletteDisplayer
              colors={warningVariantsColor}
              minArray={3}
              maxArray={3}
              title={t('editor.semanticColors.states')}
              editColorAction={editWarningStateColor}
            />
          </div>
        </div>
      </div>
    </Accordion>
  );
};
