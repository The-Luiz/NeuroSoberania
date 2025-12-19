import React, { useState } from 'react';
import { 
  Award, Brain, CheckCircle, Briefcase, TrendingUp, 
  Zap, Star, ChevronRight, Edit2, Share2, Download 
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import SkillCard from '../components/profile/SkillCard';
import PortfolioItem from '../components/profile/PortfolioItem';
import BadgeCard from '../components/profile/BadgeCard';

const Profile: React.FC = () => {
  const { userData, setAiPanelOpen } = useAppContext();
  const [activeTab, setActiveTab] = useState('skills');

  return (
    <>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Perfil Proof-of-Skill
          </h2>
          <p className="text-gray-600">Tu reputación en la economía de conocimiento</p>
        </div>
        <button
          onClick={() => setAiPanelOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all font-semibold text-sm"
          aria-label="Abrir asistente para optimizar perfil"
        >
          <Brain className="w-4 h-4" />
          Optimizar mi perfil
        </button>
      </div>

      {/* Header del Perfil */}
      <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm border-2 border-white border-opacity-30">
                <span className="text-3xl font-bold">ND</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Usuario Neurodivergente</h3>
                <div className="flex items-center gap-2 mt-1">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span className="text-sm opacity-90">
                    {userData.tasks} tareas completadas • {userData.sats.toLocaleString()} sats ganados
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all">
                <Edit2 className="w-4 h-4" />
                Editar perfil
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all">
                <Share2 className="w-4 h-4" />
                Compartir
              </button>
            </div>
          </div>
        </div>
        
        {/* Estadísticas del Perfil */}
        <div className="p-6 bg-gray-50 border-b border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-purple-50 p-4 rounded-xl text-center border border-purple-100">
              <Award className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-xl font-bold text-gray-800">4</div>
              <div className="text-xs text-gray-600 mt-1">Habilidades Verificadas</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-xl font-bold text-gray-800">72%</div>
              <div className="text-xs text-gray-600 mt-1">Crecimiento Mensual</div>
            </div>
            <div className="bg-green-50 p-4 rounded-xl text-center border border-green-100">
              <Briefcase className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-xl font-bold text-gray-800">8</div>
              <div className="text-xs text-gray-600 mt-1">Proyectos Completados</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-xl text-center border border-yellow-100">
              <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
              <div className="text-xl font-bold text-gray-800">98%</div>
              <div className="text-xs text-gray-600 mt-1">Satisfacción de Clientes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs de Navegación */}
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-all ${
              activeTab === 'skills'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Habilidades
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-all ${
              activeTab === 'portfolio'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Portafolio
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-all ${
              activeTab === 'badges'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Insignias
          </button>
          <button
            onClick={() => setActiveTab('reputation')}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-all ${
              activeTab === 'reputation'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Reputación
          </button>
        </div>
      </div>

      {/* Contenido según Tab Activo */}
      <div className="mb-8">
        {activeTab === 'skills' && (
          <div className="grid md:grid-cols-2 gap-6">
            {userData.skills.map((skill, index) => (
              <SkillCard key={index} skill={skill} />
            ))}
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="space-y-4">
            {userData.portfolio.map((item, index) => (
              <PortfolioItem key={index} item={item} />
            ))}
            <button className="w-full mt-4 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-dashed border-purple-300 rounded-xl py-6 text-purple-600 hover:bg-white transition-all">
              + Añadir nuevo proyecto
            </button>
          </div>
        )}

        {activeTab === 'badges' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {userData.badges.map((badge, index) => (
              <BadgeCard key={index} badge={badge} />
            ))}
          </div>
        )}

        {activeTab === 'reputation' && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="mb-6">
              <h4 className="text-lg font-bold text-gray-800 mb-1">Puntuación General</h4>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                9.7/10
              </div>
              <div className="flex mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < 4.5 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-600">(42 valoraciones)</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-gray-800 mb-3">Fortalezas</h5>
                <ul className="space-y-2">
                  {['Calidad de trabajo', 'Comunicación', 'Puntualidad', 'Resolución de problemas'].map((strength, i) => (
                    <li key={i} className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-5 h-5" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="font-semibold text-gray-800 mb-3">Áreas de Oportunidad</h5>
                <ul className="space-y-2">
                  {['Documentación', 'Gestión de tiempo en proyectos complejos'].map((area, i) => (
                    <li key={i} className="flex items-center gap-2 text-blue-700">
                      <Zap className="w-5 h-5" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={() => setAiPanelOpen(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
              >
                <Brain className="w-5 h-5" />
                Obtener plan de mejora personalizado
                <ChevronRight className="w-4 h-4" />
              </button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Tu asistente IA analizará tus fortalezas y áreas de oportunidad para crear un plan de desarrollo
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Sección de Acciones */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
        <div className="flex items-start gap-4">
          <div className="bg-white p-3 rounded-xl shadow-md mt-1">
            <Award className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">¿Listo para tu independencia?</h3>
            <p className="text-gray-600 mb-4">
              Con tu nivel actual, puedes comenzar a crear tu propio servicio independiente. 
              Tu asistente IA puede ayudarte a estructurar tu oferta y fijar precios competitivos.
            </p>
            <button
              onClick={() => setAiPanelOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              <Brain className="w-4 h-4" />
              Crear mi micro-empresa
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;