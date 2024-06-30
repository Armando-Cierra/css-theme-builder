import classNames from 'classnames';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: string;
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
