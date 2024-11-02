import {
  IconBrightnessHalf,
  IconSun,
  IconMoon,
  IconX,
  IconMinus,
  IconSquares,
} from '@tabler/icons-react';
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
    navigateToHome,
    isWindows,
    minimizeWindows,
    maximizeWindows,
    closeWindows,
  } = useToolbar();

  return (
    <section className="toolbar">
      <Logotype
        isDetached={pathname === '/'}
        isOnMac={isElectron && isMac}
        onClick={navigateToHome}
      />
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
            data-tooltip-content={t('general.light')}
            iconOnly
            variant="ghost"
            isSelected={theme === 'light'}
            onClick={changeTheme('light')}
          >
            <IconSun />
          </Button>
          <Button
            data-tooltip-id={tooltipID}
            data-tooltip-content={t('general.dark')}
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
      {isWindows && isElectron && (
        <>
          <div className="windowsControlsSpace" />
          <div className="windowsControls">
            <button
              className="windowsControls_button"
              onClick={minimizeWindows}
            >
              <IconMinus />
            </button>
            <button
              className="windowsControls_button"
              onClick={maximizeWindows}
            >
              <IconSquares />
            </button>
            <button
              className="windowsControls_button windowsControls_button--exit"
              onClick={closeWindows}
            >
              <IconX />
            </button>
          </div>
        </>
      )}
    </section>
  );
};
