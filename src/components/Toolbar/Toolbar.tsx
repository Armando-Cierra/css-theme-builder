import { IconBrightnessHalf, IconSun, IconMoon } from '@tabler/icons-react';
import { Logotype, Button, ButtonGroup } from '@/components';
import { tooltipID } from '@/utils';
import { useToolbar } from './useToolbar';
import './toolbar.scss';

export const Toolbar = () => {
  const {
    t,
    pathname,
    theme,
    changeTheme,
    changeLanguage,
    activeLang,
    isElectron,
    isMac,
    // isWindows,
  } = useToolbar();

  return (
    <section className="toolbar">
      <Logotype isDetached={pathname === '/'} isOnMac={isElectron && isMac} />
      <div className="toolbar_controls">
        <div className="toolbar_controls_colorModeBox">
          <Button
            data-tooltip-id={tooltipID}
            data-tooltip-content={t('toolbar.auto')}
            iconOnly
            variant="ghost"
            isSelected={theme === 'auto'}
            onClick={changeTheme('auto')}
          >
            <IconBrightnessHalf />
          </Button>
          <Button
            data-tooltip-id={tooltipID}
            data-tooltip-content={t('toolbar.light')}
            iconOnly
            variant="ghost"
            isSelected={theme === 'light'}
            onClick={changeTheme('light')}
          >
            <IconSun />
          </Button>
          <Button
            data-tooltip-id={tooltipID}
            data-tooltip-content={t('toolbar.dark')}
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
            data-tooltip-id={tooltipID}
            data-tooltip-content="English"
            isSelected={activeLang === 'en'}
            onClick={changeLanguage('en')}
          >
            EN
          </Button>
          <Button
            data-tooltip-id={tooltipID}
            data-tooltip-content="Español"
            isSelected={activeLang === 'es'}
            onClick={changeLanguage('es')}
          >
            ES
          </Button>
        </ButtonGroup>
      </div>
    </section>
  );
};
