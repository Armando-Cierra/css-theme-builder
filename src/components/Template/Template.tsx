import { ReactNode } from 'react';
import { Toolbar } from '../Toolbar';
import { useLocation } from 'react-router-dom';
import './template.scss';
import classNames from 'classnames';

interface Props {
  children: ReactNode;
}

export const Template = ({ children }: Props) => {
  const { pathname } = useLocation();

  return (
    <div
      className={classNames('template', {
        'template--home': pathname === '/',
      })}
    >
      <Toolbar />
      <main className="template_mainBox">{children}</main>
    </div>
  );
};
