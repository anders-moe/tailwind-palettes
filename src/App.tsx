import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Overview } from './sections/Overview';
import { WellData } from './sections/WellData';
import { Analysis } from './sections/Analysis';
import { Operations } from './sections/Operations';

import './components/Sidebar.css';
import './components/Card.css';
import './components/DataTable.css';
import './components/MiniChart.css';
import './App.css';

const sections: Record<string, () => JSX.Element> = {
  overview: Overview,
  wells: WellData,
  analysis: Analysis,
  operations: Operations,
};

function App() {
  const [active, setActive] = useState('overview');
  const Section = sections[active];

  return (
    <div className="app-shell">
      <Sidebar active={active} onNavigate={setActive} />
      <main className="main-area">
        <Section />
      </main>
    </div>
  );
}

export default App;
