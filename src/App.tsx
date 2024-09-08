import { Tooltip } from 'react-tooltip';
import { Template } from '@/components';
import { AnimatePresence } from 'framer-motion';
import { tooltipID, tooltipStyles } from '@/utils';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Home, Editor, SavedThemes } from '@/views';
import { useApp } from '@/useApp';
import { ThemesContext } from '@/context';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const { themesCollection, addTheme, removeTheme } = useApp();
  const location = useLocation();
  return (
    <ThemesContext.Provider value={{ themesCollection, addTheme, removeTheme }}>
      <Tooltip style={tooltipStyles} id={tooltipID} />
      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="colored"
        transition={Slide}
        limit={1}
      />
      <Template>
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/theme-editor" element={<Editor />} />
            <Route path="/saved-themes" element={<SavedThemes />} />
          </Routes>
        </AnimatePresence>
      </Template>
    </ThemesContext.Provider>
  );
}
