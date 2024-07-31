import { useState } from 'react';
import { IconPlus, IconBookmark, IconBrandGithub } from '@tabler/icons-react';
import { Card, NewThemeModal } from '@/components';
import './home.scss';

export const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openNewThemeModal = () => setIsOpen(true);
  const closeNewThemeModal = () => setIsOpen(false);

  const onCreateTheme = (themeType: 'simple' | 'dual') => {
    console.log(`creates a ${themeType} theme`);
  };

  return (
    <>
      <NewThemeModal
        isOpen={isOpen}
        onCloseModal={closeNewThemeModal}
        onCreateTheme={onCreateTheme}
      />
      <div className="home">
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
      </div>
    </>
  );
};
