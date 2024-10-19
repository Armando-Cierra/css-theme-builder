import { useState } from 'react';
import chroma from 'chroma-js';
import { useTranslation } from 'react-i18next';

export const useEditColorValue = (
  color: string,
  editAction: (newColor: string) => void,
  removeAction?: () => void,
) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(color);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    editAction(value);
    closeModal();
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (chroma.valid(newValue)) {
      setValue(chroma(newValue).hex());
    } else {
      setValue(newValue);
    }
  };

  const handleCancel = () => {
    setValue(color);
    closeModal();
  };

  const handleRemoveItem = () => {
    removeAction?.();
    closeModal();
  };

  const saveValidation = chroma.valid(value) && value.length !== 0;

  return {
    t,
    isOpen,
    value,
    openModal,
    handleFormSubmit,
    handleValueChange,
    handleCancel,
    handleRemoveItem,
    saveValidation,
  };
};
