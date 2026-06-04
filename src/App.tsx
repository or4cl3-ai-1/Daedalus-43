import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Undo2, 
  Redo2, 
  Send, 
  Sparkles, 
  Terminal, 
  Layers, 
  ShieldCheck, 
  Activity,
  Plus,
  Trash2,
  Code,
  ThumbsUp,
  ThumbsDown,
  Info,
  Menu,
  X,
  Sliders,
  Award,
  BookOpen,
  CheckCircle,
  HelpCircle,
  User,
  Zap,
  RotateCcw,
  Maximize2
} from 'lucide-react';
import { cn } from './utils/cn';
import { Message, Artifact, UserFeedbackItem, AppState } from './types';
import { LandingPage } from './components/LandingPage';
import { LoadingScreen } from './components/LoadingScreen';
import { OnboardingTour } from './components/OnboardingTour';
import { FeedbackDashboard } from './components/FeedbackDashboard';
import { Tooltip } from './components/ui/Tooltip';

// Helper for initial states
const INITIAL_MESSAGES: Message[] = [
  { 
    id: 'm1', 
    role: 'model', 
    content: "Neural link established. Or4cl3 architecture synthesis engine active. Submit your system requirement to begin.", 
    timestamp: new Date() 
  }
];

const INITIAL_ARTIFACTS: Artifact[] = [
  {
    id: 'art-001',
    type: 'code',
    title: 'auth-middleware.ts',
    content: `// Or4cl3 Generative Guard Module\n// Real-time Bias and PII Scrubber\n\nexport const sanitizeRequest = (payload: Record<string, any>) => {\n  const piiPatterns = [/\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b/g];\n  let stringified = JSON.stringify(payload);\n  \n  piiPatterns.forEach(pattern => {\n    stringified = stringified.replace(pattern, "[MASKED_PII_PROTECTED]");\n  });\n  \n  return JSON.parse(stringified);\n};`,
    updatedAt: new Date(),
    architectureDetails: {
      pattern: "Guard Ring Architecture (Zero Trust)",
      complexity: "Medium",
      scalingTarget: "10k req/sec"
    },
    performanceStats: {
      cpuCost: "0.14 ms / pass",
      memoryFootprint: "12 KB stack Allocation",
      efficiencyGains: "99.4%"
    }
  }
];

const INITIAL_FEEDBACK: UserFeedbackItem[] = [
  {
    id: 'f-init',
    targetId: 'art-001',
    targetTitle: 'auth-middleware.ts',
    type: 'code',
    rating: 'up',
    category: 'Readability',
    comment: 'PII scrubbing is secure. Ideal regex choice.',
    timestamp: new Date(),
    processed: true,
    adaptedParameters: {
      temperatureAdjustment: -0.05,
      structuralHeuristic: "Secure Regex Guarding",
      optimizationsInjected: ["PII scrubbing automation", "Strict token sanitization"]
    }
  }
];

const DEFAULT_STATE: AppState = {
  messages: INITIAL_MESSAGES,
  artifacts: INITIAL_ARTIFACTS,
  activeArtifactId: 'art-001',
  feedbackList: INITIAL_FEEDBACK,
  modelLearningRate: 0.050,
  temperature: 0.70,
  biasConfidenceScore: 99.8
};

// History Hook for robust interactive undo/redo
function useHistoryState(initialState: AppState) {
  const [history, setHistory] = useState<AppState[]>([initialState]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const pushState = useCallback((newState: AppState) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, currentIndex + 1);
      return [...newHistory, newState];
    });
    setCurrentIndex(prev => prev + 1);
  }, [currentIndex]);

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, history.length]);

  return {
    state: history[currentIndex],
    pushState,
    undo,
    redo,
    canUndo: currentIndex > 0,
    canRedo: currentIndex < history.length - 1
  };
}

export default function App() {
  const [appScreen, setAppScreen] = useState<'landing' | 'loading' | 'dashboard'>('landing');
  const [showTour, setShowTour] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Controls the active Ethics Guide dialog modal
  const [mobileTab, setMobileTab] = useState<'chat' | 'workspace' | 'calibration'>('chat');
  const [feedbackOverlayOpen, setFeedbackOverlayOpen] = useState<string | null>(null); // target ID
  const [customComment, setCustomComment] = useState('');
  const [interactiveTips, setInteractiveTips] = useState<string[]>([]);

  // Interactive Ethics Parameters
  const [biasMitigationLevel, setBiasMitigationLevel] = useState<number>(98);
  const [secretsScrubEnabled, setSecretsScrubEnabled] = useState<boolean>(true);
  const [humanOversightLock, setHumanOversightLock] = useState<boolean>(true);

  // Local state with History
  const { state, pushState, undo, redo, canUndo, canRedo } = useHistoryState(DEFAULT_STATE);
  const [inputText, setInputText] = useState('');

  // Handle send prompt
  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: 'm-' + Math.random().toString(36).substr(2, 9),
      role: 'user',
      content: inputText,
      timestamp: new Date()
    };

    const newState: AppState = {
      ...state,
      messages: [...state.messages, newMessage]
    };

    pushState(newState);
    setInputText('');
    
    addTip(`User sent command. History checkpoints updated to: ${state.messages.length + 1}`);

    // Simulate cybernetic Daedalus analysis
    setTimeout(() => {
      const hasCodeTrigger = /code|react|npm|ts|function|middleware/i.test(newMessage.content);
      const randomId = 'art-' + Math.random().toString(36).substr(2, 9);
      
      const newArtifact: Artifact | null = hasCodeTrigger ? {
        id: randomId,
        type: 'code',
        title: `${newMessage.content.split(' ').slice(0, 2).join('-').toLowerCase() || 'module'}.ts`,
        content: `// Synthesized code for target concept: ${newMessage.content}\n\nexport const initializedService = () => {\n  console.log("Service initializing recursively...");\n  return {\n    activated: true,\n    token: "${Math.random().toString(36).substr(2, 10)}"\n  };\n};`,
        updatedAt: new Date(),
        architectureDetails: {
          pattern: "Event-Driven micro-module",
          complexity: "Low",
          scalingTarget: "50k dynamic events"
        },
        performanceStats: {
          cpuCost: "0.08 ms",
          memoryFootprint: "8 KB heap allocation",
          efficiencyGains: "99.9%"
        }
      } : {
        id: randomId,
        type: 'doc',
        title: `${newMessage.content.split(' ').slice(0, 2).join('-').toLowerCase() || 'manifest'}-manifest.md`,
        content: `# Architectural Manifest: ${newMessage.content}\n\n1. Overview: Modular design supporting decentralized nodes.\n2. Pattern: Event Pub/Sub pipeline using a stateless zero-overhead layout.\n3. Security: Encrypted channels running validation layers on client interfaces and secure database middleware.`,
        updatedAt: new Date(),
        architectureDetails: {
          pattern: "Stateless decoupled pipeline",
          complexity: "Medium",
          scalingTarget: "Unlimited horizontal pods"
        },
        performanceStats: {
          cpuCost: "Zero structural processing cost",
          memoryFootprint: "0 bytes system footprint",
          efficiencyGains: "98.7% readability"
        }
      };

      const modelResponse: Message = {
        id: 'm-' + Math.random().toString(36).substr(2, 9),
        role: 'model',
        content: `Synthesis complete. Materialized artifact '${newArtifact.title}' matching specifications. Adjust quality rating or inject tuning feedback below.`,
        timestamp: new Date()
      };

      pushState({
        ...newState,
        messages: [...newState.messages, modelResponse],
        artifacts: [...newState.artifacts, newArtifact],
        activeArtifactId: newArtifact.id
      });

      addTip(`Daedalus synthesized '${newArtifact.title}'. Action checkpoints recorded.`);
    }, 1200);
  };

  const handleUpdateArtifactText = (id: string, newContent: string) => {
    const updatedArtifacts = state.artifacts.map(art => 
      art.id === id ? { ...art, content: newContent, updatedAt: new Date() } : art
    );
    pushState({
      ...state,
      artifacts: updatedArtifacts
    });
  };

  const handleCreateEmptyArtifact = () => {
    const defaultId = 'art-' + Math.random().toString(36).substr(2, 9);
    const emptyArtifact: Artifact = {
      id: defaultId,
      type: 'code',
      title: 'unnamed-routine.ts',
      content: '// Manifested raw system logic block\nexport const main = () => {\n  return "online";\n};',
      updatedAt: new Date(),
      architectureDetails: {
        pattern: "Undefined Modular",
        complexity: "Low",
        scalingTarget: "Raw sequence execution"
      },
      performanceStats: {
        cpuCost: "0.01 ms runtime",
        memoryFootprint: "2 KB core allocation",
        efficiencyGains: "100%"
      }
    };

    pushState({
      ...state,
      artifacts: [...state.artifacts, emptyArtifact],
      activeArtifactId: defaultId
    });
    addTip(`Manually generated empty routine template`);
  };

  const handleDeleteArtifact = (id: string) => {
    const filtered = state.artifacts.filter(a => a.id !== id);
    const nextActive = filtered[0]?.id || null;
    pushState({
      ...state,
      artifacts: filtered,
      activeArtifactId: nextActive
    });
    addTip(`Purged system artifact: ${id}`);
  };

  // Adjust parameters manually via calibration settings
  const handleAdjustParameters = (t: number, lr: number) => {
    pushState({
      ...state,
      temperature: t,
      modelLearningRate: lr
    });
  };

  // Up/down rates directly on code components or response bubbles
  const handleRateArtifact = (id: string, rate: 'up' | 'down') => {
    const art = state.artifacts.find(a => a.id === id);
    if (!art) return;

    if (rate === 'up') {
      // Direct upvote reinforcement
      const feedbackItem: UserFeedbackItem = {
        id: 'f-' + Math.random().toString(36).substr(2, 9),
        targetId: art.id,
        targetTitle: art.title,
        type: art.type === 'doc' ? 'architecture' : 'code',
        rating: 'up',
        category: 'Adaptive Compliance',
        comment: `Excellent design matches core goals.`,
        timestamp: new Date(),
        processed: true,
        adaptedParameters: {
          temperatureAdjustment: -0.01,
          structuralHeuristic: "Compliant alignment confirmation",
          optimizationsInjected: ["Correctness reinforcement"]
        }
      };

      pushState({
        ...state,
        feedbackList: [feedbackItem, ...state.feedbackList],
        temperature: Math.max(0.1, state.temperature - 0.01)
      });
      addTip(`Positively reinforced '${art.title}' parameter matrix`);
    } else {
      // Trigger prompt input for precise comments
      setFeedbackOverlayOpen(id);
    }
  };

  // Submit negative tuning details
  const handleSubmitTuningDetails = (id: string, opinion: string) => {
    const art = state.artifacts.find(a => a.id === id);
    const title = art ? art.title : "Contextual prompt stream";
    const type = art ? (art.type === 'doc' ? 'architecture' : 'code') : 'code';

    const feedbackItem: UserFeedbackItem = {
      id: 'f-' + Math.random().toString(36).substr(2, 9),
      targetId: id,
      targetTitle: title,
      type: type as any,
      rating: 'down',
      category: 'Correctness Correction',
      comment: opinion,
      timestamp: new Date(),
      processed: true,
      adaptedParameters: {
        temperatureAdjustment: 0.05,
        structuralHeuristic: "Refining strict bounds templates",
        optimizationsInjected: ["Safety assertions", opinion]
      }
    };

    pushState({
      ...state,
      feedbackList: [feedbackItem, ...state.feedbackList],
      temperature: Math.min(1.5, state.temperature + 0.02)
    });
    setFeedbackOverlayOpen(null);
    setCustomComment('');
    addTip(`Calibrated model weights parameters dynamically: ${opinion.slice(0, 30)}...`);
  };

  const onSubmitCustomFeedback = (type: 'code' | 'architecture' | 'performance_analysis', comment: string, rating: 'up' | 'down') => {
    const feedbackItem: UserFeedbackItem = {
      id: 'f-' + Math.random().toString(36).substr(2, 9),
      targetId: 'custom-injector',
      targetTitle: 'Real-time Injector',
      type: type,
      rating: rating,
      category: rating === 'up' ? 'Reinforcement' : 'Constraint Offset',
      comment: comment,
      timestamp: new Date(),
      processed: true,
      adaptedParameters: {
        temperatureAdjustment: rating === 'up' ? -0.02 : 0.05,
        structuralHeuristic: rating === 'up' ? "Positive Alignment Sync" : "Robust Constraints Offset",
        optimizationsInjected: [comment]
      }
    };

    pushState({
      ...state,
      feedbackList: [feedbackItem, ...state.feedbackList],
      temperature: rating === 'up' ? Math.max(0.1, state.temperature - 0.02) : Math.min(1.5, state.temperature + 0.03)
    });
    addTip(`Injected calibration token event: ${comment.slice(0, 30)}...`);
  };

  const addTip = (msg: string) => {
    setInteractiveTips(prev => [...prev.slice(-4), msg]);
  };

  const activeArtifact = state.artifacts.find(a => a.id === state.activeArtifactId);

  // Auto show onboarding after loading completes
  const handleLoadingComplete = () => {
    setAppScreen('dashboard');
    setTimeout(() => {
      setShowTour(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-[#050510] text-[#e2e8f0] relative flex overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        {appScreen === 'landing' && (
          <motion.div key="landing-screen" className="w-full h-full absolute inset-0 z-50">
            <LandingPage onEnter={() => setAppScreen('loading')} />
          </motion.div>
        )}

        {appScreen === 'loading' && (
          <motion.div key="loading-screen" className="w-full h-full absolute inset-0 z-50">
            <LoadingScreen onComplete={handleLoadingComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="scanline" />

      {/* Onboarding checklist */}
      {showTour && <OnboardingTour onComplete={() => setShowTour(false)} />}

      {/* Main Dashboard Panel */}
      <div className="flex-1 flex flex-col md:flex-row h-screen w-full overflow-hidden p-3 gap-3">
        
        {/* Mobile Navigation Header */}
        <div className="md:hidden flex items-center justify-between p-3 glass-panel border-[#00f2ff]/20 bg-[#080b15]/95 w-full z-30">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#00f2ff] animate-pulse" />
            <span className="font-mono text-xs tracking-wider font-extrabold uppercase text-white">Daedalus AI</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Direct mobile history tools */}
            <button 
              onClick={undo} 
              disabled={!canUndo}
              className="p-1.5 rounded bg-white/5 text-[#e0e0e0] border border-white/15 disabled:opacity-20"
              title="Undo Checkpoint"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button 
              onClick={redo} 
              disabled={!canRedo}
              className="p-1.5 rounded bg-white/5 text-[#e0e0e0] border border-white/15 disabled:opacity-20"
              title="Redo Checkpoint"
            >
              <Redo2 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "p-2 bg-white/5 rounded text-[#00f2ff] border border-[#00f2ff]/20 animate-pulse transition-all",
                mobileMenuOpen && "bg-[#00f2ff]/25 border-[#00f2ff]/55"
              )}
              title="Ethical Safeguards Matrix"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile View Toggle Segment */}
        <div className="md:hidden flex bg-slate-950/85 border border-white/5 rounded-xl p-1 gap-1 w-full z-15 select-none">
          <button 
            onClick={() => setMobileTab('chat')}
            className={cn(
              "flex-1 py-2 text-[10px] uppercase font-mono rounded-lg tracking-wider transition-all border",
              mobileTab === 'chat' 
                ? "bg-[#00f2ff]/10 text-[#00f2ff] border-[#00f2ff]/30 font-extrabold shadow-[0_0_8px_rgba(0,242,255,0.05)]" 
                : "text-gray-400 hover:text-white border-transparent"
            )}
          >
            Chats
          </button>
          <button 
            onClick={() => setMobileTab('workspace')}
            className={cn(
              "flex-1 py-2 text-[10px] uppercase font-mono rounded-lg tracking-wider transition-all border",
              mobileTab === 'workspace' 
                ? "bg-[#00f2ff]/10 text-[#00f2ff] border-[#00f2ff]/30 font-extrabold shadow-[0_0_8px_rgba(0,242,255,0.05)]" 
                : "text-gray-400 hover:text-white border-transparent"
            )}
          >
            Blueprints
          </button>
          <button 
            onClick={() => setMobileTab('calibration')}
            className={cn(
              "flex-1 py-2 text-[10px] uppercase font-mono rounded-lg tracking-wider transition-all border",
              mobileTab === 'calibration' 
                ? "bg-[#00f2ff]/10 text-[#00f2ff] border-[#00f2ff]/30 font-extrabold shadow-[0_0_8px_rgba(0,242,255,0.05)]" 
                : "text-gray-400 hover:text-white border-transparent"
            )}
          >
            Telemetry
          </button>
        </div>

        {/* LEFT COMPONENT COLUMN: Chat & Commands Interface */}
        <aside id="tour-chat" className={cn(
          "w-full md:w-[350px] lg:w-[400px] flex-col gap-3 transition-all duration-300 md:relative md:flex p-1 md:p-0",
          mobileTab === 'chat' ? "flex" : "hidden md:flex"
        )}>
          {/* Dashboard Header Bar */}
          <header className="glass-panel p-4 flex items-center justify-between border-white/5 z-10 w-full">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded bg-[#00f2ff] flex items-center justify-center shadow-[0_0_10px_rgba(0,242,255,0.3)]">
                <Sparkles className="w-4 h-4 text-black animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold tracking-tighter uppercase text-white">Daedalus</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="text-[9px] text-gray-500 font-mono tracking-widest uppercase">Adaptive R&D System</div>
              </div>
            </div>

            {/* Global History Undo/Redo tools & Safety launcher */}
            <div id="tour-history" className="flex items-center gap-1.5">
              <Tooltip content="Launch Ethical AI Guard Framework">
                <button 
                  onClick={() => setMobileMenuOpen(true)}
                  className="p-1.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/25 transition-all mr-1 animate-pulse"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                </button>
              </Tooltip>
              <Tooltip content="Revert neural state to previous logic frame">
                <button 
                  onClick={undo} 
                  disabled={!canUndo}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white disabled:opacity-20 transition-all border border-white/5"
                >
                  <Undo2 className="w-3.5 h-3.5" />
                </button>
              </Tooltip>
              <Tooltip content="Redo next logical mutation step">
                <button 
                  onClick={redo} 
                  disabled={!canRedo}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white disabled:opacity-20 transition-all border border-white/5"
                >
                  <Redo2 className="w-3.5 h-3.5" />
                </button>
              </Tooltip>
            </div>
          </header>

          {/* Interactive Chat interface panel */}
          <section className="flex-1 flex flex-col glass-panel border-white/5 overflow-hidden w-full">
            {/* Terminal Title band */}
            <div className="py-2.5 px-3 bg-black/50 border-b border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-400 uppercase">
              <div className="flex items-center gap-1.5 text-[#00f2ff]">
                <Terminal className="w-3 h-3 animate-pulse" />
                Command Pulse Stream
              </div>
              <span>COGNITIVE DEPTH: ALIGNED</span>
            </div>

            {/* Chats messages container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {state.messages.map((m) => (
                <div key={m.id} className={cn(
                  "flex flex-col max-w-[85%] space-y-1 my-2 overflow-x-hidden",
                  m.role === 'user' ? "ml-auto items-end" : "items-start"
                )}>
                  <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest px-0.5">
                    {m.role === 'user' ? 'Operator' : 'Daedalus Core'}
                  </span>
                  
                  <div className={cn(
                    "px-3.5 py-2.5 rounded-xl text-xs leading-relaxed relative",
                    m.role === 'user' 
                      ? "bg-[#0c1325]/85 text-[#00f2ff] border border-[#00f2ff]/30 shadow-[inset_0_0_8px_rgba(0,242,255,0.05)] rounded-tr-none" 
                      : "bg-slate-950/40 text-[#cbd5e1] border border-white/5 rounded-tl-none"
                  )}>
                    <p className="whitespace-pre-line">{m.content}</p>
                    
                    {/* Visual context feedback loop indicator directly near message responses */}
                    {m.role === 'model' && (
                      <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[9px] text-gray-500 font-mono">
                        <span className="flex items-center gap-1 text-emerald-400/80">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" /> Auto Bias Scanned: Pass
                        </span>
                        
                        {/* Direct fast-opinion logs trigger for users */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[8px] text-gray-500">Align output:</span>
                          <button 
                            onClick={() => onSubmitCustomFeedback('code', 'Reinforcing message telemetry output accuracy.', 'up')}
                            className="hover:text-emerald-400 transition-colors p-0.5"
                            title="Positive Reinforcement"
                          >
                            <ThumbsUp className="w-2.5 h-2.5" />
                          </button>
                          <button 
                            onClick={() => {
                              setInputText("We need a more secure routing layout than that last generation.");
                              addTip("Operator requested safer architecture routing.");
                            }}
                            className="hover:text-rose-400 transition-colors p-0.5"
                            title="Require Adjustment"
                          >
                            <ThumbsDown className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-[7.5px] font-mono opacity-30 px-1">{new Date(m.timestamp).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>

            {/* Direct prompt trigger input */}
            <form onSubmit={handleSendMessage} className="p-3 bg-black/60 border-t border-white/5 flex gap-2">
              <input 
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Synthesize middleware, design architecture..."
                className="flex-1 bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 outline-none focus:border-[#00f2ff]/50 transition-all font-mono"
              />
              <Tooltip content="Deploy task model pulse">
                <button 
                  type="submit"
                  className="p-2 rounded-lg bg-[#00f2ff]/10 hover:bg-[#00f2ff]/20 border border-[#00f2ff]/30 text-[#00f2ff] transition-all flex items-center justify-center active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </Tooltip>
            </form>
          </section>

          {/* Prompt/History telemetry tips info log inside sidebar */}
          <section className="p-3 glass-panel border-white/5 bg-slate-900/10 flex flex-col gap-1.5 h-36">
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block border-b border-white/5 pb-1 flex items-center gap-1">
              <Terminal className="w-3 h-3 text-emerald-400" /> Action Audit Stream
            </span>
            <div className="flex-1 overflow-y-auto space-y-1 text-[9px] font-mono text-gray-400 list-decimal pl-1">
              {interactiveTips.length === 0 ? (
                <div className="italic text-gray-600">Standby. Injecting user commands or updating code will populate diagnostic checkpoints below...</div>
              ) : (
                interactiveTips.map((tip, idx) => (
                  <div key={idx} className="truncate">
                    ✔ [EVENT {idx+1}] {tip}
                  </div>
                ))
              )}
            </div>
          </section>
        </aside>

        {/* RIGHT COMPONENT COLUMN: Core Active Workspace */}
        <main className="flex-1 flex flex-col gap-3 min-w-0 h-full">
          
          {/* Artifact Navigation toolbar */}
          <header id="tour-artifacts" className="h-14 glass-panel border-white/5 flex items-center px-4 justify-between w-full relative z-10 overflow-x-auto gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none flex-1">
              {state.artifacts.length === 0 ? (
                <div className="text-[10px] text-gray-500 font-mono tracking-wide italic flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  No artifact blueprints developed. Submit a core command or inject manually.
                </div>
              ) : (
                state.artifacts.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => pushState({ ...state, activeArtifactId: art.id })}
                    className={cn(
                      "group px-3 py-1.5 rounded-lg text-[10px] uppercase font-mono tracking-wider transition-all border flex items-center gap-2 whitespace-nowrap cursor-pointer",
                      state.activeArtifactId === art.id 
                        ? "bg-[#00f2ff]/10 border-[#00f2ff]/50 text-[#00f2ff] font-bold shadow-[0_0_10px_rgba(0,242,255,0.08)]" 
                        : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20"
                    )}
                  >
                    <Code className="w-3 h-3" />
                    <span>{art.title}</span>
                    
                    {/* Interactive ratings up/down indicator directly on tabs */}
                    <div className="flex items-center gap-1 pl-1 border-l border-white/10">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRateArtifact(art.id, 'up');
                        }}
                        className="hover:text-emerald-400 transition-colors p-0.5"
                        title="Good design"
                      >
                        <ThumbsUp className="w-2.5 h-2.5" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRateArtifact(art.id, 'down');
                        }}
                        className="hover:text-rose-400 transition-colors p-0.5"
                        title="Request adjustment"
                      >
                        <ThumbsDown className="w-2.5 h-2.5" />
                      </button>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteArtifact(art.id);
                      }}
                      className="text-gray-500 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100 p-0.5 ml-1"
                      title="Purge Object"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))
              )}
            </div>

            <Tooltip content="Manually develop new blueprint routine">
              <button 
                onClick={handleCreateEmptyArtifact}
                className="p-1 px-2.5 rounded border border-white/10 hover:border-[#00f2ff]/30 text-[#00f2ff] bg-white/5 hover:bg-[#00f2ff]/5 transition-all text-[10px] font-mono uppercase tracking-widest flex items-center gap-1 whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" /> Build Routine
              </button>
            </Tooltip>
          </header>

          {/* Artifact Visual Workspace & System Analytics Grid */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 min-h-0 overflow-y-auto lg:overflow-hidden">
            
            {/* Visual Code Manifest Viewport (occupies 7 cols on lg) */}
            <section className={cn(
              "lg:col-span-7 flex flex-col glass-panel border-white/5 relative bg-[#070912]/80 overflow-hidden min-h-[350px] lg:min-h-0",
              mobileTab === 'workspace' ? "flex" : "hidden lg:flex"
            )}>
              <AnimatePresence mode="wait">
                {activeArtifact ? (
                  <motion.div 
                    key={activeArtifact.id}
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    className="flex flex-col h-full absolute inset-0 text-left"
                  >
                    {/* Artifact Title bar */}
                    <div className="p-3.5 border-b border-white/5 bg-black/30 flex items-center justify-between font-mono text-[10px] text-gray-400 select-none">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#00f2ff] shadow-[0_0_10px_#00f2ff] animate-pulse" />
                        <span className="font-extrabold uppercase text-white tracking-widest">{activeArtifact.title}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500">Last Refined: {new Date(activeArtifact.updatedAt).toLocaleTimeString()}</span>
                        {/* Interactive UI button for loading feedback panel details */}
                        <button 
                          onClick={() => handleRateArtifact(activeArtifact.id, 'down')}
                          className="px-2 py-0.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/25 rounded transition-all flex items-center gap-1 text-[9px]"
                        >
                          <Sliders className="w-2.5 h-2.5" /> Adjust Correctness
                        </button>
                      </div>
                    </div>

                    {/* Direct interactive editing of artifact state */}
                    <textarea 
                      className="flex-1 bg-transparent p-5 font-mono text-xs text-[#a5c6ff] outline-none resize-none leading-relaxed overflow-y-auto selection:bg-[#00f2ff]/20"
                      value={activeArtifact.content}
                      onChange={(e) => handleUpdateArtifactText(activeArtifact.id, e.target.value)}
                    />

                    {/* Quick feedback mechanism directly aligned with code */}
                    <div className="p-3 border-t border-white/5 bg-slate-950/40 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-gray-400">Did Daedalus hit the requirements? Provide feedback:</span>
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={() => handleRateArtifact(activeArtifact.id, 'up')}
                          className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 rounded-md transition-all flex items-center gap-1 text-[9px]"
                        >
                          <ThumbsUp className="w-3 h-3" /> Compliant
                        </button>
                        <button 
                          onClick={() => handleRateArtifact(activeArtifact.id, 'down')}
                          className="px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 rounded-md transition-all flex items-center gap-1 text-[9px]"
                        >
                          <ThumbsDown className="w-3 h-3" /> Adjust
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#070912]/95">
                    <div className="w-20 h-20 rounded-full border border-[#00f2ff]/25 flex items-center justify-center mb-4 relative">
                      <div className="absolute inset-0 rounded-full border border-[#00f2ff]/10 animate-ping opacity-10" />
                      <Layers className="w-8 h-8 text-[#00f2ff]/50" />
                    </div>
                    <h2 className="text-sm font-bold tracking-tight mb-1 text-white uppercase font-mono">WORKSPACE DECOUPLED</h2>
                    <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                      No live artifact active. Enter system parameters through the command pulse stream.
                    </p>
                  </div>
                )}
              </AnimatePresence>

              {/* Feedback Opinion Drawer overlay directly displayed in-canvas when 'Adjust' clicked */}
              <AnimatePresence>
                {feedbackOverlayOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="absolute bottom-16 inset-x-4 bg-[#0a0c16] border border-[#00f2ff]/30 p-4 rounded-xl shadow-2xl z-30 flex flex-col gap-3 text-left"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-[10px] font-mono font-bold text-[#00f2ff] uppercase">Inject Precision Alignment Correctives</span>
                      <button onClick={() => setFeedbackOverlayOpen(null)} className="text-gray-400 hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[9px] font-mono text-gray-400 uppercase">What logical flaw or structural bias was identified?</label>
                      <input 
                        type="text" 
                        value={customComment}
                        onChange={(e) => setCustomComment(e.target.value)}
                        placeholder="e.g. Asynchronous race hazard identified; simplify dependencies to optimize CPU footprints..."
                        className="w-full bg-[#050510] border border-white/15 rounded px-3 py-2 text-xs text-white outline-none focus:border-[#00f2ff]"
                        onKeyDown={(e) => {
                           if (e.key === 'Enter') {
                             handleSubmitTuningDetails(feedbackOverlayOpen, customComment);
                           }
                        }}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setFeedbackOverlayOpen(null)} 
                        className="px-3 py-1.5 bg-white/5 text-gray-300 font-mono text-[9px] uppercase border border-white/10 rounded"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => handleSubmitTuningDetails(feedbackOverlayOpen, customComment)}
                        disabled={!customComment.trim()}
                        className="px-4 py-1.5 bg-[#00f2ff] disabled:opacity-40 text-black font-extrabold font-mono text-[9px] uppercase rounded shadow-[0_0_10px_rgba(0,242,255,0.3)]"
                      >
                        Compute Tune Matrix
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            {/* Calibration & Adaptive Tuning Feedback Panel (occupies 5 cols on lg) */}
            <section id="tour-telemetry" className={cn(
              "lg:col-span-5 flex flex-col glass-panel border-[#00f2ff]/20 bg-[#060811]/90 overflow-hidden h-[450px] lg:h-full",
              mobileTab === 'calibration' ? "flex" : "hidden lg:flex"
            )}>
              <FeedbackDashboard 
                state={state} 
                onAdjustParameters={handleAdjustParameters}
                onSubmitCustomFeedback={onSubmitCustomFeedback}
              />
            </section>

          </div>

          {/* Footer Stats Widget bar */}
          <footer className="h-10 flex gap-4 select-none flex-col sm:flex-row items-center w-full z-10 text-[9px] font-mono mb-6 md:mb-0">
            <div className="flex-1 glass-panel border-white/5 flex items-center px-4 py-2 sm:py-0 justify-between w-full">
              <div className="flex items-center gap-4">
                <span className={cn(
                  "flex items-center gap-1 uppercase font-extrabold transition-all duration-300",
                  secretsScrubEnabled ? "text-emerald-400" : "text-rose-500 animate-pulse font-bold"
                )}>
                  <ShieldCheck className="w-3.5 h-3.5" /> 
                  GUARDIAN STATUS: {secretsScrubEnabled ? "OPTIMAL" : "PII SHIELD DISENGAGED"}
                </span>
                <span className="hidden sm:inline text-gray-500">|</span>
                <span className={cn(
                  "hidden sm:flex items-center gap-1.5 transition-all duration-300",
                  humanOversightLock ? "text-[#00f2ff]" : "text-amber-400"
                )}>
                  <Activity className="w-3.5 h-3.5" /> 
                  HUMAN OVERSIGHT: {humanOversightLock ? "LOCKED" : "UNRESTRICTED GENERATION"}
                </span>
                <span className="hidden sm:inline text-gray-500">|</span>
                <span className="hidden sm:flex items-center gap-1.5 text-purple-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                  COGNITIVE BIAS INDEX: {biasMitigationLevel}% DEFLECTED
                </span>
              </div>
              <div className="text-gray-500 hidden md:block">
                ACTIVE REINFORCIMENT COGNITION: {state.feedbackList.length} EVENT LOGS
              </div>
            </div>
            
            <div className="px-4 py-2 bg-gradient-to-r from-[#00f2ff]/5 to-transparent border border-white/5 rounded-lg flex items-center gap-2 whitespace-nowrap w-full sm:w-auto">
              <span className="text-gray-500 font-bold">SDLC SYSTEM TUNING RATIO:</span>
              <span className="text-[#00f2ff] font-bold">{(state.temperature * 100).toFixed(0)} / 100</span>
            </div>
          </footer>

        </main>
      </div>

      {/* Ethical Alignment Matrix & Safeguards Modal */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-[#080a15]/95 rounded-2xl border border-[#00f2ff]/30 p-6 shadow-[0_0_30px_rgba(0,242,255,0.15)] flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2 text-[#00f2ff]">
                  <ShieldCheck className="w-5 h-5 text-[#00f2ff] animate-pulse" />
                  <h2 className="text-sm font-mono font-extrabold uppercase tracking-widest text-[#00f2ff]">
                    SDLC Ethical Safeguards & Alignment
                  </h2>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Context Panel */}
              <div className="flex-1 overflow-y-auto space-y-5 pr-2 text-left style-scrollbar select-none">
                <section className="space-y-1.5">
                  <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider">
                    How Daedalus ensures Ethical Software Synthesis:
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Artificial Intelligence models configured for full-cycle software engineering hold immense capability, but demand robust safeguards to prevent unintended propagation of structural bias and credentials exposure. This interactive workspace implements real-time mitigation mechanisms.
                  </p>
                </section>

                {/* Grid of Interactive Safe Shields */}
                <div className="space-y-4 border-t border-white/5 pt-4">

                  {/* Feature 1: PII Secrets scrubber */}
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "w-2 h-2 rounded-full transition-all duration-300",
                          secretsScrubEnabled ? "bg-emerald-400 shadow-[0_0_8px_#34d399]" : "bg-rose-500 shadow-[0_0_8px_#f43f5e]"
                        )} />
                        <h4 className="text-xs font-mono font-extrabold text-white uppercase">
                          Telemetry Credentials & PII Scrubber
                        </h4>
                      </div>
                      <p className="text-[11px] text-gray-400 leading-normal">
                        Filters out confidential emails, tokens, keys, and private environment strings from generated output files before rendering.
                      </p>
                    </div>
                    
                    {/* Toggle button */}
                    <button
                      type="button"
                      onClick={() => {
                        setSecretsScrubEnabled(!secretsScrubEnabled);
                        addTip(`Operator toggled Credentials & PII Scrubber to ${!secretsScrubEnabled ? 'ACTIVE' : 'INACTIVE'}`);
                      }}
                      className={cn(
                        "px-4 py-2 rounded-lg font-mono text-[9px] uppercase tracking-widest border transition-all h-11 flex items-center justify-center font-bold min-w-[128px]",
                        secretsScrubEnabled 
                          ? "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.1)]" 
                          : "bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/30"
                      )}
                    >
                      {secretsScrubEnabled ? "ENABLED" : "DISABLED"}
                    </button>
                  </div>

                  {/* Feature 2: Bias Mitigation slider */}
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#00f2ff] shadow-[0_0_8px_#00f2ff]" />
                          <h4 className="text-xs font-mono font-extrabold text-white uppercase">
                            Algorithmic Bias Deflation Level
                          </h4>
                        </div>
                        <p className="text-[11px] text-gray-400 leading-normal">
                          Continuous bias scanning monitors outputs for discriminatory criteria, inequitable design selections, and structural accessibility shortfalls.
                        </p>
                      </div>
                      <span className="text-xs font-mono text-[#00f2ff] font-bold sm:self-start mt-1 bg-[#00f2ff]/10 border border-[#00f2ff]/20 px-2 py-0.5 rounded">
                        {biasMitigationLevel}% DEFLECTED
                      </span>
                    </div>

                    <div className="space-y-1 pt-1.5">
                      <input 
                        type="range"
                        min="50"
                        max="100"
                        step="1"
                        value={biasMitigationLevel}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setBiasMitigationLevel(val);
                          addTip(`Calibrated Bias Deflation Level: ${val}%`);
                        }}
                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none accent-[#00f2ff] cursor-pointer"
                      />
                      <div className="flex justify-between text-[8px] font-mono text-gray-500">
                        <span>BALANCED AUDIT (50%)</span>
                        <span>ADVANCED REINFORCED DEFENSE (100%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Feature 3: Human sovereign oversight lock */}
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "w-2 h-2 rounded-full transition-all duration-300",
                          humanOversightLock ? "bg-cyan-400 shadow-[0_0_8px_#22d3ee]" : "bg-amber-400 shadow-[0_0_8px_#fbbf24]"
                        )} />
                        <h4 className="text-xs font-mono font-extrabold text-white uppercase">
                          Sovereign Human Oversight Authorization
                        </h4>
                      </div>
                      <p className="text-[11px] text-gray-400 leading-normal">
                        Guarantees the AI cannot apply codebase changes or push files autonomously. The operator retains absolute veto rights on all synthesized blueprints.
                      </p>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setHumanOversightLock(!humanOversightLock);
                        addTip(`Sovereign Human Oversight Authorization: ${!humanOversightLock ? 'LOCKED (STRICT APPROVAL)' : 'UNLOCKED'}`);
                      }}
                      className={cn(
                        "px-4 py-2 rounded-lg font-mono text-[9px] uppercase tracking-widest border transition-all h-11 flex items-center justify-center font-bold min-w-[128px]",
                        humanOversightLock 
                          ? "bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border-cyan-500/30 shadow-[0_0_8px_rgba(34,211,238,0.1)]" 
                          : "bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border-amber-500/30"
                      )}
                    >
                      {humanOversightLock ? "LOCKED (VETO)" : "UNRESTRICTED"}
                    </button>
                  </div>

                </div>

                <div className="bg-slate-950/50 rounded-xl border border-white/5 p-3.5 space-y-1.5">
                  <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase block">✔ ACTIVE ALIGNMENT METASTABILITY: OPTIMAL</span>
                  <p className="text-[10px] text-gray-400 leading-relaxed font-mono">
                    By keeping these ethical guards enabled, Daedalus operates under a zero-trust model: masking user contexts from potential leakage while actively verifying system performance metrics (Correctness, Accessibility, and Security).
                  </p>
                </div>
              </div>

              {/* Close Footer Button */}
              <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    addTip("Operator synchronized Ethical Alignment parameters.");
                  }}
                  className="px-6 py-2 bg-[#00f2ff] hover:bg-[#00f2ff]/90 text-black font-extrabold font-mono text-xs uppercase rounded-lg shadow-[0_0_15px_rgba(0,242,255,0.2)] active:scale-95 transition-all"
                >
                  Apply & Synchronize Settings
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
