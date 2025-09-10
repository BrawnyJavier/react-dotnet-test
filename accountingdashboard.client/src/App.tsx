import { useState } from 'react';
import './App.css';
import Layout from './components/Layout';
import RulesTable from './components/RulesTable';

function App() {
  const [currentSection, setCurrentSection] = useState('receivables-monitoring');

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'receivables-monitoring':
        return <RulesTable />;
      case 'commission-validation':
        return (
          <div className="coming-soon">
            <h1>Commission Validation</h1>
            <p>This feature is coming soon...</p>
          </div>
        );
      case 'cpc-spend-monitoring':
        return (
          <div className="coming-soon">
            <h1>CPC & Spend Monitoring</h1>
            <p>This feature is coming soon...</p>
          </div>
        );
      default:
        return <RulesTable />;
    }
  };

  return (
    <Layout currentSection={currentSection} onNavigate={handleNavigate}>
      {renderContent()}
    </Layout>
  );
}

export default App;