import { useState } from 'react';
import { motion } from 'framer-motion';
import { IconPlus, IconBookmark, IconBrandGithub } from '@tabler/icons-react';
import { Card, NewThemeModal } from '@/components';
import './home.scss';

export const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openNewThemeModal = () => setIsOpen(true);
  const closeNewThemeModal = () => setIsOpen(false);

  return (
    <>
      <NewThemeModal isOpen={isOpen} onCloseModal={closeNewThemeModal} />
      <motion.div
        className="home"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
      >
        <p className="home_description">
          CSS Theme Builder is an App made for designers and for developers,
          facilitating the creation of custom and dynamic style sheets using CSS
          variables.
        </p>
        <div className="home_contentBox">
          <Card
            icon={<IconPlus />}
            text="New Theme"
            onClick={openNewThemeModal}
          />
          <Card
            isInnerLink
            icon={<IconBookmark />}
            text="Saved Themes"
            linksTo="/saved-themes"
          />
          <Card
            icon={<IconBrandGithub />}
            text="GitHub Project"
            linksTo="https://github.com/Armando-Cierra/css-theme-builder"
          />
        </div>
      </motion.div>
    </>
  );
};
