import React, { useState } from 'react';
import { Bitcoin, Brain, BookOpen, Briefcase, Wallet, Award, Settings, Menu, X, TrendingUp, Clock, Zap, CheckCircle, Target, BarChart3, MessageCircle, ChevronRight } from 'lucide-react';

export default function NeuroSovereigntyPlatform() {
  const [page, setPage] = useState('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
  const [chat, setChat] = useState([{ type: 'ai', text: '¡Hola! Soy tu asistente cognitivo.' }]);
  const [input, setInput] = useState('');
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(0);

  const data = {
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
      { title: 'Script Automatización Python', client: 'TechCorp', sats: 5000, rating: 5, tags: ['Python', 'API'] },
      { title: 'Dashboard Bitcoin Analytics', client: 'CryptoStart', sats: 7500, rating: 5, tags: ['Data', 'Bitcoin'] },
      { title: 'Documentación API REST', client: 'DevHub', sats: 3000, rating: 4, tags: ['Docs'] },
      { title: 'Debug Lightning System', client: 'LN Services', sats: 4500, rating: 5, tags: ['Lightning'] }
    ],
    badges: [
      { icon: '🚀', title: 'Early Adopter', desc: 'Primeros 100 usuarios' },
      { icon: '⚡', title: 'Lightning Fast', desc: '10 tareas en 24h' },
      { icon: '🎯', title: 'Perfect Score', desc: '100% en módulo' },
      { icon: '💎', title: 'Top Earner', desc: '+100k sats' }
    ]
  };

  const nav = (p) => { setPage(p); setMenuOpen(false); };

  const getAIContextualHelp = () => {
    const contexts = {
      dashboard: [
        { icon: <Target />, text: "Explícame mi progreso", action: "analizar progreso" },
        { icon: <Zap />, text: "¿Qué debería hacer ahora?", action: "sugerir acción" },
        { icon: <TrendingUp />, text: "¿Cómo puedo mejorar?", action: "plan mejora" }
      ],
      learning: [
        { icon: <BookOpen />, text: "Simplifica este concepto", action: "simplificar" },
        { icon: <Brain />, text: "Crea un plan de estudio", action: "plan estudio" },
        { icon: <Target />, text: "¿Qué aprender primero?", action: "priorizar" }
      ],
      marketplace: [
        { icon: <Briefcase />, text: "¿Cuál trabajo me conviene?", action: "recomendar trabajo" },
        { icon: <Bitcoin />, text: "¿Es justo este pago?", action: "analizar tarifa" },
        { icon: <Award />, text: "¿Estoy listo para esto?", action: "evaluar capacidad" }
      ],
      profile: [
        { icon: <Briefcase />, text: "Crea mi servicio independiente", action: "microempresario" },
        { icon: <TrendingUp />, text: "¿Qué tarifa cobrar?", action: "calcular tarifa" },
        { icon: <Target />, text: "Mejora mi descripción", action: "optimizar perfil" }
      ],
      wallet: [
        { icon: <Bitcoin />, text: "Explícame Lightning", action: "explicar lightning" },
        { icon: <Target />, text: "Plan de ahorro", action: "plan ahorro" }
      ]
    };
    return contexts[page] || contexts.dashboard;
  };

  const onboardingSteps = [
    {
      title: "¡Bienvenido a Neuro-Soberanía!",
      description: "Soy tu asistente de IA y te guiaré en cada paso. Estoy aquí para ayudarte a alcanzar tu independencia económica.",
      action: "Comenzar tour"
    },
    {
      title: "Tu Panel de Soberanía",
      description: "Aquí ves tu progreso en tiempo real: sats ganados, tareas completadas y habilidades desarrolladas.",
      highlight: "dashboard"
    },
    {
      title: "Aprende y Gana",
      description: "Cada módulo que completes te paga en satoshis instantáneamente. El aprendizaje es tu primera fuente de ingresos.",
      highlight: "learning"
    },
    {
      title: "De Empleado a Emprendedor",
      description: "Primero toma micro-tareas, luego proyectos completos, finalmente crea tu propio servicio. Yo te guío en cada fase.",
      highlight: "profile"
    },
    {
      title: "Siempre Estoy Aquí",
      description: "Haz clic en el botón flotante morado en cualquier momento. Te daré ayuda contextual según dónde estés.",
      highlight: "ai"
    }
  ];

  const NavBtn = ({ icon, label, id }) => (
    <button onClick={() => nav(id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg ${page === id ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'}`}>
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8" />
              <h1 className="text-xl font-bold">Neuro-Soberanía</h1>
            </div>
            
            <div className="hidden md:flex gap-2">
              <NavBtn icon={<BarChart3 size={18} />} label="Dashboard" id="dashboard" />
              <NavBtn icon={<Brain size={18} />} label="Mentor IA" id="mentor" />
              <NavBtn icon={<BookOpen size={18} />} label="Aprender" id="learning" />
              <NavBtn icon={<Briefcase size={18} />} label="Oportunidades" id="marketplace" />
              <NavBtn icon={<Wallet size={18} />} label="Wallet" id="wallet" />
              <NavBtn icon={<Award size={18} />} label="Perfil" id="profile" />
              <NavBtn icon={<Settings size={18} />} label="Ajustes" id="settings" />
            </div>

            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden mt-4 space-y-2">
              <button onClick={() => nav('dashboard')} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white bg-opacity-10 w-full"><BarChart3 />Dashboard</button>
              <button onClick={() => nav('mentor')} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 w-full"><Brain />Mentor IA</button>
              <button onClick={() => nav('learning')} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 w-full"><BookOpen />Aprender</button>
              <button onClick={() => nav('marketplace')} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 w-full"><Briefcase />Oportunidades</button>
              <button onClick={() => nav('wallet')} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 w-full"><Wallet />Wallet</button>
              <button onClick={() => nav('profile')} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 w-full"><Award />Perfil</button>
              <button onClick={() => nav('settings')} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 w-full"><Settings />Ajustes</button>
            </div>
          )}
        </div>
      </nav>

      <main className="p-6 max-w-7xl mx-auto">
        {page === 'dashboard' && (
          <>
            <div className="mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">Bienvenido a tu Panel de Soberanía</h2>
              <p className="text-gray-600">Impulsa tu autonomía cognitiva, financiera y profesional</p>
              
              <button
                onClick={() => setAiPanelOpen(true)}
                className="mt-3 flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all font-semibold text-sm"
              >
                <Brain className="w-4 h-4" />
                ¿Necesitas ayuda con tu panel?
              </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <Bitcoin className="w-12 h-12" />
                    <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs font-semibold">Lightning</div>
                  </div>
                  <div className="text-sm opacity-90 mb-1">Balance Total</div>
                  <div className="text-4xl font-bold mb-1">{data.sats.toLocaleString()}</div>
                  <div className="text-lg opacity-75">satoshis</div>
                  <div className="mt-4 pt-4 border-t border-white border-opacity-20 text-sm">≈ {data.btc} BTC</div>
                </div>
              </div>

              <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 text-white rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <Target className="w-12 h-12" />
                    <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs font-semibold">Esta Semana</div>
                  </div>
                  <div className="text-sm opacity-90 mb-1">Progreso Semanal</div>
                  <div className="text-4xl font-bold mb-4">{data.progress}%</div>
                  <div className="mt-4">
                    <div className="w-full bg-white bg-opacity-30 rounded-full h-3 overflow-hidden">
                      <div className="bg-white h-3 rounded-full shadow-lg transition-all duration-500" style={{width: `${data.progress}%`}}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 text-white rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <CheckCircle className="w-12 h-12" />
                    <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs font-semibold">Completadas</div>
                  </div>
                  <div className="text-sm opacity-90 mb-1">Tareas Finalizadas</div>
                  <div className="text-4xl font-bold mb-1">{data.tasks}</div>
                  <div className="text-sm opacity-75">+3 desde ayer</div>
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>Tendencia positiva</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-xl">
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

              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-3 rounded-xl">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Mapa de Habilidades</h3>
                    <p className="text-sm text-gray-500">Tu evolución verificada</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {data.skills.map((s, i) => (
                    <div key={i} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-800">{s.name}</span>
                          {s.verified && (
                            <div className="bg-green-100 p-1 rounded-full">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </div>
                          )}
                        </div>
                        <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{s.level}%</span>
                      </div>
                      <div className="relative w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div 
                          className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                            s.verified 
                              ? 'bg-gradient-to-r from-green-400 to-emerald-600' 
                              : 'bg-gradient-to-r from-blue-400 to-indigo-600'
                          }`} 
                          style={{width: `${s.level}%`}}
                        >
                          <div className="w-full h-full bg-white opacity-20 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="mt-6 w-full text-purple-600 hover:text-purple-700 font-semibold text-sm flex items-center justify-center gap-2 py-2 hover:bg-purple-50 rounded-lg transition-all">
                  Ver todas las habilidades
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 rounded-2xl p-8 shadow-2xl text-white mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white bg-opacity-20 p-3 rounded-xl backdrop-blur-sm">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Ciclo de Soberanía</h3>
                  <p className="text-sm opacity-80">De aprendiz a profesional autónomo</p>
                </div>
              </div>

              <div className="relative">
                <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6">
                  {[
                    {icon: <Brain/>, label: 'IA Asiste', desc: 'Guía personalizada', color: 'from-purple-500 to-purple-700'},
                    {icon: <Target/>, label: 'Ejecutas', desc: 'Completar tarea', color: 'from-blue-500 to-blue-700'},
                    {icon: <BookOpen/>, label: 'Aprendes', desc: 'Nueva habilidad', color: 'from-green-500 to-green-700'},
                    {icon: <Bitcoin/>, label: 'Ganas BTC', desc: 'Pago instantáneo', color: 'from-orange-500 to-orange-700'},
                    {icon: <Award/>, label: 'Certificas', desc: 'Proof-of-skill', color: 'from-yellow-500 to-yellow-700'},
                    {icon: <Briefcase/>, label: 'Escala', desc: 'Nueva oportunidad', color: 'from-red-500 to-red-700'}
                  ].map((item, i) => (
                    <React.Fragment key={i}>
                      <div className="group flex flex-col items-center">
                        <div className={`bg-gradient-to-br ${item.color} p-5 rounded-2xl w-24 h-24 flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                          {React.cloneElement(item.icon, {size: 32})}
                        </div>
                        <div className="mt-3 text-center">
                          <div className="font-bold text-sm">{item.label}</div>
                          <div className="text-xs opacity-70">{item.desc}</div>
                        </div>
                      </div>
                      {i < 5 && (
                        <ChevronRight className="hidden lg:block text-white opacity-30" size={28} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <button onClick={() => nav('learning')} className="bg-white hover:bg-purple-50 rounded-xl p-6 shadow-lg border-2 border-transparent hover:border-purple-300 transition-all duration-300 text-left group">
                <BookOpen className="w-10 h-10 text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-lg mb-1">Continuar Aprendiendo</h4>
                <p className="text-sm text-gray-600">4 módulos en progreso</p>
              </button>

              <button onClick={() => nav('marketplace')} className="bg-white hover:bg-blue-50 rounded-xl p-6 shadow-lg border-2 border-transparent hover:border-blue-300 transition-all duration-300 text-left group">
                <Briefcase className="w-10 h-10 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-lg mb-1">Ver Oportunidades</h4>
                <p className="text-sm text-gray-600">12 trabajos disponibles</p>
              </button>

              <button onClick={() => nav('mentor')} className="bg-white hover:bg-green-50 rounded-xl p-6 shadow-lg border-2 border-transparent hover:border-green-300 transition-all duration-300 text-left group">
                <Brain className="w-10 h-10 text-green-600 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-lg mb-1">Consultar Mentor IA</h4>
                <p className="text-sm text-gray-600">Siempre disponible para ti</p>
              </button>
            </div>
          </>
        )}

        {page === 'mentor' && (
          <>
            <h2 className="text-3xl font-bold mb-6">Mentor IA</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <button className="bg-purple-500 text-white p-4 rounded-xl"><Brain className="w-6 h-6 mx-auto mb-1" /><div className="text-sm">Explicar</div></button>
              <button className="bg-blue-500 text-white p-4 rounded-xl"><Target className="w-6 h-6 mx-auto mb-1" /><div className="text-sm">Planificar</div></button>
              <button className="bg-green-500 text-white p-4 rounded-xl"><BookOpen className="w-6 h-6 mx-auto mb-1" /><div className="text-sm">Resumir</div></button>
              <button className="bg-orange-500 text-white p-4 rounded-xl"><MessageCircle className="w-6 h-6 mx-auto mb-1" /><div className="text-sm">Ayuda Social</div></button>
            </div>
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 h-96 overflow-y-auto space-y-3">
                {chat.map((m, i) => (
                  <div key={i} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-md px-4 py-2 rounded-xl ${m.type === 'user' ? 'bg-purple-500 text-white' : 'bg-gray-100'}`}>{m.text}</div>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 p-4 border-t flex gap-2">
                <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && (setChat([...chat, {type: 'user', text: input}, {type: 'ai', text: 'Entiendo...'}]), setInput(''))} placeholder="Escribe tu pregunta..." className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500" />
                <button onClick={() => (setChat([...chat, {type: 'user', text: input}, {type: 'ai', text: 'Entiendo...'}]), setInput(''))} className="bg-purple-500 text-white px-6 py-2 rounded-lg font-semibold">Enviar</button>
              </div>
            </div>
          </>
        )}

        {page === 'learning' && (
          <>
            <h2 className="text-3xl font-bold mb-2">Aprendizaje Just-In-Time</h2>
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">Cada módulo te paga en satoshis</p>
              <button
                onClick={() => setAiPanelOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all font-semibold text-sm"
              >
                <Brain className="w-4 h-4" />
                ¿Qué debería aprender primero?
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {title: 'Fundamentos Python', progress: 75, reward: 500, time: 10, done: false},
                {title: 'Bitcoin y Blockchain', progress: 100, reward: 750, time: 20, done: true},
                {title: 'Análisis de Datos', progress: 30, reward: 1000, time: 25, done: false},
                {title: 'Lightning Network', progress: 0, reward: 1500, time: 30, done: false}
              ].map((m, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex justify-between mb-3">
                    <h3 className="font-bold">{m.title}</h3>
                    {m.done && <CheckCircle className="w-6 h-6 text-green-500" />}
                  </div>
                  <div className="text-sm text-gray-600 mb-3"><Clock className="w-4 h-4 inline mr-1" />{m.time} min</div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1"><span>Progreso</span><span className="font-bold">{m.progress}%</span></div>
                    <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-purple-500 h-2 rounded-full" style={{width: `${m.progress}%`}}></div></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-orange-500 font-bold"><Bitcoin className="w-4 h-4 inline mr-1" />{m.reward} sats</span>
                    <button className="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">{m.done ? 'Revisar' : m.progress > 0 ? 'Continuar' : 'Comenzar'}</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {page === 'marketplace' && (
          <>
            <h2 className="text-3xl font-bold mb-2">Micro-Oportunidades</h2>
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">Trabajos remotos pagados en satoshis</p>
              <button
                onClick={() => setAiPanelOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all font-semibold text-sm"
              >
                <Brain className="w-4 h-4" />
                ¿Cuál trabajo me conviene más?
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {title: 'Corregir bugs en Python', sats: 2500, time: 30},
                {title: 'Analizar dataset', sats: 5000, time: 60},
                {title: 'Crear visualización', sats: 7500, time: 90},
                {title: 'Documentar API', sats: 3000, time: 45}
              ].map((o, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="font-bold mb-2">{o.title}</h3>
                  <div className="text-sm text-gray-600 mb-4">
                    <Clock className="w-4 h-4 inline mr-1" />{o.time} min
                    <span className="ml-3 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Remoto</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-orange-500 text-lg font-bold"><Bitcoin className="w-5 h-5 inline mr-1" />{o.sats.toLocaleString()} sats</span>
                    <div className="flex gap-2">
                      <button className="bg-gray-200 px-3 py-2 rounded-lg text-sm"><Brain className="w-4 h-4 inline" /> IA</button>
                      <button className="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">Aplicar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {page === 'wallet' && (
          <>
            <h2 className="text-3xl font-bold mb-6">Lightning Wallet</h2>
            <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-xl p-6 shadow-xl mb-6">
              <div className="flex justify-between items-center mb-6">
                <Bitcoin className="w-14 h-14" />
                <div className="text-right">
                  <div className="text-3xl font-bold">{data.sats.toLocaleString()} sats</div>
                  <div className="text-sm opacity-75">{data.btc} BTC</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-white bg-opacity-20 py-3 rounded-lg font-semibold">Recibir</button>
                <button className="bg-white bg-opacity-20 py-3 rounded-lg font-semibold">Enviar</button>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold mb-4">Historial</h3>
              {[
                {desc: 'Módulo completado', amount: 500, time: '2h'},
                {desc: 'Micro-tarea: Debug', amount: 1000, time: '5h'},
                {desc: 'Lección Bitcoin', amount: 250, time: '1d'}
              ].map((tx, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full"><TrendingUp className="w-5 h-5 text-green-600" /></div>
                    <div>
                      <div className="font-semibold text-sm">{tx.desc}</div>
                      <div className="text-xs text-gray-500">{tx.time} ago</div>
                    </div>
                  </div>
                  <div className="text-green-600 font-bold">+{tx.amount} sats</div>
                </div>
              ))}
            </div>
          </>
        )}

        {page === 'profile' && (
          <>
            <h2 className="text-3xl font-bold mb-6">Perfil Proof-of-Skill</h2>
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">ND</div>
                <div>
                  <h3 className="text-xl font-bold">Usuario Neurodivergente</h3>
                  <div className="text-sm text-gray-600"><CheckCircle className="w-4 h-4 inline text-green-500 mr-1" />{data.tasks} tareas · {data.sats.toLocaleString()} sats ganados</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-purple-50 p-4 rounded-xl text-center"><Award className="w-8 h-8 mx-auto mb-2 text-purple-500" /><div className="text-xl font-bold">4</div><div className="text-xs text-gray-600">Habilidades</div></div>
                <div className="bg-blue-50 p-4 rounded-xl text-center"><TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-500" /><div className="text-xl font-bold">72%</div><div className="text-xs text-gray-600">Crecimiento</div></div>
                <div className="bg-green-50 p-4 rounded-xl text-center"><Briefcase className="w-8 h-8 mx-auto mb-2 text-green-500" /><div className="text-xl font-bold">8</div><div className="text-xs text-gray-600">Completadas</div></div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold mb-4">Habilidades Verificadas</h3>
              {data.skills.map((s, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between mb-1"><span className="text-sm">{s.name}</span><span className="text-sm font-bold">{s.level}%</span></div>
                  <div className="w-full bg-gray-200 rounded-full h-2"><div className={`${s.verified ? 'bg-green-500' : 'bg-blue-500'} h-2 rounded-full`} style={{width: `${s.level}%`}}></div></div>
                </div>
              ))}
            </div>
          </>
        )}

        {page === 'settings' && (
          <>
            <h2 className="text-3xl font-bold mb-6">Personalización ND</h2>
            <div className="bg-white rounded-xl p-6 shadow-lg space-y-6">
              <div>
                <label className="block font-semibold mb-3 text-lg">Tamaño de Texto</label>
                <div className="flex gap-3">
                  <button className="px-6 py-3 rounded-lg bg-gray-200 hover:bg-purple-500 hover:text-white">Pequeño</button>
                  <button className="px-6 py-3 rounded-lg bg-purple-500 text-white">Medio</button>
                  <button className="px-6 py-3 rounded-lg bg-gray-200 hover:bg-purple-500 hover:text-white">Grande</button>
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-3 text-lg">Contraste</label>
                <div className="flex gap-3">
                  <button className="px-6 py-3 rounded-lg bg-purple-500 text-white">Normal</button>
                  <button className="px-6 py-3 rounded-lg bg-gray-200 hover:bg-purple-500 hover:text-white">Alto</button>
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-3 text-lg">Espaciado</label>
                <div className="flex gap-3">
                  <button className="px-6 py-3 rounded-lg bg-gray-200 hover:bg-purple-500 hover:text-white">Compacto</button>
                  <button className="px-6 py-3 rounded-lg bg-purple-500 text-white">Normal</button>
                  <button className="px-6 py-3 rounded-lg bg-gray-200 hover:bg-purple-500 hover:text-white">Relajado</button>
                </div>
              </div>
              <div>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="font-semibold">Modo Sensorial Reducido</span>
                </label>
                <p className="text-sm text-gray-600 mt-2">Reduce animaciones y efectos visuales</p>
              </div>
            </div>
          </>
        )}
      </main>

      {/* IA Flotante Omnipresente */}
      <button
        onClick={() => setAiPanelOpen(!aiPanelOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-all duration-300 z-50 animate-pulse"
      >
        <Brain className="w-8 h-8" />
      </button>

      {/* Panel de IA Contextual */}
      {aiPanelOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border-2 border-purple-200">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              <span className="font-bold">Asistente Cognitivo</span>
            </div>
            <button onClick={() => setAiPanelOpen(false)} className="hover:bg-white hover:bg-opacity-20 p-1 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 bg-purple-50 border-b">
            <p className="text-sm text-gray-700 font-semibold mb-3">
              {page === 'dashboard' && '📊 Estás en tu Panel. ¿En qué puedo ayudarte?'}
              {page === 'learning' && '📚 Estás aprendiendo. ¿Necesitas ayuda?'}
              {page === 'marketplace' && '💼 Buscando oportunidades. Te ayudo a elegir.'}
              {page === 'profile' && '🚀 Tu perfil profesional. ¿Listo para ser independiente?'}
              {page === 'wallet' && '⚡ Tu wallet Lightning. ¿Dudas sobre Bitcoin?'}
              {page === 'mentor' && '🤖 Ya estoy aquí para ayudarte.'}
              {page === 'settings' && '⚙️ Configurando tu experiencia.'}
            </p>

            <div className="space-y-2">
              {getAIContextualHelp().map((help, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setChat([...chat, 
                      { type: 'user', text: help.text },
                      { type: 'ai', text: `Entiendo que quieres ${help.action}. Déjame ayudarte con eso...` }
                    ]);
                    setPage('mentor');
                    setAiPanelOpen(false);
                  }}
                  className="w-full flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-purple-100 transition-all text-left border border-gray-200"
                >
                  <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                    {React.cloneElement(help.icon, { size: 18 })}
                  </div>
                  <span className="text-sm font-medium text-gray-800">{help.text}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4">
            <button
              onClick={() => {
                setPage('mentor');
                setAiPanelOpen(false);
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Abrir Chat Completo →
            </button>
          </div>
        </div>
      )}

      {/* Onboarding Modal */}
      {showOnboarding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
              <div className="flex items-center gap-3 mb-2">
                <Brain className="w-8 h-8" />
                <h3 className="text-2xl font-bold">Tu Asistente IA</h3>
              </div>
              <p className="text-sm opacity-90">Paso {onboardingStep + 1} de {onboardingSteps.length}</p>
            </div>

            <div className="p-6">
              <h4 className="text-xl font-bold text-gray-800 mb-3">
                {onboardingSteps[onboardingStep].title}
              </h4>
              <p className="text-gray-600 mb-6">
                {onboardingSteps[onboardingStep].description}
              </p>

              <div className="flex gap-3">
                {onboardingStep > 0 && (
                  <button
                    onClick={() => setOnboardingStep(onboardingStep - 1)}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
                  >
                    Anterior
                  </button>
                )}
                
                {onboardingStep < onboardingSteps.length - 1 ? (
                  <button
                    onClick={() => setOnboardingStep(onboardingStep + 1)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg"
                  >
                    Siguiente
                  </button>
                ) : (
                  <button
                    onClick={() => setShowOnboarding(false)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg"
                  >
                    ¡Comenzar! 🚀
                  </button>
                )}
              </div>

              <button
                onClick={() => setShowOnboarding(false)}
                className="w-full mt-3 text-gray-500 text-sm hover:text-gray-700"
              >
                Saltar tutorial
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}