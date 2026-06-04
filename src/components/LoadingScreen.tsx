import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, ShieldCheck, Cpu, Terminal, RefreshCw, Layers } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const steps = [
  "Initializing neural gateway pulse...",
  "Loading architectural memory blocks...",
  "Injecting ethical bias calibration matrices...",
  "Verifying system state history repositories...",
  "Opening high-fidelity synthesis gateway..."
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  // Telemetry list simulation
  useEffect(() => {
    const randomLogs = [
      "SYS: Syncing with Or4cl3 decentralized ledger...",
      "CONF: Bias safety alignment checks passing 100%...",
      "DB: Recovered 24 historical feedback calibration loops...",
      "VIRT: Hyperparameters: Temp=0.72, RL_Rate=0.05...",
      "MEM: Loading Undo/Redo checkpoint cache memory..."
    ];
    
    const interval = setInterval(() => {
      const randomLog = randomLogs[Math.floor(Math.random() * randomLogs.length)];
      setLogs(l => [...l.slice(-4), `[${new Date().toLocaleTimeString()}] ${randomLog}`]);
    }, 700);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const totalDuration = 2800; // ms
    const incrementInterval = 40; // ms
    const stepsCount = Math.floor(totalDuration / incrementInterval);
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(Math.round((currentStep / stepsCount) * 100), 100);
      setProgress(currentProgress);

      const stepIndex = Math.floor((currentProgress / 100) * steps.length);
      setCurrentStepIdx(Math.min(stepIndex, steps.length - 1));

      if (currentProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, incrementInterval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen w-full bg-[#030308] text-[#e0e0e0] flex flex-col justify-center items-center p-6 relative neural-grid">
      <div className="scanline" />

      {/* Cybernetic center widget */}
      <div className="w-full max-w-lg glass-panel border-[#00f2ff]/30 p-8 space-y-6 flex flex-col items-center shadow-[0_0_40px_rgba(0,242,255,0.15)] bg-[#070a14]/90">
        
        {/* Revolving progress spinner block */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle 
              cx="48" 
              cy="48" 
              r="42" 
              className="stroke-white/10" 
              strokeWidth="4" 
              fill="none" 
            />
            <circle 
              cx="48" 
              cy="48" 
              r="42" 
              className="stroke-[#00f2ff] transition-all duration-75" 
              strokeWidth="4" 
              strokeDasharray={`${2 * Math.PI * 42}`}
              strokeDashoffset={`${2 * Math.PI * 42 * (1 - progress / 100)}`}
              strokeLinecap="round"
              fill="none" 
            />
          </svg>
          <div className="absolute font-mono text-xl font-bold tracking-tighter text-[#00f2ff]">
            {progress}%
          </div>
        </div>

        {/* Current status string */}
        <div className="space-y-1.5 text-center w-full">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#00f2ff] flex items-center justify-center gap-1.5">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#00f2ff]" />
            Daedalus Calibrating
          </div>
          <p className="text-xs text-gray-400 font-mono transition-all duration-300">
            {steps[currentStepIdx]}
          </p>
        </div>

        {/* Status Light Grid checklist */}
        <div className="w-full border-t border-b border-white/5 py-3 space-y-2">
          {steps.map((s, idx) => {
            const isCompleted = idx < currentStepIdx;
            const isCurrent = idx === currentStepIdx;
            return (
              <div key={idx} className="flex items-center justify-between text-[10px] font-mono">
                <span className={idx <= currentStepIdx ? "text-white" : "text-gray-600"}>{s.replace('...', '')}</span>
                <span className={
                  isCompleted ? "text-[#00f2ff]" :
                  isCurrent ? "text-yellow-400 animate-pulse" : "text-gray-600"
                }>
                  {isCompleted ? "● COMMITTED" : isCurrent ? "⚡ RUNNING" : "○ QUEUED"}
                </span>
              </div>
            );
          })}
        </div>

        {/* Simulated logs pane */}
        <div className="w-full bg-black/50 rounded-lg p-3 font-mono text-[9px] text-[#00f2ff]/60 space-y-1 h-24 overflow-hidden border border-white/5">
          <div className="flex items-center gap-1 text-gray-500 uppercase pb-1 border-b border-white/5 mb-1">
            <Terminal className="w-3 h-3" /> LIVE ALIGNMENT LOGS
          </div>
          {logs.map((log, index) => (
            <div key={index} className="truncate select-none">
              {log}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
