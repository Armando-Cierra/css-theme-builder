import classNames from 'classnames';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
}

export const Content = ({ children, className: customClassName }: Props) => {
  return (
    <div
      className={classNames('modal_content', {
        [customClassName as string]: customClassName,
      })}
    >
      {children}
    </div>
  );
};
