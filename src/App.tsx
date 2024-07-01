import { Tooltip } from 'react-tooltip';
import { Template } from '@/components';
import { tooltipID, tooltipStyles } from '@/utils';

export default function App() {
  return (
    <>
      <Tooltip style={tooltipStyles} id={tooltipID} />
      <Template>
        <h1>Template Content</h1>
      </Template>
    </>
  );
}
