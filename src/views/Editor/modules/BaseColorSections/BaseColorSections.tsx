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
    // contrastText,
    // borders,
    // contrastBorders,
    addNewBackground,
    editBackgroundColor,
    removeBackgroundSpace,
    addNewContrastBackground,
    editContrastBackgroundColor,
    removeContrastBackgroundSpace,
    editTextColor,
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
    </Accordion>
  );
};
