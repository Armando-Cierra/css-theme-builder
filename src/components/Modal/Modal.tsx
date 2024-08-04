import { ReactNode } from 'react';
import FocusLock from 'react-focus-lock';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import { spring } from '@/utils';
import { Content, Description, Title } from './modules';
import { useModal } from './useModal';
import './modal.scss';

export interface ModalProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onCloseModal?: () => void;
}

export const Modal = Object.assign(
  ({
    isOpen,
    children,
    className: customClassName,
    onCloseModal,
  }: ModalProps) => {
    const { title, description, content, handleClick, handleKeyDown } =
      useModal(children, onCloseModal);

    return (
      <AnimatePresence>
        {isOpen && (
          <FocusLock>
            <motion.div
              className="modal"
              onClick={handleClick}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                ...spring,
                animate: { duration: 1 },
                exit: { duration: 0.5 },
              }}
              onKeyDown={handleKeyDown}
            >
              <motion.div
                className={classNames('modal_card', {
                  [customClassName as string]: customClassName,
                })}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{
                  ...spring,
                  animate: { duration: 0.5 },
                  exit: { duration: 0.5 },
                }}
              >
                <div className="modal_header">
                  {title}
                  {description}
                </div>
                {content}
              </motion.div>
            </motion.div>
          </FocusLock>
        )}
      </AnimatePresence>
    );
  },
  {
    Title,
    Description,
    Content,
  },
);
