import { ReactNode } from 'react';
import { Toolbar } from '../Toolbar';

interface Props {
  children: ReactNode;
}

export const Template = ({ children }: Props) => {
  return (
    <div className="template">
      <Toolbar />
      <main>{children}</main>
    </div>
  );
};
