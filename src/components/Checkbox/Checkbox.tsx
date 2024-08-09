import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { uid } from 'uid';
import './checkbox.scss';
import classNames from 'classnames';

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
}

export const Checkbox = ({
  label,
  className: customClassName,
  ...rest
}: Props) => {
  const checkboxId = uid();

  return (
    <div
      className={classNames('checkbox', {
        [customClassName as string]: customClassName,
      })}
    >
      <input
        className="checkbox_input"
        type="checkbox"
        id={checkboxId}
        {...rest}
      />
      <label className="checkbox_customInput" htmlFor={checkboxId} />
      {label && (
        <label className="checkbox_label" htmlFor={checkboxId}>
          {label}
        </label>
      )}
    </div>
  );
};
