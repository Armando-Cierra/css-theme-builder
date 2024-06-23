import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import { Button } from '../Button';
import './buttonGroup.scss';

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: ReactNode;
}

export const ButtonGroup = ({
  className: customClassName,
  children,
}: Props) => {
  const childrenArray = Children.toArray(children);
  let content: ReactElement[] = [];

  childrenArray.forEach((item) => {
    if (isValidElement(item) && item.type === Button)
      content = [
        ...content,
        cloneElement(item as ReactElement, { variant: 'ghost' }),
      ];
  });

  return (
    <div
      className={classNames('buttonGroup', {
        [customClassName as string]: customClassName,
      })}
    >
      {content}
    </div>
  );
};
