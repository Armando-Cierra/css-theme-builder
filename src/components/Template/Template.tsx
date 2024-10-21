import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { IconAlertTriangle } from '@tabler/icons-react';
import { Toolbar } from '../Toolbar';
import { useLocation } from 'react-router-dom';
import './template.scss';
import classNames from 'classnames';

interface Props {
  children: ReactNode;
}

export const Template = ({ children }: Props) => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  return (
    <>
      <div className="resolutionWarning">
        <div className="resolutionWarningContainer">
          <IconAlertTriangle />
          <p>{t('general.resolution')}</p>
        </div>
      </div>
      <div
        className={classNames('template', {
          'template--home': pathname === '/',
        })}
      >
        <Toolbar />
        <main className="template_mainBox">{children}</main>
      </div>
    </>
  );
};
