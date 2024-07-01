import { IconBrightnessHalf, IconSun, IconMoon } from '@tabler/icons-react';
import { Logotype, Button, ButtonGroup } from '@/components';
import { useToolbar } from './useToolbar';
import './toolbar.scss';

export const Toolbar = () => {
  const { pathname, theme, changeTheme, changeLanguage, activeLang } =
    useToolbar();

  return (
    <section className="toolbar">
      <div className="container">
        <Logotype isDetached={pathname === '/'} />
        <div className="toolbar_controls">
          <div className="toolbar_controls_colorModeBox">
            <Button
              iconOnly
              variant="ghost"
              isSelected={theme === 'auto'}
              onClick={changeTheme('auto')}
            >
              <IconBrightnessHalf />
            </Button>
            <Button
              iconOnly
              variant="ghost"
              isSelected={theme === 'light'}
              onClick={changeTheme('light')}
            >
              <IconSun />
            </Button>
            <Button
              iconOnly
              variant="ghost"
              isSelected={theme === 'dark'}
              onClick={changeTheme('dark')}
            >
              <IconMoon />
            </Button>
          </div>
          <ButtonGroup>
            <Button
              isSelected={activeLang === 'en'}
              onClick={changeLanguage('en')}
            >
              EN
            </Button>
            <Button
              isSelected={activeLang === 'es'}
              onClick={changeLanguage('es')}
            >
              ES
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </section>
  );
};
