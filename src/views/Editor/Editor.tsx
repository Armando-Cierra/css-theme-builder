import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  IconArrowLeft,
  IconEdit,
  IconStar,
  IconStarFilled,
} from '@tabler/icons-react';
import { Button } from '@/components';
import { tooltipID } from '@/utils';
import { InitialTip } from './components';
import { useEditor } from './useEditor';
import './editor.scss';

export const Editor = () => {
  const { t, theme, themeActions } = useEditor();

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
      <header className="editor_header">
        <Link to="/">
          <Button variant="ghost" iconOnly>
            <IconArrowLeft />
          </Button>
        </Link>
        <div className="editor_info">
          <h1>Theme Editor</h1>
          <div className="editor_controls">
            <div className="editor_themeName">
              <p>
                Theme Name: <span>{theme.name}</span>
              </p>
              <div className="editor_buttonsBox">
                <Button
                  iconOnly
                  variant="ghost"
                  data-tooltip-id={tooltipID}
                  data-tooltip-content={
                    theme.favorite ? 'Remove From Favorite' : 'Add To Favorites'
                  }
                  data-tooltip-place="bottom"
                  onClick={themeActions.toggleThemeFavoriteOption}
                >
                  {theme.favorite ? <IconStarFilled /> : <IconStar />}
                </Button>
                <Button
                  variant="ghost"
                  iconOnly
                  data-tooltip-id={tooltipID}
                  data-tooltip-content="Edit Theme Name"
                  data-tooltip-place="right"
                >
                  <IconEdit />
                </Button>
              </div>
            </div>
            <Button variant="contrast">{t('general.saveChanges')}</Button>
          </div>
        </div>
      </header>
      <section className="editor_container">
        <InitialTip />
      </section>
    </motion.div>
  );
};
