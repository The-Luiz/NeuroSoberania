import React, { useState } from 'react';
import { 
  Brain, Bitcoin, Clock, Briefcase, Tag, Search, Filter, 
  ChevronDown, Star, ChevronRight, MapPin, Zap 
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import JobCard from '../components/marketplace/JobCard';
import CategoryFilter from '../components/marketplace/CategoryFilter';

interface Job {
  id: number;
  title: string;
  description: string;
  category: string;
  reward: number;
  timeEstimate: number;
  difficulty: 'Fácil' | 'Medio' | 'Difícil';
  client: {
    name: string;
    rating: number;
    country: string;
  };
  tags: string[];
  verified: boolean;
}

const Marketplace: React.FC = () => {
  const { setAiPanelOpen, userData } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [sortOption, setSortOption] = useState('recommended');

  // Datos simulados - en producción vendrían de una API
  const jobs: Job[] = [
    {
      id: 1,
      title: 'Desarrollar script de automatización en Python',
      description: 'Necesito un script que automatice la descarga y procesamiento de datos desde una API pública',
      category: 'Desarrollo',
      reward: 5000,
      timeEstimate: 2,
      difficulty: 'Fácil',
      client: {
        name: 'Tech Startup',
        rating: 4.8,
        country: 'México'
      },
      tags: ['Python', 'API', 'Automatización'],
      verified: true
    },
    {
      id: 2,
      title: 'Analizar datos de transacciones Bitcoin',
      description: 'Analizar un conjunto de datos de transacciones en la cadena de bloques para identificar patrones',
      category: 'Análisis de Datos',
      reward: 8500,
      timeEstimate: 4,
      difficulty: 'Medio',
      client: {
        name: 'Blockchain Analytics',
        rating: 4.9,
        country: 'Argentina'
      },
      tags: ['Bitcoin', 'Data Science', 'Python'],
      verified: true
    },
    {
      id: 3,
      title: 'Configurar nodo Lightning Network',
      description: 'Ayuda para configurar y optimizar un nodo Lightning Network para pagos instantáneos',
      category: 'Infraestructura',
      reward: 12000,
      timeEstimate: 6,
      difficulty: 'Difícil',
      client: {
        name: 'LN Services',
        rating: 4.7,
        country: 'Colombia'
      },
      tags: ['Lightning Network', 'DevOps', 'Bitcoin'],
      verified: true
    },
    {
      id: 4,
      title: 'Crear tutorial de programación Bitcoin',
      description: 'Escribir un tutorial detallado para principiantes sobre cómo programar aplicaciones con Bitcoin',
      category: 'Educación',
      reward: 3500,
      timeEstimate: 3,
      difficulty: 'Fácil',
      client: {
        name: 'CryptoEdu',
        rating: 4.6,
        country: 'Chile'
      },
      tags: ['Bitcoin', 'Educación', 'Documentación'],
      verified: true
    },
    {
      id: 5,
      title: 'Desarrollar API para wallet Lightning',
      description: 'Crear una API REST que permita a los usuarios gestionar su wallet Lightning',
      category: 'Desarrollo',
      reward: 15000,
      timeEstimate: 8,
      difficulty: 'Difícil',
      client: {
        name: 'SatsPay',
        rating: 5.0,
        country: 'Perú'
      },
      tags: ['Lightning', 'API', 'Node.js', 'TypeScript'],
      verified: true
    },
    {
      id: 6,
      title: 'Revisar seguridad de contrato inteligente',
      description: 'Auditoría de seguridad para un contrato inteligente de Bitcoin en la capa 2',
      category: 'Seguridad',
      reward: 20000,
      timeEstimate: 10,
      difficulty: 'Difícil',
      client: {
        name: 'SecureChain',
        rating: 4.9,
        country: 'España'
      },
      tags: ['Seguridad', 'Smart Contracts', 'Bitcoin'],
      verified: true
    }
  ];

  const categories = [
    'Todas',
    'Desarrollo',
    'Análisis de Datos',
    'Infraestructura',
    'Educación',
    'Seguridad'
  ];

  const filteredJobs = jobs
    .filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(job => 
      selectedCategory === 'Todas' || job.category === selectedCategory
    )
    .sort((a, b) => {
      if (sortOption === 'reward') return b.reward - a.reward;
      if (sortOption === 'time') return a.timeEstimate - b.timeEstimate;
      // recommended sort - combina rating del cliente y recompensa
      return (b.client.rating * b.reward) - (a.client.rating * a.reward);
    });

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Mercado de Oportunidades
          </h2>
          <p className="text-gray-600">Encuentra proyectos que coincidan con tus habilidades y gana satoshis</p>
        </div>
        <button
          onClick={() => setAiPanelOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all font-semibold text-sm"
          aria-label="Abrir asistente para recomendaciones de trabajo"
        >
          <Brain className="w-4 h-4" />
          ¿Qué trabajos me recomiendas?
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar trabajos, habilidades o categorías..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar oportunidades"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <CategoryFilter 
              categories={categories} 
              selectedCategory={selectedCategory} 
              onSelectCategory={setSelectedCategory} 
            />
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all cursor-pointer"
                aria-label="Ordenar resultados"
              >
                <option value="recommended">Recomendados</option>
                <option value="reward">Mayor recompensa</option>
                <option value="time">Menor tiempo</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-200">
          <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No se encontraron oportunidades</h3>
          <p className="text-gray-600 mb-4">
            Intenta ajustar tus filtros o busca términos diferentes
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('Todas');
              setSortOption('recommended');
            }}
            className="text-purple-600 hover:text-purple-800 font-medium transition-colors"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      <div className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
        <div className="flex items-start gap-4">
          <div className="bg-white p-3 rounded-xl shadow-md">
            <Zap className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">¿Listo para tu primera oportunidad?</h3>
            <p className="text-gray-600 mb-4">
              Completa los módulos de aprendizaje para desbloquear trabajos más complejos y mejor pagados. 
              Tu perfil actual te permite aplicar a {filteredJobs.filter(j => j.difficulty === 'Fácil').length} trabajos de nivel principiante.
            </p>
            <button
              onClick={() => setAiPanelOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              <Brain className="w-4 h-4" />
              Obtener recomendaciones personalizadas
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Marketplace;