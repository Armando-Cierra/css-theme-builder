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
    // contrastBackgrounds,
    // text,
    // contrastText,
    // borders,
    // contrastBorders,
    addNewBackground,
    editBackgroundColor,
    removeBackgroundSpace,
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
        maxArray={5}
        minArray={3}
        addNewColor
        addNewColorAction={addNewBackground}
        editColorAction={editBackgroundColor}
        removeColorAction={removeBackgroundSpace}
      />
    </Accordion>
  );
};
