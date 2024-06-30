import { Tooltip } from 'react-tooltip';
import { IconMailFilled } from '@tabler/icons-react';
import { Input } from '@/components';

export default function App() {
  return (
    <>
      <Tooltip id="css-builder-tooltip" />
      <main>
        <Input
          icon={<IconMailFilled />}
          placeholder="lorem ipsum"
          onClean={() => console.log('hello')}
        />
      </main>
    </>
  );
}
