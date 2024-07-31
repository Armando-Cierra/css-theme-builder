import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import './card.scss';

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  icon: ReactNode;
  text: string;
  linksTo?: string;
  isInnerLink?: boolean;
}

const CardContent = ({
  className: customClassName,
  icon,
  text,
  ...rest
}: Props) => {
  return (
    <div
      className={classNames('card', {
        [customClassName as string]: customClassName,
      })}
      {...rest}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
};

export const Card = ({
  className: customClassName,
  icon,
  text,
  linksTo,
  isInnerLink = false,
  ...rest
}: Props) => {
  if (linksTo && isInnerLink)
    return (
      <Link to={linksTo}>
        <CardContent
          className={customClassName}
          icon={icon}
          text={text}
          {...rest}
        />
      </Link>
    );

  if (linksTo)
    return (
      <a href={linksTo} target="_blank">
        <CardContent
          className={customClassName}
          icon={icon}
          text={text}
          {...rest}
        />
      </a>
    );

  return (
    <button>
      <CardContent
        className={customClassName}
        icon={icon}
        text={text}
        {...rest}
      />
    </button>
  );
};
