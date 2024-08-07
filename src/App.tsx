import { Tooltip } from 'react-tooltip';
import { Template } from '@/components';
import { AnimatePresence } from 'framer-motion';
import { tooltipID, tooltipStyles } from '@/utils';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Home, Editor, SavedThemes } from '@/views';
import { useApp } from '@/useApp';
import { ThemesContext } from '@/context';

export default function App() {
  const { themesCollection, addTheme, removeTheme } = useApp();
  const location = useLocation();
  return (
    <ThemesContext.Provider value={{ themesCollection, addTheme, removeTheme }}>
      <Tooltip style={tooltipStyles} id={tooltipID} />
      <Template>
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/saved-themes" element={<SavedThemes />} />
          </Routes>
        </AnimatePresence>
      </Template>
    </ThemesContext.Provider>
  );
}
