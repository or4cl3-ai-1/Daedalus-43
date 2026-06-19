export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export interface Artifact {
  id: string;
  type: 'code' | 'diagram' | 'doc';
  title: string;
  content: string;
  updatedAt: Date;
  rating?: 'up' | 'down' | null;
  feedbackComment?: string;
  architectureDetails?: {
    pattern: string; // "Microservices" | "Event-driven" | "Monolith" etc.
    complexity: string; // "High" | "Medium" | "Low"
    scalingTarget: string;
  };
  performanceStats?: {
    cpuCost: string;
    memoryFootprint: string;
    efficiencyGains: string;
  };
}

export interface UserFeedbackItem {
  id: string;
  targetId: string; // reference to message or artifact
  targetTitle: string;
  type: 'code' | 'architecture' | 'performance_analysis';
  rating: 'up' | 'down';
  category: string;
  comment: string;
  timestamp: Date;
  processed: boolean;
  adaptedParameters: {
    temperatureAdjustment: number;
    structuralHeuristic: string;
    optimizationsInjected: string[];
  };
}

export interface AppState {
  messages: Message[];
  artifacts: Artifact[];
  activeArtifactId: string | null;
  feedbackList: UserFeedbackItem[];
  modelLearningRate: number;
  temperature: number;
  biasConfidenceScore: number;
}

export interface Collaborator {
  id: string;
  name: string;
  color: string;
  cursor?: { x: number; y: number };
  activeArtifactId?: string | null;
  isSimulated?: boolean;
}

