import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { IconPlus, IconBookmark, IconBrandGithub } from '@tabler/icons-react';
import { Card, NewThemeModal } from '@/components';
import './home.scss';

export const Home = () => {
  const { t } = useTranslation();
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
        <p className="home_description">{t('home.description')}</p>
        <div className="home_contentBox">
          <Card
            icon={<IconPlus />}
            text={t('home.cards.newTheme')}
            onClick={openNewThemeModal}
          />
          <Card
            isInnerLink
            icon={<IconBookmark />}
            text={t('home.cards.savedThemes')}
            linksTo="/saved-themes"
          />
          <Card
            icon={<IconBrandGithub />}
            text={t('home.cards.github')}
            linksTo="https://github.com/Armando-Cierra/css-theme-builder"
          />
        </div>
      </motion.div>
    </>
  );
};
