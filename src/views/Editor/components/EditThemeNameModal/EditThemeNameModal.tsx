import { IconEdit } from '@tabler/icons-react';
import { Button, Modal, Input } from '@/components';
import { tooltipID } from '@/utils';
import { useEditThemeNameModal } from './useEditThemeNameModal';
import './editThemeNameModal.scss';

export const EditThemeNameModal = () => {
  const {
    t,
    isOpen,
    value,
    openModal,
    handleFormSubmit,
    handleThemeNameChange,
    handleCancel,
  } = useEditThemeNameModal();

  return (
    <>
      <Button
        variant="ghost"
        iconOnly
        data-tooltip-id={tooltipID}
        data-tooltip-content="Edit Theme Name"
        data-tooltip-place="right"
        onClick={openModal}
      >
        <IconEdit />
      </Button>

      <Modal isOpen={isOpen} onCloseModal={handleCancel}>
        <Modal.Title>{t('editor.components.editThemeName')}</Modal.Title>
        <Modal.Content>
          <form className="editThemeNameModal_form" onSubmit={handleFormSubmit}>
            <Input value={value} onChange={handleThemeNameChange} />
            <Button type="button" onClick={handleCancel}>
              {t('general.cancel')}
            </Button>
            {value.length !== 0 && (
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
