import React from 'react';
import { CheckCircle, Clock, ArrowRight } from 'lucide-react';

interface TaskCardProps {
  tasks: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ tasks }) => {
  const pendingTasks = [
    { id: 1, title: 'Completar módulo Python', time: '15 min', reward: 500 },
    { id: 2, title: 'Debug API Lightning', time: '30 min', reward: 750 },
    { id: 3, title: 'Revisar documento técnico', time: '45 min', reward: 300 },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Tareas Pendientes</h3>
          <div className="text-2xl font-bold text-purple-600 mt-1">{tasks}</div>
        </div>
        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
          <CheckCircle className="w-6 h-6" />
        </div>
      </div>

      <div className="space-y-3 mb-5">
        {pendingTasks.map((task) => (
          <div 
            key={task.id} 
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="bg-green-100 p-1.5 rounded-full">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="min-w-0">
                <div className="font-medium text-sm text-gray-800 truncate">{task.title}</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{task.time}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-orange-600 font-medium">
                    <span>+{task.reward} sats</span>
                  </div>
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </div>
        ))}
      </div>

      <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
        <span>Ver todas las tareas</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default TaskCard;