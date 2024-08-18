import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { Button, ButtonGroup } from '@/components';
import { ColorMode, ThemeType } from '@/types';
import './accordion.scss';

interface Props {
  children: ReactNode;
  className?: string;
  themeType: ThemeType;
  isDefaultOpen?: boolean;
  title: string;
  description: string;
  selectedMode: ColorMode;
  onSelectColorMode: (colorMode: ColorMode) => void;
}

export const Accordion = ({
  children,
  className: customClassName,
  themeType,
  isDefaultOpen,
  title,
  description,
  selectedMode,
  onSelectColorMode,
}: Props) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(isDefaultOpen);
  const toggleAccordion = () => setIsOpen((prevState) => !prevState);

  const handleColorModeSelection = (colorMode: ColorMode) => () => {
    onSelectColorMode(colorMode);
  };

  return (
    <div className="editor_accordion">
      <div className="editor_accordion_header">
        <div className="editor_accordion_description">
          <span>{title}</span>
          <p>{description}</p>
        </div>
        <div className="editor_accordion_controls">
          {themeType === 'dual' && (
            <ButtonGroup>
              <Button
                isSelected={selectedMode === 'light'}
                onClick={handleColorModeSelection('light')}
              >
                {t('general.light')}
              </Button>
              <Button
                isSelected={selectedMode === 'dark'}
                onClick={handleColorModeSelection('dark')}
              >
                {t('general.dark')}
              </Button>
            </ButtonGroup>
          )}
          <Button iconOnly variant="ghost" onClick={toggleAccordion}>
            {isOpen ? <IconChevronUp /> : <IconChevronDown />}
          </Button>
        </div>
      </div>
      <div
        className={classNames('editor_accordion_animationWrapper', {
          'editor_accordion_animationWrapper--open': isOpen,
        })}
      >
        <div
          className={classNames('editor_accordion_content', {
            [customClassName as string]: customClassName,
          })}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
