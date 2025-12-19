import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react'; // CORREGIDO: import type para ReactNode
import type { 
  UserData, 
  Message, 
  AIHelpOption, 
  OnboardingStep 
} from '../types';

interface AppContextType {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  userData: UserData;
  chat: Message[];
  setChat: (chat: Message[]) => void;
  aiPanelOpen: boolean;
  setAiPanelOpen: (open: boolean) => void;
  showOnboarding: boolean;
  setShowOnboarding: (show: boolean) => void;
  onboardingStep: number;
  setOnboardingStep: (step: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
  const [chat, setChat] = useState<Message[]>([
    { type: 'ai', text: '¡Hola! Soy tu asistente cognitivo.' }
  ]);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(0);
  
  // Datos simulados - en producción venirían de una API
  const userData: UserData = {
    sats: 125000,
    btc: 0.00125,
    progress: 68,
    tasks: 12,
    skills: [
      { name: 'Python', level: 85, verified: true, projects: 12, earnings: 45000 },
      { name: 'Bitcoin', level: 95, verified: true, projects: 8, earnings: 38000 },
      { name: 'Lightning', level: 45, verified: false, projects: 3, earnings: 12000 }
    ],
    portfolio: [
      { title: 'Script Automatización Python', client: 'Tech Corp', sats: 5000, rating: 5, tags: ['Python', 'API'] },
      { title: 'Dashboard Bitcoin Analytics', client: 'CryptoStart', sats: 7500, rating: 5, tags: ['Data', 'Bitcoin'] },
      { title: 'Documentación API REST', client: 'DevHub', sats: 3000, rating: 4, tags: ['Docs'] },
      { title: 'Debug Lightning System', client: 'LN Services', sats: 4500, rating: 5, tags: ['Lightning'] }
    ],
    badges: [
      { icon: '', title: 'Early Adopter', desc: 'Primeros 100 usuarios' },
      { icon: '', title: 'Lightning Fast', desc: '10 tareas en 24h' },
      { icon: '', title: 'Perfect Score', desc: '100% en módulo' },
      { icon: '', title: 'Top Earner', desc: '+100k sats' }
    ]
  };

  return (
    <AppContext.Provider value={{
      currentPage,
      setCurrentPage,
      menuOpen,
      setMenuOpen,
      userData,
      chat,
      setChat,
      aiPanelOpen,
      setAiPanelOpen,
      showOnboarding,
      setShowOnboarding,
      onboardingStep,
      setOnboardingStep
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};