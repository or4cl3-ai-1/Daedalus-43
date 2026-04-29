import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Target, Users, Sparkles, 
  ChevronRight, ClipboardCheck, Layout,
  MessageSquare, Lightbulb
} from 'lucide-react';
import { cn } from '../utils/cn';

interface Step {
  id: number;
  title: string;
  icon: React.ReactNode;
  question: string;
  field: string;
  placeholder: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Vision",
    icon: <Lightbulb className="w-5 h-5 text-yellow-400" />,
    question: "What is the core problem this project aims to solve?",
    field: "vision",
    placeholder: "e.g., Simplifying real-time neural data synchronization..."
  },
  {
    id: 2,
    title: "Audience",
    icon: <Users className="w-5 h-5 text-blue-400" />,
    question: "Who are the primary users of this system?",
    field: "audience",
    placeholder: "e.g., System architects and neural network developers..."
  },
  {
    id: 3,
    title: "Capabilities",
    icon: <Layout className="w-5 h-5 text-purple-400" />,
    question: "What are the 3-5 'Non-Negotiable' features?",
    field: "features",
    placeholder: "e.g., Real-time chat, AI architecture lab, bias auditing..."
  },
  {
    id: 4,
    title: "Success",
    icon: <Target className="w-5 h-5 text-daedalus-accent" />,
    question: "How will we measure project success?",
    field: "success",
    placeholder: "e.g., 90% accuracy in bias detection, sub-100ms latency..."
  }
];

export const ScopeDesigner: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [isFinalized, setIsFinalized] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinalized(true);
    }
  };

  const step = steps[currentStep];

  return (
    <div className="h-full p-4 md:p-8 flex flex-col gap-6 overflow-y-auto">
      <header>
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
          <Search className="w-8 h-8 text-daedalus-accent" />
          Project Scope Designer
        </h2>
        <p className="text-daedalus-muted text-sm mt-1">Structured neural elicitation for high-fidelity project briefs.</p>
      </header>

      {!isFinalized ? (
        <div className="max-w-2xl mx-auto w-full space-y-8 mt-8">
          {/* Progress Bar */}
          <div className="flex gap-2 h-1">
            {steps.map((s, idx) => (
              <div 
                key={s.id} 
                className={cn(
                  "flex-1 rounded-full transition-all duration-500",
                  idx <= currentStep ? "bg-daedalus-accent" : "bg-white/5"
                )} 
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-panel p-8 space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-black/20 flex items-center justify-center ring-1 ring-white/10">
                  {step.icon}
                </div>
                <div>
                  <div className="text-[10px] font-mono text-daedalus-accent tracking-[2px] uppercase">Phase 0{step.id}</div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm text-daedalus-ink font-medium">{step.question}</label>
                <textarea 
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-daedalus-accent transition-all min-h-[120px] text-sm font-mono placeholder:text-daedalus-muted/30"
                  placeholder={step.placeholder}
                  value={data[step.field] || ''}
                  onChange={(e) => setData({ ...data, [step.field]: e.target.value })}
                />
              </div>

              <button 
                onClick={handleNext}
                className="w-full btn-primary py-3 font-bold flex items-center justify-center gap-2"
              >
                {currentStep === steps.length - 1 ? "Finalize Scope" : "Next Phase"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl mx-auto w-full space-y-6"
        >
          <div className="glass-panel p-8 space-y-8 border-daedalus-accent/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ClipboardCheck className="w-32 h-32 text-daedalus-accent" />
            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div>
                <h3 className="text-2xl font-bold">Project Architecture Brief</h3>
                <p className="text-daedalus-muted text-xs uppercase tracking-widest font-mono">Synthesized by Daedalus</p>
              </div>
              <Sparkles className="text-daedalus-accent animate-pulse" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {steps.map(s => (
                <div key={s.id} className="space-y-2">
                  <h4 className="text-[10px] font-mono text-daedalus-accent uppercase tracking-widest flex items-center gap-2">
                    {s.icon}
                    {s.title}
                  </h4>
                  <p className="text-xs text-daedalus-muted bg-white/5 p-3 rounded-lg border border-white/5 min-h-[60px]">
                    {data[s.field] || 'Not specified.'}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 flex gap-4">
              <button 
                onClick={() => setIsFinalized(false)}
                className="btn-outline flex-1 py-2 text-xs"
              >
                Restart Process
              </button>
              <button className="btn-primary flex-1 py-2 text-xs">
                Incept Project Workspace
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
