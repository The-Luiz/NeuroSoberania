import React from 'react';
import { 
  Bitcoin, TrendingUp, ArrowDown, ArrowUp, 
  CheckCircle, AlertTriangle 
} from 'lucide-react';
import type { Transaction } from '../types';
import { useAppContext } from '../context/AppContext';

const Wallet: React.FC = () => {
  const { userData } = useAppContext();
  
  // Datos simulados - en producción vendrían de una API o contexto
  const transactions: Transaction[] = [
    { id: '1', desc: 'Módulo completado', amount: 500, time: '2h', type: 'income' },
    { id: '2', desc: 'Micro-tarea: Debug', amount: 1000, time: '5h', type: 'income' },
    { id: '3', desc: 'Lección Bitcoin', amount: 250, time: '1d', type: 'income' }
  ];

  const handleReceive = () => {
    console.log('Abrir modal para recibir sats');
    // Aquí iría la lógica para generar una invoice Lightning
  };

  const handleSend = () => {
    console.log('Abrir modal para enviar sats');
    // Aquí iría la lógica para enviar sats
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-6">Lightning Wallet</h2>
      
      {/* Tarjeta Principal de Balance */}
      <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-xl p-6 shadow-xl mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <Bitcoin className="w-14 h-14 mr-4" />
            <div>
              <div className="text-2xl md:text-3xl font-bold">{userData.sats.toLocaleString()} sats</div>
              <div className="text-sm opacity-75">≈ {(userData.sats / 100000000).toFixed(8)} BTC</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          <button 
            onClick={handleReceive}
            className="bg-white bg-opacity-20 py-3 rounded-lg font-semibold hover:bg-opacity-30 transition-all focus:ring-2 focus:ring-white focus:outline-none"
            aria-label="Recibir satoshis"
          >
            <div className="flex items-center justify-center gap-2">
              <ArrowDown className="w-5 h-5" />
              <span>Recibir</span>
            </div>
          </button>
          <button 
            onClick={handleSend}
            className="bg-white bg-opacity-20 py-3 rounded-lg font-semibold hover:bg-opacity-30 transition-all focus:ring-2 focus:ring-white focus:outline-none"
            aria-label="Enviar satoshis"
          >
            <div className="flex items-center justify-center gap-2">
              <ArrowUp className="w-5 h-5" />
              <span>Enviar</span>
            </div>
          </button>
        </div>
      </div>

      {/* Historial de Transacciones */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Historial</h3>
          <button 
            className="text-purple-600 hover:text-purple-800 text-sm font-medium transition-colors"
            aria-label="Ver historial completo"
          >
            Ver todo
          </button>
        </div>
        <div className="space-y-3">
          {transactions.length > 0 ? (
            transactions.map((tx) => (
              <div 
                key={tx.id} 
                className="flex justify-between items-center py-3 px-2 hover:bg-gray-50 transition-colors rounded-lg group cursor-pointer"
                role="button"
                tabIndex={0}
                onClick={() => console.log(`Ver detalles de transacción: ${tx.id}`)}
                onKeyDown={(e) => e.key === 'Enter' && console.log(`Ver detalles de transacción: ${tx.id}`)}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-2 rounded-full ${
                    tx.type === 'income' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {tx.type === 'income' ? (
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    ) : (
                      <ArrowUp className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm text-gray-800 truncate">{tx.desc}</div>
                    <div className="text-xs text-gray-500">{tx.time} ago</div>
                  </div>
                </div>
                <div className={`font-bold ${
                  tx.type === 'income' ? 'text-green-600' : 'text-blue-600'
                }`}>
                  {tx.type === 'income' ? '+' : '-'}{tx.amount} sats
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No hay transacciones aún
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Wallet;