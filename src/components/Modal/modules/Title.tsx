import classNames from 'classnames';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  children: string;
}

export const Title = ({ children, className: customClassName }: Props) => {
  return (
    <span
      className={classNames('modal_title', {
        [customClassName as string]: customClassName,
      })}
    >
      {children}
    </span>
  );
};
