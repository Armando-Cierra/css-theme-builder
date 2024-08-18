import { motion } from 'framer-motion';
import { Header } from './modules';
import { InitialTip } from './components';
import { useEditor } from './useEditor';
import { EditorContext } from './context';
import './editor.scss';

export const Editor = () => {
  const { theme, themeActions } = useEditor();

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
        </section>
      </motion.div>
    </EditorContext.Provider>
  );
};
