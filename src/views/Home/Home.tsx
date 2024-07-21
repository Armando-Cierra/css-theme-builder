import { IconPlus, IconBookmark, IconBrandGithub } from '@tabler/icons-react';
import { Card } from '@/components';
import './home.scss';

export const Home = () => {
  return (
    <div className="home">
      <p className="home_description">
        CSS Theme Builder is an App made for designers and for developers,
        facilitating the creation of custom and dynamic style sheets using CSS
        variables.
      </p>
      <div className="home_contentBox">
        <Card
          isInnerLink
          icon={<IconPlus />}
          text="New Theme"
          linksTo="/editor"
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
  );
};
