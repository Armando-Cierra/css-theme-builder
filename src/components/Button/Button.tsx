import { ReactNode } from 'react';
import classNames from 'classnames';
import './button.scss';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: 'default' | 'ghost' | 'contrast';
  isFullWidth?: boolean;
  isSelected?: boolean;
  interactiveSemantic?: 'default' | 'warning' | 'danger' | 'success';
  children: ReactNode;
  iconOnly?: boolean;
}

export const Button = ({
  className: customClassName,
  variant = 'default',
  isFullWidth = false,
  interactiveSemantic = 'default',
  isSelected = false,
  iconOnly = false,
  children,
  ...buttonProps
}: Props) => {
  return (
    <button
      className={classNames('button', {
        'button--iconOnly': iconOnly,
        'button--isFullWidth': isFullWidth,
        'button--isSelected': isSelected,
        [`button--${variant}`]: variant,
        [`button_interactiveSemantic--${interactiveSemantic}`]: variant,
        [customClassName as string]: customClassName,
      })}
      {...buttonProps}
    >
      {children}
    </button>
  );
};
