import {
  ChangeEvent,
  cloneElement,
  DetailedHTMLProps,
  FocusEventHandler,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import { IconX } from '@tabler/icons-react';
import { Button } from '../Button';
import './input.scss';

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  icon?: ReactNode;
  value: string;
  autoSelect?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClean?: () => void;
}

export const Input = ({
  className: customClassName,
  icon,
  autoSelect = true,
  value: controlledValue,
  onClean,
  onFocus,
  ...rest
}: Props) => {
  const value = controlledValue ?? '';
  const handleClick = () => onClean?.();

  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    if (autoSelect) {
      e.target.select();
    }
    onFocus?.(e);
  };

  return (
    <div
      className={classNames('input', {
        [customClassName as string]: customClassName,
      })}
    >
      {icon &&
        cloneElement(icon as ReactElement, {
          className: classNames(
            (icon as ReactElement).props.className,
            'input_icon',
          ),
        })}
      <input
        className={classNames('input_control', {
          'input_control--hasIcon': !!icon,
          'input_control--hasCleanAction': !!onClean,
        })}
        type="text"
        value={value}
        onFocus={handleFocus}
        {...rest}
      />
      {onClean && value.length > 0 && (
        <Button
          className="input_cleanButton"
          iconOnly
          variant="ghost"
          onClick={handleClick}
        >
          <IconX />
        </Button>
      )}
    </div>
  );
};
