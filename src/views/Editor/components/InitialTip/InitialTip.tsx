import { InlineNotification, Modal, Button, Checkbox } from '@/components';
import { useInitialTip } from './useInitialTip';
import './initialTip.scss';

export const InitialTip = () => {
  const {
    showTip,
    modalIsOpen,
    closeModal,
    handleCheckEvent,
    handleModalAnswer,
    onCloseNotificationRequest,
  } = useInitialTip();

  return (
    <>
      {showTip && (
        <>
          <Modal isOpen={modalIsOpen} onCloseModal={closeModal}>
            <Modal.Title>Hide This Message Permanently?</Modal.Title>
            <Modal.Description>
              Both options will close the message, but if you choose to hide it
              permanently, it won't be displayed again, either here or in any
              other new theme.
            </Modal.Description>
            <Modal.Content className="initialTip">
              <Checkbox
                className="initialTip_checkbox"
                label="Don't show this warning again."
                onChange={handleCheckEvent}
              />
              <div className="initialTip_buttonBox">
                <Button onClick={closeModal} variant="ghost">
                  Cancel
                </Button>
                <Button
                  onClick={handleModalAnswer('hide')}
                  interactiveSemantic="danger"
                >
                  Hide It Permanently
                </Button>
                <Button
                  variant="contrast"
                  onClick={handleModalAnswer('noHide')}
                >
                  Keep Showing It
                </Button>
              </div>
            </Modal.Content>
          </Modal>

          <InlineNotification onClose={onCloseNotificationRequest}>
            The perception of colors might be affected by the selected color
            mode in the application. This can be especially noticeable in the
            base color ramp. The contrast within a light color scale may appear
            more subtle when the application is in dark mode due to the high
            contrast between the dark background and the light color scale.
          </InlineNotification>
        </>
      )}
    </>
  );
};
