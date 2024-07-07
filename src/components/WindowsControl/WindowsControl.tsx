import { IconX, IconMinus, IconSquare } from '@tabler/icons-react';
import {} from 'electron';
import './windowsControl.scss';

interface Props {
  variant: 'minimize' | 'expand' | 'close';
}

export const WindowsControl = ({ variant }: Props) => {
  const getIcon = () => {
    const icons = {
      minimize: () => <IconMinus />,
      expand: () => <IconSquare />,
      close: () => <IconX />,
    };
    return icons[variant]();
  };

  const handleClick = () => {
    const actions = {
      minimize: () => {},
      expand: () => {},
      close: () => {},
    };

    actions[variant]();
  };

  return <button onClick={handleClick}>{getIcon()}</button>;
};
