import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import AIAssistantPanel from './components/layout/AIAssistantPanel';
import OnboardingModal from './components/layout/OnboardingModal';
import Dashboard from './pages/Dashboard';
import Learning from './pages/Learning';
import Marketplace from './pages/Marketplace';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Mentor from './pages/Mentor';

const PageContent: React.FC = () => {
  const { currentPage } = useAppContext();

  switch (currentPage) {
    case 'dashboard':
      return <Dashboard />;
    case 'learning':
      return <Learning />;
    case 'marketplace':
      return <Marketplace />;
    case 'wallet':
      return <Wallet />;
    case 'profile':
      return <Profile />;
    case 'settings':
      return <Settings />;
    case 'mentor':
      return <Mentor />;
    default:
      return <Dashboard />;
  }
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="p-6 max-w-7xl mx-auto">
          <PageContent />
        </main>
        
        <AIAssistantPanel />
        <OnboardingModal />
      </div>
    </AppProvider>
  );
};

export default App;