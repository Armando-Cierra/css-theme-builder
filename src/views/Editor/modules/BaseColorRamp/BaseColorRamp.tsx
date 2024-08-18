import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Accordion } from '../../components';
import { EditorContext } from '../../context';
import './baseColorRamp.scss';
import { ColorMode, EditorContextProps } from '@/types';

export const BaseColorRamp = () => {
  const { t } = useTranslation();
  const { theme } = useContext(EditorContext) as EditorContextProps;
  const [selectedMode, setSelectedMode] = useState<ColorMode>('light');

  const onSelectColorMode = (colorMode: ColorMode) => {
    setSelectedMode(colorMode);
  };

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
      <h1>Hello World</h1>
    </Accordion>
  );
};
