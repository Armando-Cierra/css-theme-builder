import { IconEdit } from '@tabler/icons-react';
import { Button, Modal, Input } from '@/components';
import { getDynamicContrastColor, tooltipID } from '@/utils';
import { useEditColorValue } from './useEditColorValue';
import './editColorValue.scss';
import classNames from 'classnames';

interface Props {
  className?: string;
  color: string;
  editAction: (newColor: string) => void;
  removeAction?: () => void;
}

export const EditColorValue = ({
  className: customClassName,
  color,
  editAction,
  removeAction,
}: Props) => {
  const {
    t,
    isOpen,
    value,
    openModal,
    handleValueChange,
    handleFormSubmit,
    handleRemoveItem,
    handleCancel,
    saveValidation,
  } = useEditColorValue(color, editAction, removeAction);

  return (
    <>
      <div
        className={classNames('editColorValue', {
          [customClassName as string]: customClassName,
        })}
        style={{ backgroundColor: color }}
        onClick={openModal}
        data-tooltip-id={tooltipID}
        data-tooltip-html={color}
        data-tooltip-place="bottom"
      >
        <IconEdit style={{ color: getDynamicContrastColor(color) }} />
      </div>

      <Modal isOpen={isOpen} onCloseModal={handleCancel}>
        <Modal.Title>{t('editor.components.editColor')}</Modal.Title>
        <Modal.Content>
          <form className="editThemeNameModal_form" onSubmit={handleFormSubmit}>
            <Input value={value} onChange={handleValueChange} />
            <Button type="button" onClick={handleCancel}>
              {t('general.cancel')}
            </Button>
            {removeAction && (
              <Button
                type="button"
                interactiveSemantic="danger"
                onClick={() => {
                  handleRemoveItem();
                }}
              >
                {t('general.delete')}
              </Button>
            )}
            {saveValidation && (
              <Button type="submit" variant="contrast">
                {t('general.saveChanges')}
              </Button>
            )}
          </form>
        </Modal.Content>
      </Modal>
    </>
  );
};
