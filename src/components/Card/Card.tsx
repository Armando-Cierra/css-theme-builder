import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import './card.scss';

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  icon: ReactNode;
  text: string;
  linksTo: string;
  isInnerLink?: boolean;
}

export const Card = ({
  className: customClassName,
  icon,
  text,
  linksTo,
  isInnerLink = false,
  ...rest
}: Props) => {
  return (
    <>
      {isInnerLink ? (
        <Link to={linksTo}>
          <div
            className={classNames('card', {
              [customClassName as string]: customClassName,
            })}
            {...rest}
          >
            {icon}
            <span>{text}</span>
          </div>
        </Link>
      ) : (
        <a href={linksTo} target="_blank">
          <div
            className={classNames('card', {
              [customClassName as string]: customClassName,
            })}
            {...rest}
          >
            {icon}
            <span>{text}</span>
          </div>
        </a>
      )}
    </>
  );
};
