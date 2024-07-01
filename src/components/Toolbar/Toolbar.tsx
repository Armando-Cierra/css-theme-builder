import { IconBrightnessHalf, IconSun, IconMoon } from '@tabler/icons-react';
import { Logotype, Button, ButtonGroup } from '@/components';
import './toolbar.scss';

export const Toolbar = () => {
  return (
    <section className="toolbar">
      <div className="container">
        <Logotype />
        <div className="toolbar_controls">
          <div className="toolbar_controls_colorModeBox">
            <Button iconOnly variant="ghost" isSelected>
              <IconBrightnessHalf />
            </Button>
            <Button iconOnly variant="ghost">
              <IconSun />
            </Button>
            <Button iconOnly variant="ghost">
              <IconMoon />
            </Button>
          </div>
          <ButtonGroup>
            <Button isSelected>EN</Button>
            <Button>ES</Button>
          </ButtonGroup>
        </div>
      </div>
    </section>
  );
};
