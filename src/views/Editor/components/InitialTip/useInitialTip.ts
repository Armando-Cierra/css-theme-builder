import { ChangeEvent, useState } from 'react';

export const useInitialTip = () => {
  const localTipSettings = localStorage.getItem('showTip');
  const localModalWarningSettings = localStorage.getItem('showModalWarning');

  if (localTipSettings === null) localStorage.setItem('showTip', 'true');
  if (localModalWarningSettings === null)
    localStorage.setItem('showModalWarning', 'true');

  const showModalWarning = localModalWarningSettings
    ? JSON.parse(localModalWarningSettings)
    : false;

  const [showTip, setShowTip] = useState(
    localTipSettings ? JSON.parse(localTipSettings) : false,
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [optionIsChecked, setOptionIsChecked] = useState(false);

  const closeModal = () => setModalIsOpen(false);
  const closeNotification = () => setShowTip(false);

  const onCloseNotificationRequest = () => {
    if (showModalWarning) {
      setModalIsOpen(true);
    } else {
      closeNotification();
    }
  };

  const handleModalAnswer = (answer: 'hide' | 'noHide') => () => {
    const closeElements = () => {
      closeModal();
      closeNotification();
    };

    const actions = {
      hide: () => {
        closeElements();
        localStorage.setItem('showTip', 'false');
      },
      noHide: () => {
        closeElements();
        if (optionIsChecked) localStorage.setItem('showModalWarning', 'false');
      },
    };

    actions[answer]();
  };

  const handleCheckEvent = (e: ChangeEvent<HTMLInputElement>) =>
    setOptionIsChecked(e.target.checked);

  return {
    showTip,
    modalIsOpen,
    closeModal,
    handleCheckEvent,
    handleModalAnswer,
    onCloseNotificationRequest,
  };
};
