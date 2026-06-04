import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronLeft, Sparkles, Code, GitCommit, Layers, RefreshCw } from 'lucide-react';
import { cn } from '../utils/cn';

interface Step {
  title: string;
  description: string;
  targetId: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    title: "Neural Interface",
    description: "Input software requirements, ask questions, or issue synthesis commands directly to Daedalus. Use clear human instructions to build modules.",
    targetId: "tour-chat",
    icon: <Sparkles className="w-5 h-5 text-[#00f2ff]" />
  },
  {
    title: "Artifacts & Outputs",
    description: "View code bundles, architectural plans, and system design structures synthesized as actionable, editable artifacts.",
    targetId: "tour-artifacts",
    icon: <Layers className="w-5 h-5 text-purple-400" />
  },
  {
    title: "Cognitive Undo & Redo",
    description: "Revert or reapply actions instantly. The internal memory system registers every single mutation and prompt iteration.",
    targetId: "tour-history",
    icon: <RefreshCw className="w-5 h-5 text-emerald-400" />
  },
  {
    title: "SDLC Adaptive Tuning",
    description: "Monitor real-time feedback alignment, active model configurations, heuristic adjustments, and learning loops.",
    targetId: "tour-telemetry",
    icon: <GitCommit className="w-5 h-5 text-rose-400" />
  }
];

export const OnboardingTour: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const updateTarget = () => {
      const element = document.getElementById(steps[currentStep].targetId);
      if (element) {
        setTargetRect(element.getBoundingClientRect());
      } else {
        setTargetRect(null);
      }
    };

    updateTarget();
    // Use an interval to catch client-side layout movements
    const interval = setInterval(updateTarget, 250);
    window.addEventListener('resize', updateTarget);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateTarget);
    };
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden pointer-events-none">
      {/* Dimmed Background */}
      <div className="absolute inset-0 bg-black/60 pointer-events-auto" onClick={onComplete} />
      
      {/* Highlighting Hole */}
      {targetRect && (
        <motion.div 
          layoutId="tour-hole"
          className="absolute border border-[#00f2ff] shadow-[0_0_20px_rgba(0,242,255,0.4)] bg-transparent rounded-lg z-[201]"
          initial={false}
          animate={{
            top: targetRect.top - 6,
            left: targetRect.left - 6,
            width: targetRect.width + 12,
            height: targetRect.height + 12,
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        />
      )}

      {/* Tour Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: -15 }}
          className="fixed z-[202] w-[310px] glass-panel p-5 shadow-2xl pointer-events-auto border-[#00f2ff]/40 bg-[#0c101b]/95"
          style={{
            top: targetRect 
              ? Math.max(16, Math.min(window.innerHeight - 300, targetRect.bottom + 12)) 
              : '50%',
            left: targetRect 
              ? Math.max(16, Math.min(window.innerWidth - 326, targetRect.left - ("top-history" === steps[currentStep].targetId ? 100 : 0))) 
              : '50%',
            transform: targetRect ? 'none' : 'translate(-50%, -50%)'
          } as any}
        >
          <div className="flex justify-between items-start mb-3">
            <div className="w-9 h-9 rounded bg-[#00f2ff]/10 border border-[#00f2ff]/20 flex items-center justify-center">
              {step.icon}
            </div>
            <button onClick={onComplete} className="text-gray-400 hover:text-white transition-colors p-1">
              <X className="w-4 h-4" />
            </button>
          </div>

          <h3 className="text-sm font-bold tracking-tight text-[#00f2ff] uppercase mb-1">{step.title}</h3>
          <p className="text-xs text-gray-300 leading-relaxed mb-5">
            {step.description}
          </p>

          <div className="flex items-center justify-between">
            {/* Direct Step Indicator */}
            <div className="flex gap-1">
              {steps.map((_, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "w-1 y-1 rounded-full transition-all duration-300",
                    idx === currentStep ? "bg-[#00f2ff] w-3" : "bg-white/10"
                  )} 
                />
              ))}
            </div>
            {/* Controls */}
            <div className="flex gap-1.5">
              <button 
                onClick={handlePrev}
                disabled={currentStep === 0}
                className={cn(
                  "p-1.5 rounded border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all text-xs flex items-center justify-center",
                  currentStep === 0 && "opacity-20 cursor-not-allowed"
                )}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={handleNext}
                className="bg-[#00f2ff] text-black hover:bg-[#00f2ff]/90 px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all shadow-[0_0_8px_rgba(0,242,255,0.4)]"
              >
                {currentStep === steps.length - 1 ? "Start" : "Next"}
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
