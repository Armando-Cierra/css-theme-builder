import { Tooltip } from 'react-tooltip';
import { Template } from '@/components';
import { tooltipID, tooltipStyles } from '@/utils';
import { Route, Routes } from 'react-router-dom';
import { Home, Test } from '@/views';

export default function App() {
  return (
    <>
      <Tooltip style={tooltipStyles} id={tooltipID} />
      <Template>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Template>
    </>
  );
}
