import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Modal, ModalProps, Button } from '@/components';
import './newThemeModal.scss';
import { ThemeType } from '@/types';

type CustomModalProps = Omit<ModalProps, 'children'>;
interface Props extends CustomModalProps {}

export const NewThemeModal = ({ isOpen, onCloseModal, ...rest }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleThemeCreation = (themeType: ThemeType) => () => {
    onCloseModal?.();
    setTimeout(() => {
      navigate('/theme-editor', {
        state: { theme: undefined, type: themeType },
      });
    }, 300);
  };

  return (
    <>
      <Modal isOpen={isOpen} onCloseModal={onCloseModal} {...rest}>
        <Modal.Title>{t('components.newThemeModal.title')}</Modal.Title>
        <Modal.Description>
          {t('components.newThemeModal.description')}
        </Modal.Description>
        <Modal.Content className="newThemeModal">
          <div className="section">
            <div className="textContent">
              <span>{t('components.newThemeModal.cards.simple.title')}</span>
              <p>{t('components.newThemeModal.cards.simple.description')}</p>
            </div>
            <Button
              variant="contrast"
              isFullWidth
              onClick={handleThemeCreation('simple')}
            >
              {t('general.create')}
            </Button>
          </div>
          <div className="section">
            <div className="textContent">
              <span>{t('components.newThemeModal.cards.dual.title')}</span>
              <p>{t('components.newThemeModal.cards.simple.description')}</p>
            </div>
            <Button
              variant="contrast"
              isFullWidth
              onClick={handleThemeCreation('dual')}
            >
              {t('general.create')}
            </Button>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};
