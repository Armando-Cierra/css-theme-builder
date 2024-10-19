import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { EditorContext } from '../../context';
import { EditorContextProps } from '@/types';

export const useEditThemeNameModal = () => {
  const { t } = useTranslation();
  const {
    theme: { name: themeName },
    themeActions,
  } = useContext(EditorContext) as EditorContextProps;

  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(themeName);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    themeActions.editThemeName(value);
    closeModal();
  };

  const handleThemeNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setValue(event.target.value);
  };

  const handleCancel = () => {
    setValue(themeName);
    closeModal();
  };

  return {
    t,
    isOpen,
    value,
    openModal,
    handleFormSubmit,
    handleThemeNameChange,
    handleCancel,
  };
};
