import {
  Children,
  isValidElement,
  KeyboardEventHandler,
  ReactNode,
} from 'react';
import { Title, Description, Content } from './modules';

export const useModal = (children: ReactNode, onCloseModal?: () => void) => {
  const childrenArray = Children.toArray(children);
  let title: ReactNode, description: ReactNode, content: ReactNode;

  childrenArray.forEach((item) => {
    if (isValidElement(item)) {
      if (item.type === Title) title = item;
      if (item.type === Description) description = item;
      if (item.type === Content) content = item;
    }
  });

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).className === 'modal') onCloseModal?.();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Escape') onCloseModal?.();
  };

  return { title, description, content, handleClick, handleKeyDown };
};
