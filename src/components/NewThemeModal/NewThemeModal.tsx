import { Modal, ModalProps, Button } from '@/components';
import './newThemeModal.scss';

type CustomModalProps = Omit<ModalProps, 'children'>;
interface Props extends CustomModalProps {
  onCreateTheme: (e: 'simple' | 'dual') => void;
}

export const NewThemeModal = ({ isOpen, onCreateTheme, ...rest }: Props) => {
  const handleThemeCreation = (themeType: 'simple' | 'dual') => () => {
    const themeTypes = {
      simple: () => onCreateTheme('simple'),
      dual: () => onCreateTheme('dual'),
    };

    themeTypes[themeType]();
  };

  return (
    <>
      <Modal isOpen={isOpen} {...rest}>
        <Modal.Title>New Theme</Modal.Title>
        <Modal.Description>
          Select the type of theme that matches the better with your project
          needs.
        </Modal.Description>
        <Modal.Content className="newThemeModal">
          <div className="section">
            <div className="textContent">
              <span>Simple</span>
              <p>
                Opt for this option if you prefer a simplified approach without
                the need for Dark and Light mode variations. Your theme will
                maintain a consistent look and feel across all platforms and
                environments.
              </p>
            </div>
            <Button
              variant="contrast"
              isFullWidth
              onClick={handleThemeCreation('simple')}
            >
              Create
            </Button>
          </div>
          <div className="section">
            <div className="textContent">
              <span>Dual</span>
              <p>
                Choose this option if you want your theme to adapt seamlessly to
                different environments. With Dual Mode, your theme will offer
                both Dark and Light modes, providing users the flexibility to
                switch between them based on their preference or environment.
              </p>
            </div>
            <Button
              variant="contrast"
              isFullWidth
              onClick={handleThemeCreation('dual')}
            >
              Create
            </Button>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};
