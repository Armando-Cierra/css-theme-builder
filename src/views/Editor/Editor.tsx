import { useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header, BaseColorRamp, BaseColorSections } from './modules';
import { InitialTip } from './components';
import { useEditor } from './useEditor';
import { EditorContext } from './context';
import './editor.scss';

export const Editor = () => {
  const location = useLocation();
  if (!location.state) {
    return <Navigate to="/" replace />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { theme, themeActions } = useEditor(location);

  return (
    <EditorContext.Provider value={{ theme, themeActions }}>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        className="editor"
      >
        <Header />
        <section className="editor_container">
          <InitialTip />
          <BaseColorRamp />
          <BaseColorSections />
        </section>
      </motion.div>
    </EditorContext.Provider>
  );
};
