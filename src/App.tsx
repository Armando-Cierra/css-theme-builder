import { Button, ButtonGroup } from '@/components';

export default function App() {
  return (
    <main>
      <ButtonGroup>
        <Button variant="ghost">Element 1</Button>
        <Button variant="ghost" isSelected>
          Element 2
        </Button>
        <Button variant="ghost">Element 3</Button>
      </ButtonGroup>
    </main>
  );
}
