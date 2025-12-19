import React from 'react';
import { Bitcoin } from 'lucide-react';

interface BalanceCardProps {
  balance: number;
  btc: number;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ balance, btc }) => {
  return (
    <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-xl p-6 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-medium opacity-90">Balance Total</h3>
          <div className="text-3xl font-bold mt-1">{balance.toLocaleString()} sats</div>
          <div className="text-sm opacity-75 mt-1">≈ {btc} BTC</div>
        </div>
        <Bitcoin className="w-12 h-12" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button className="bg-white bg-opacity-20 py-2 rounded-lg font-semibold text-sm hover:bg-opacity-30 transition-all">
          Recibir
        </button>
        <button className="bg-white bg-opacity-20 py-2 rounded-lg font-semibold text-sm hover:bg-opacity-30 transition-all">
          Enviar
        </button>
      </div>
    </div>
  );
};

export default BalanceCard;