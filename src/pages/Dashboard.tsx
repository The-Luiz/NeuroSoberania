import React from 'react';
import { 
  Brain, Bitcoin, Target, CheckCircle, TrendingUp, Zap, Award, 
  ChevronRight, Clock // AGREGA Clock aquí
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import BalanceCard from '../components/dashboard/BalanceCard';
import ProgressCard from '../components/dashboard/ProgressCard';
import TaskCard from '../components/dashboard/TaskCard';
import SkillMap from '../components/dashboard/SkillMap';
import SovereigntyCycle from '../components/dashboard/SovereigntyCycle';
import QuickActions from '../components/dashboard/QuickActions';

const Dashboard: React.FC = () => {
  const { userData, setAiPanelOpen, setCurrentPage } = useAppContext();

  return (
    <>
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Bienvenido a tu Panel de Soberanía
        </h2>
        <p className="text-gray-600">Impulsa tu autonomía cognitiva, financiera y profesional</p>
        <button
          onClick={() => setAiPanelOpen(true)}
          className="mt-3 flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all font-semibold text-sm"
          aria-label="Abrir asistente cognitivo"
        >
          <Brain className="w-4 h-4" />
          ¿Necesitas ayuda con tu panel?
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <BalanceCard balance={userData.sats} btc={userData.btc} />
        <ProgressCard progress={userData.progress} />
        <TaskCard tasks={userData.tasks} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <SkillMap skills={userData.skills} />
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-xl">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Tu Próxima Misión</h3>
              <p className="text-sm text-gray-500">Continúa tu desarrollo</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-4">
            <h4 className="font-bold text-lg mb-3 text-gray-800">Completar módulo: Funciones en Python</h4>
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="flex items-center gap-1 text-sm bg-white px-3 py-1.5 rounded-lg shadow-sm">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="font-semibold">15 min</span>
              </span>
              <span className="flex items-center gap-1 text-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1.5 rounded-lg shadow-md">
                <Bitcoin className="w-4 h-4" />
                <span className="font-bold">500 sats</span>
              </span>
              <span className="px-3 py-1.5 bg-green-100 text-green-700 text-xs font-semibold rounded-lg">Nivel: Fácil</span>
            </div>
            <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
              Comenzar Ahora →
            </button>
          </div>
          <div className="flex gap-2 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>4 tareas disponibles</span>
            </div>
          </div>
        </div>
      </div>

      <SovereigntyCycle />
      
      <QuickActions setCurrentPage={setCurrentPage} />
    </>
  );
};

export default Dashboard;