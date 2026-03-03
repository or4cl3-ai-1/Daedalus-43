import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Loader2, ShieldCheck, Database, Globe, Zap } from 'lucide-react';
import { Logo } from './Logo';

export const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing Neural Link...');

  const statuses = [
    'Initializing Neural Link...',
    'Loading Ethical Framework v4.2...',
    'Syncing with Or4cl3 Cloud...',
    'Calibrating Logic Synthesizer...',
    'Establishing Secure Tunnel...',
    'Ready for Autonomous R&D.'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const statusIndex = Math.min(
      Math.floor((progress / 100) * statuses.length),
      statuses.length - 1
    );
    setStatus(statuses[statusIndex]);
  }, [progress]);

  return (
    <div className="fixed inset-0 bg-daedalus-bg z-[100] flex flex-col items-center justify-center p-6 text-center">
      <div className="scanline" />
      <div className="grid-bg absolute inset-0 opacity-20" />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="space-y-12 w-full max-w-md relative z-10"
      >
        <div className="relative">
          <Logo className="w-24 h-24 mx-auto" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-4 border border-daedalus-accent/20 rounded-full border-dashed"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-xs font-mono text-daedalus-muted uppercase tracking-widest mb-2">
            <span>{status}</span>
            <span className="text-daedalus-accent font-bold">{Math.floor(progress)}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
            <motion.div 
              className="h-full bg-daedalus-accent shadow-[0_0_20px_rgba(34,211,238,0.5)]"
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 pt-4">
          <StatusIndicator active={progress > 20} icon={<ShieldCheck className="w-4 h-4" />} />
          <StatusIndicator active={progress > 40} icon={<Database className="w-4 h-4" />} />
          <StatusIndicator active={progress > 60} icon={<Globe className="w-4 h-4" />} />
          <StatusIndicator active={progress > 80} icon={<Zap className="w-4 h-4" />} />
        </div>

        <div className="flex items-center justify-center gap-3 text-daedalus-muted font-mono text-[10px] uppercase tracking-[0.3em]">
          <Loader2 className="w-3 h-3 animate-spin" />
          Securing Connection
        </div>
      </motion.div>

      <div className="absolute bottom-12 left-0 right-0 text-center">
        <p className="text-[10px] text-daedalus-muted font-mono uppercase tracking-widest opacity-50">
          Or4cl3 AI Solutions • Proprietary Interface
        </p>
      </div>
    </div>
  );
};

const StatusIndicator = ({ active, icon }: { active: boolean, icon: React.ReactNode }) => (
  <div className={`p-2 rounded-lg border transition-all duration-500 ${
    active 
      ? 'bg-daedalus-accent/10 border-daedalus-accent/30 text-daedalus-accent shadow-[0_0_10px_rgba(34,211,238,0.2)]' 
      : 'bg-white/5 border-white/5 text-daedalus-muted'
  }`}>
    {icon}
  </div>
);
