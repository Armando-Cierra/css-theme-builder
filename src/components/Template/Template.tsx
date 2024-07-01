import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Toolbar } from '../Toolbar';

interface Props {
  children: ReactNode;
}

export const Template = ({ children }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="template">
      <Toolbar />
      <main>{children}</main>
      <p>{t('test')}</p>
    </div>
  );
};
