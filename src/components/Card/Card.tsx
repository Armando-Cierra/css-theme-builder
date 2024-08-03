import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import './card.scss';

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: ReactNode;
  text: string;
  linksTo?: string;
  isInnerLink?: boolean;
}

export const Card = ({
  className: customClassName,
  icon,
  text,
  linksTo,
  onClick,
  isInnerLink = false,
  ...rest
}: Props) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (linksTo) {
      if (isInnerLink) {
        navigate(linksTo);
      } else {
        window.open(linksTo, '_blank', 'noopener,noreferrer');
      }
    }

    onClick?.(e);
  };

  return (
    <button
      className={classNames('card', {
        [customClassName as string]: customClassName,
      })}
      onClick={handleClick}
      {...rest}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};
