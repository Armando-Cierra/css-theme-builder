import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components';
// import { useEditor } from './useEditor';
import './editor.scss';

export const Editor = () => {
  return (
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
      <h1>Editor</h1>
      <Link to="/">
        <Button>Go Home</Button>
      </Link>
    </motion.div>
  );
};
