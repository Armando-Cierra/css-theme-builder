import classNames from 'classnames';
import {
  IconInfoSquareFilled,
  IconAlertTriangleFilled,
  IconCircleCheckFilled,
  IconAlertOctagonFilled,
  IconX,
} from '@tabler/icons-react';
import { Button } from '../Button';
import './inlineNotification.scss';

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: string;
  variant?: 'info' | 'warning' | 'danger' | 'success';
  onClose?: () => void;
}

export const InlineNotification = ({
  className: customClassName,
  children,
  variant = 'info',
  ...rest
}: Props) => {
  const getIcon = () => {
    const variants = {
      info: () => <IconInfoSquareFilled className="inlineNotification_icon" />,
      success: () => (
        <IconCircleCheckFilled className="inlineNotification_icon" />
      ),
      warning: () => (
        <IconAlertTriangleFilled className="inlineNotification_icon" />
      ),
      danger: () => (
        <IconAlertOctagonFilled className="inlineNotification_icon" />
      ),
    };

    return variants[variant]();
  };

  return (
    <div
      className={classNames('inlineNotification', {
        [`inlineNotification--${variant}`]: variant,
        [customClassName as string]: customClassName,
      })}
      {...rest}
    >
      {getIcon()}
      <div className="inlineNotification_contentBox">
        <p className="inlineNotification_contentBox_text">{children}</p>
        <Button
          className="inlineNotification_contentBox_exitButton"
          variant="ghost"
          iconOnly
        >
          <IconX />
        </Button>
      </div>
    </div>
  );
};
