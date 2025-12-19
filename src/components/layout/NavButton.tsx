import React from 'react';
import { useAppContext } from '../../context/AppContext';

interface NavButtonProps {
  icon: React.ElementType;
  label: string;
  id: string;
}

const NavButton: React.FC<NavButtonProps> = ({ icon: Icon, label, id }) => {
  const { currentPage, setCurrentPage, setMenuOpen } = useAppContext();

  const isActive = currentPage === id;
  
  const handleClick = () => {
    setCurrentPage(id);
    // Cerrar menú móvil si está abierto
    setMenuOpen(false);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
        isActive
          ? 'bg-white bg-opacity-30 backdrop-blur-sm shadow-lg'
          : 'hover:bg-white hover:bg-opacity-20'
      }`}
      aria-current={isActive ? 'page' : undefined}
      aria-label={label}
    >
      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white/90'}`} />
      <span className={`font-medium text-sm hidden md:inline ${
        isActive ? 'text-white' : 'text-white/90'
      }`}>
        {label}
      </span>
    </button>
  );
};

export default NavButton;