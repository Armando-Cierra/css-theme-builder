import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { Modal, Button } from '@/components';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Tooltip id="css-builder-tooltip" />
      <main>
        <Button onClick={() => setIsOpen(true)}>Show Modal</Button>

        <Modal isOpen={isOpen} onCloseModal={() => setIsOpen(false)}>
          <Modal.Title>Modal Title</Modal.Title>
          <Modal.Description>Lorem Ipsum</Modal.Description>
          <Modal.Content>Lorem Ipsum Dolore</Modal.Content>
        </Modal>
      </main>
    </>
  );
}
