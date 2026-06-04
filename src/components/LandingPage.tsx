import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Terminal, Activity, Layers, ShieldCheck, Cpu, Sliders, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  return (
    <div className="min-h-full w-full relative bg-[#020205] text-[#e2e8f0] flex flex-col items-center justify-between p-6 md:p-12 neural-grid py-12 md:py-16">
      <div className="scanline" />

      {/* Futuristic Header bar */}
      <header className="w-full max-w-7xl flex items-center justify-between border-b border-white/5 pb-4 z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-[#00f2ff] flex items-center justify-center shadow-[0_0_15px_rgba(0,242,255,0.4)]">
            <Sparkles className="w-4 h-4 text-black" />
          </div>
          <span className="font-mono text-sm tracking-widest font-bold uppercase text-white">OR4CL3 // DAEDALUS</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
          <span>PORT: 3000 (SECURED)</span>
          <span>● CORE ALIGNED</span>
        </div>
      </header>

      {/* Main Hero Visual Card & Text */}
      <main className="w-full max-w-4xl flex flex-col items-center justify-center my-auto text-center gap-8 z-10">
        <div className="space-y-4">
          {/* Diagnostic status pill */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/30 border border-[#00f2ff]/30 rounded-full"
          >
            <Activity className="w-3.5 h-3.5 text-[#00f2ff] animate-pulse" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#00f2ff] font-bold">ALPHA-26 NEURAL INTERFACE STATUS: ONLINE</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e2e8f0] to-[#00f2ff] uppercase drop-shadow-[0_0_20px_rgba(0,242,255,0.1)]"
          >
            Daedalus AI
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            An autonomous, high-fidelity neural assistant designed for system synthesis, architecture exploration, and iterative software optimization. Built on self-calibrating feedback loops to deliver resilient logic.
          </motion.p>
        </div>

        {/* Dynamic Bento Box features overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-left">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-5 border-white/5 bg-slate-950/40 relative overflow-hidden group hover:border-[#00f2ff]/30 transition-all hover:translate-y-[-2px]"
          >
            <Cpu className="w-5 h-5 text-[#00f2ff] mb-3" />
            <span className="block font-mono text-[11px] font-bold text-white uppercase tracking-wider mb-1">Synthesize Blueprints</span>
            <span className="block text-xs text-gray-400 leading-relaxed">Instantly materialize comprehensive system architectures, operational microservices, and design manifests from natural speech.</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-panel p-5 border-white/5 bg-slate-950/40 relative overflow-hidden group hover:border-purple-500/30 transition-all hover:translate-y-[-2px]"
          >
            <Sliders className="w-5 h-5 text-purple-400 mb-3" />
            <span className="block font-mono text-[11px] font-bold text-white uppercase tracking-wider mb-1">Adaptive Feedback Loop</span>
            <span className="block text-xs text-gray-400 leading-relaxed">Rate complex code logic and designs directly. Watch the system tune hyper-parameters and update templates recursively for peak efficiency.</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-panel p-5 border-white/5 bg-slate-950/40 relative overflow-hidden group hover:border-emerald-500/30 transition-all hover:translate-y-[-2px]"
          >
            <ShieldCheck className="w-5 h-5 text-emerald-400 mb-3" />
            <span className="block font-mono text-[11px] font-bold text-white uppercase tracking-wider mb-1">Safeguard Auditing</span>
            <span className="block text-xs text-gray-400 leading-relaxed">Continuous bias scans, fairness assessments, and structural alignment audits guarantee robust compliance benchmarks through every evolution.</span>
          </motion.div>
        </div>

        {/* Primary CTA */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          onClick={onEnter}
          className="mt-4 px-8 py-4 bg-[#00f2ff] hover:bg-cyan-400 text-black font-extrabold uppercase tracking-widest text-xs rounded-xl flex items-center gap-3 transition-all hover:shadow-[0_0_30px_rgba(0,242,255,0.5)] transform hover:scale-105"
        >
          Initialize Adaptive Synthesis
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </main>

      {/* Cyberpunk Footer Stats bar */}
      <footer className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between text-[9px] font-mono text-gray-500 border-t border-white/5 pt-4 gap-4 z-10 w-full">
        <div className="flex gap-4">
          <span>COGNITIVE DEPTH: 1048K CHIPS</span>
          <span>LATENCY: 14ms (NEURAL BUS)</span>
        </div>
        <div>
          <span>DAEDALUS SYSTEMS VER 1.4.19 © OR4CL3 AI SOLUTIONS INC.</span>
        </div>
      </footer>
    </div>
  );
};
