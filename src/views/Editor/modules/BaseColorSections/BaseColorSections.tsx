import { IconReload } from '@tabler/icons-react';
import { Button } from '@/components';
import { tooltipID } from '@/utils';
import { Accordion, PaletteDisplayer } from '../../components/';
import { useBaseColorSections } from './useBaseColorSections';
import './baseColorSections.scss';

export const BaseColorSections = () => {
  const {
    t,
    themeType,
    selectedMode,
    onSelectColorMode,
    backgrounds,
    contrastBackgrounds,
    text,
    contrastText,
    borders,
    contrastBorders,
    addNewBackground,
    editBackgroundColor,
    removeBackgroundSpace,
    addNewContrastBackground,
    editContrastBackgroundColor,
    removeContrastBackgroundSpace,
    editTextColor,
    editContrastTextColor,
    editBorderColor,
    editContrastBorderColor,
    resetBaseColorSections,
  } = useBaseColorSections();

  return (
    <Accordion
      title={t('editor.baseColorSections.title')}
      isDefaultOpen
      description={t('editor.baseColorSections.description')}
      themeType={themeType}
      selectedMode={selectedMode}
      onSelectColorMode={onSelectColorMode}
      className="editor_baseColorRamp"
    >
      <div className="editor_baseColorSections">
        <PaletteDisplayer
          title={t('editor.baseColorSections.backgrounds')}
          colors={backgrounds}
          maxArray={6}
          minArray={3}
          addNewColor
          addNewColorAction={addNewBackground}
          editColorAction={editBackgroundColor}
          removeColorAction={removeBackgroundSpace}
        />
        <PaletteDisplayer
          title={t('editor.baseColorSections.contrastBackgrounds')}
          colors={contrastBackgrounds}
          maxArray={6}
          minArray={3}
          addNewColor
          addNewColorAction={addNewContrastBackground}
          editColorAction={editContrastBackgroundColor}
          removeColorAction={removeContrastBackgroundSpace}
        />
        <PaletteDisplayer
          title={t('editor.baseColorSections.text')}
          colors={text}
          maxArray={2}
          minArray={2}
          editColorAction={editTextColor}
        />
        <PaletteDisplayer
          title={t('editor.baseColorSections.contrastText')}
          colors={contrastText}
          maxArray={2}
          minArray={2}
          editColorAction={editContrastTextColor}
        />

        <PaletteDisplayer
          title={t('editor.baseColorSections.borders')}
          colors={borders}
          maxArray={2}
          minArray={2}
          editColorAction={editBorderColor}
        />
        <PaletteDisplayer
          title={t('editor.baseColorSections.contrastBorders')}
          colors={contrastBorders}
          maxArray={2}
          minArray={2}
          editColorAction={editContrastBorderColor}
        />
        <Button
          onClick={resetBaseColorSections}
          data-tooltip-id={tooltipID}
          data-tooltip-html={t('editor.baseColorSections.reset')}
          data-tooltip-place="bottom-start"
          data-tooltip-delay-show={1000}
        >
          <IconReload />
          {t('editor.baseColorRamp.resetPercentages')}
        </Button>
      </div>
    </Accordion>
  );
};
