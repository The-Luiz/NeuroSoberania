export interface Skill {
  name: string;
  level: number;
  verified: boolean;
  projects: number;
  earnings: number;
}

export interface PortfolioItem {
  title: string;
  client: string;
  sats: number;
  rating: number;
  tags: string[];
}

export interface Badge {
  icon: string;
  title: string;
  desc: string;
}

export interface UserData {
  sats: number;
  btc: number;
  progress: number;
  tasks: number;
  skills: Skill[];
  portfolio: PortfolioItem[];
  badges: Badge[];
}

export interface Message {
  type: 'user' | 'ai';
  text: string;
}

export interface AIHelpOption {
  icon: React.ElementType;
  text: string;
  action: string;
}

export interface OnboardingStep {
  title: string;
  description: string;
  highlight?: string;
  action?: string;
}

export interface Transaction {
  id: string;
  desc: string;
  amount: number;
  time: string;
  type: 'income' | 'expense';
}
export interface Job {
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
// src/types/index.ts

export interface Task {
  id: string;
  title: string;
  description: string;
  steps: string[];
  solution: string;
  errorExamples: Record<string, string>;
}

export interface Module {
  title: string;
  progress: number;
  reward: number;
  time: number;
  done: boolean;
  task?: Task; // La tarea es opcional
}

// Puedes mover aquí también UserData, Message, etc. si quieres limpiar AppContext