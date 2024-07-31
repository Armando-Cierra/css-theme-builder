import { Tooltip } from 'react-tooltip';
import { Template } from '@/components';
import { tooltipID, tooltipStyles } from '@/utils';
import { Route, Routes } from 'react-router-dom';
import { Home, Editor, SavedThemes } from '@/views';
import { useApp } from '@/useApp';
import { ThemesContext } from '@/context';

export default function App() {
  const { themesCollection, addTheme, removeTheme } = useApp();

  return (
    <ThemesContext.Provider value={{ themesCollection, addTheme, removeTheme }}>
      <Tooltip style={tooltipStyles} id={tooltipID} />
      <Template>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/saved-themes" element={<SavedThemes />} />
        </Routes>
      </Template>
    </ThemesContext.Provider>
  );
}
