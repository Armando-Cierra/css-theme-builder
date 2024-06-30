import classNames from 'classnames';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  children: string;
}

export const Description = ({
  children,
  className: customClassName,
}: Props) => {
  return (
    <p
      className={classNames('modal_description', {
        [customClassName as string]: customClassName,
      })}
    >
      {children}
    </p>
  );
};
