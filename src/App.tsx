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
  Code
} from 'lucide-react';
import { cn } from './utils/cn';

// Types
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
}

interface AppState {
  messages: Message[];
  artifacts: Artifact[];
}

// History Hook
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
  const { state, pushState, undo, redo, canUndo, canRedo } = useHistoryState({
    messages: [
      { id: '1', role: 'model', content: "Neural Link Alpha-01 established. I am Daedalus. How shall we manifest your vision today?", timestamp: new Date() }
    ],
    artifacts: []
  });

  const [inputText, setInputText] = useState('');
  const [activeArtifactId, setActiveArtifactId] = useState<string | null>(null);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
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

    // Simulate AI Response with some artifact creation
    setTimeout(() => {
      const aiResponse: Message = {
        id: Math.random().toString(36).substr(2, 9),
        role: 'model',
        content: `Analyzing requirement: "${inputText}". Generating neural blueprint for this module.`,
        timestamp: new Date()
      };

      const newArtifact: Artifact = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'code',
        title: `Module synthesis - ${inputText.split(' ')[0]}`,
        content: `// Synthesized logic for: ${inputText}\nexport const manifest = () => {\n  console.log("Initializing ${inputText}...");\n};`,
        updatedAt: new Date()
      };

      pushState({
        messages: [...newState.messages, aiResponse],
        artifacts: [...newState.artifacts, newArtifact]
      });
    }, 1000);
  };

  const handleUpdateArtifact = (id: string, newContent: string) => {
    const newArtifacts = state.artifacts.map(a => 
      a.id === id ? { ...a, content: newContent, updatedAt: new Date() } : a
    );
    pushState({
      ...state,
      artifacts: newArtifacts
    });
  };

  const handleDeleteArtifact = (id: string) => {
    pushState({
      ...state,
      artifacts: state.artifacts.filter(a => a.id !== id)
    });
    if (activeArtifactId === id) setActiveArtifactId(null);
  };

  const activeArtifact = state.artifacts.find(a => a.id === activeArtifactId);

  return (
    <div className="flex h-screen w-full neural-grid bg-daedalus-bg text-daedalus-ink overflow-hidden p-4 gap-4">
      <div className="scanline" />

      {/* Main Sidebar */}
      <aside className="w-80 flex flex-col gap-4">
        <header className="glass-panel p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-daedalus-accent flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tighter uppercase">Daedalus AI</h1>
              <div className="text-[10px] text-daedalus-accent/60 font-mono tracking-widest uppercase">Research mode active</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={undo} 
              disabled={!canUndo}
              className="p-1.5 rounded bg-white/5 hover:bg-white/10 disabled:opacity-20 transition-all"
              title="Undo Neural Pulse"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button 
              onClick={redo} 
              disabled={!canRedo}
              className="p-1.5 rounded bg-white/5 hover:bg-white/10 disabled:opacity-20 transition-all"
              title="Redo Neural Pulse"
            >
              <Redo2 className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Chat Component */}
        <section className="flex-1 flex flex-col glass-panel overflow-hidden">
          <div className="p-3 border-b border-white/5 flex items-center gap-2 text-[10px] font-mono text-daedalus-accent uppercase">
            <Terminal className="w-3 h-3" />
            <span>Neural Interface</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {state.messages.map((m) => (
              <div key={m.id} className={cn(
                "flex flex-col max-w-[85%]",
                m.role === 'user' ? "ml-auto items-end" : "items-start"
              )}>
                <div className={cn(
                  "px-3 py-2 rounded-lg text-xs",
                  m.role === 'user' ? "bg-white/10 text-white" : "bg-daedalus-accent/10 border border-daedalus-accent/20 text-daedalus-accent"
                )}>
                  {m.content}
                </div>
                <span className="text-[8px] opacity-40 mt-1">{m.timestamp.toLocaleTimeString()}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="p-3 bg-black/40 border-t border-white/5 flex gap-2">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Inject command..." 
              className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1.5 text-xs outline-none focus:border-daedalus-accent/50 transition-all"
            />
            <button type="submit" className="p-1.5 rounded bg-daedalus-accent/20 hover:bg-daedalus-accent/30 text-daedalus-accent transition-all">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </section>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col gap-4">
        {/* Artifact Toolbar */}
        <header className="h-14 glass-panel flex items-center px-4 justify-between">
          <div className="flex items-center gap-4 overflow-x-auto">
            {state.artifacts.length === 0 && (
              <div className="text-xs text-daedalus-accent/40 font-mono tracking-widest italic flex items-center gap-2">
                <Layers className="w-4 h-4" />
                No artifacts manifested yet. Start a session or use the terminal.
              </div>
            )}
            {state.artifacts.map(a => (
              <button
                key={a.id}
                onClick={() => setActiveArtifactId(a.id)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider transition-all border flex items-center gap-2 whitespace-nowrap",
                  activeArtifactId === a.id 
                    ? "bg-daedalus-accent border-daedalus-accent text-black" 
                    : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                )}
              >
                <Code className="w-3 h-3" />
                {a.title}
                <Trash2 
                  className="w-3 h-3 ml-2 hover:text-red-500 transition-colors" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteArtifact(a.id);
                  }}
                />
              </button>
            ))}
          </div>
          <button className="p-2 rounded hover:bg-white/10 text-daedalus-accent" title="Manual Synthesis">
            <Plus className="w-5 h-5" />
          </button>
        </header>

        {/* Artifact Viewport */}
        <div className="flex-1 glass-panel relative overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            {activeArtifact ? (
              <motion.div 
                key={activeArtifact.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex flex-col h-full"
              >
                <div className="p-3 border-b border-white/5 bg-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-daedalus-accent shadow-[0_0_8px_#00f2ff]" />
                    <span className="text-[10px] font-mono tracking-widest uppercase font-bold">{activeArtifact.title}</span>
                  </div>
                  <div className="text-[10px] text-white/40 font-mono italic">Last refined: {activeArtifact.updatedAt.toLocaleTimeString()}</div>
                </div>
                <textarea 
                  className="flex-1 bg-transparent p-6 font-mono text-sm text-[#a0c0ff] outline-none resize-none spellcheck-false leading-relaxed"
                  value={activeArtifact.content}
                  onChange={(e) => handleUpdateArtifact(activeArtifact.id, e.target.value)}
                />
              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-24 h-24 rounded-full border border-daedalus-accent/20 flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 rounded-full border border-daedalus-accent/10 animate-ping opacity-20" />
                  <Layers className="w-10 h-10 text-daedalus-accent/40" />
                </div>
                <h2 className="text-lg font-bold mb-2 tracking-tight">Neural Workspace Empty</h2>
                <p className="text-sm text-white/50 max-w-sm leading-relaxed">
                  Artifacts synthesized via the terminal will manifest here. You can manually edit logic, diagrams, and neural documentation with full history support.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Stats */}
        <footer className="h-10 flex gap-4">
          <div className="flex-1 glass-panel flex items-center px-4 gap-6">
            <div className="flex items-center gap-2 text-[10px] font-mono text-green-400">
              <ShieldCheck className="w-3 h-3" />
              ETHICAL STATUS: SECURE
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-daedalus-accent">
              <Activity className="w-3 h-3" />
              NEURAL LOAD: {(state.messages.length * 4.2).toFixed(1)} P/S
            </div>
          </div>
          <div className="px-6 glass-panel flex items-center gap-2 text-[10px] font-mono whitespace-nowrap">
            <span className="opacity-40 uppercase tracking-widest">History:</span>
            <span>{state.messages.length} Events</span>
            <span className="opacity-40">|</span>
            <span>{state.artifacts.length} Objects</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
