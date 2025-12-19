import React from 'react';
import { Brain, BarChart3, BookOpen, Briefcase, Wallet, Award, Settings, Menu, X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import NavButton from './NavButton';

const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage, menuOpen, setMenuOpen } = useAppContext();

  const navigationItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
    { id: 'mentor', icon: Brain, label: 'Mentor IA' },
    { id: 'learning', icon: BookOpen, label: 'Aprender' },
    { id: 'marketplace', icon: Briefcase, label: 'Oportunidades' },
    { id: 'wallet', icon: Wallet, label: 'Wallet' },
    { id: 'profile', icon: Award, label: 'Perfil' },
    { id: 'settings', icon: Settings, label: 'Ajustes' }
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8" />
            <h1 className="text-xl font-bold">Neuro-Soberanía</h1>
          </div>
          <div className="hidden md:flex gap-2">
            {navigationItems.map((item) => (
              <NavButton 
                key={item.id}
                icon={item.icon}
                label={item.label}
                id={item.id} 
              />
            ))}
          </div>
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="md:hidden"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        
        {menuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full ${
                  currentPage === item.id
                    ? 'bg-white bg-opacity-20'
                    : 'hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <item.icon />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;