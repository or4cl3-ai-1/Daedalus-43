import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, Layout, Sparkles, Play, 
  Terminal, Share2, ClipboardList,
  ChevronRight, FlaskConical, Users,
  MessageSquare, BarChart2
} from 'lucide-react';
import { cn } from '../utils/cn';

interface PrototypeFeature {
  name: string;
  description: string;
  status: 'Ready' | 'Synthesizing' | 'Awaiting Data';
}

export const PrototypeLab: React.FC = () => {
  const [activeStage, setActiveStage] = useState<'demo' | 'testing'>('demo');

  const features: PrototypeFeature[] = [
    { name: "Neural Ingestion Loop", description: "Real-time streaming and processing of high-frequency architecture requests.", status: "Ready" },
    { name: "Ethical Audit Middleware", description: "Transparent, real-time bias detection hook integrated into every artifact cycle.", status: "Synthesizing" },
    { name: "Multi-Agent Collaboration", description: "Simulated interaction between Developer and QA Tester roles in a shared workspace.", status: "Awaiting Data" }
  ];

  return (
    <div className="h-full p-4 md:p-8 flex flex-col gap-6 overflow-y-auto">
      <header className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
            <Cpu className="w-8 h-8 text-daedalus-accent" />
            Rapid Prototyping Showcase
          </h2>
          <p className="text-daedalus-muted text-sm mt-1">High-fidelity functional mockups synthesized from neural briefs.</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          <button 
            onClick={() => setActiveStage('demo')}
            className={cn(
              "px-4 py-2 text-xs font-bold rounded-lg transition-all",
              activeStage === 'demo' ? "bg-daedalus-accent text-black" : "text-daedalus-muted hover:text-daedalus-ink"
            )}
          >
            MVP Showcase
          </button>
          <button 
            onClick={() => setActiveStage('testing')}
            className={cn(
              "px-4 py-2 text-xs font-bold rounded-lg transition-all",
              activeStage === 'testing' ? "bg-daedalus-accent text-black" : "text-daedalus-muted hover:text-daedalus-ink"
            )}
          >
            Testing Plan
          </button>
        </div>
      </header>

      {activeStage === 'demo' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="glass-panel p-6 space-y-4">
              <h3 className="font-bold flex items-center gap-2">
                <Layout className="w-4 h-4 text-daedalus-accent" />
                Prototype Logic Architecture
              </h3>
              <p className="text-xs text-daedalus-muted leading-relaxed">
                This MVP showcases the "Neural Core" of the application, focusing on the critical ingestion phase and automated artifact generation. 
              </p>
              <div className="bg-black/40 rounded-lg p-4 border border-white/5 font-mono text-[11px] text-green-400">
                <div className="flex gap-2 mb-1"><span className="text-daedalus-accent">$</span> init daedalus-prototype</div>
                <div>[SYSTEM] Inception complete.</div>
                <div>[SYSTEM] Scaling NIL edge-nodes...</div>
                <div>[SYSTEM] EA audit: <span className="bg-daedalus-accent/20 px-1 rounded">PASSED</span></div>
                <div className="animate-pulse">_</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-daedalus-muted">Feature Manifest</h4>
              <div className="space-y-3">
                {features.map((f, i) => (
                  <div key={i} className="glass-panel p-4 flex justify-between items-center group hover:border-daedalus-accent/30 transition-all">
                    <div>
                      <div className="text-sm font-bold">{f.name}</div>
                      <div className="text-[10px] text-daedalus-muted">{f.description}</div>
                    </div>
                    <div className={cn(
                      "text-[9px] font-mono px-2 py-0.5 rounded uppercase tracking-tighter",
                      f.status === 'Ready' ? "bg-green-500/10 text-green-400" :
                      f.status === 'Synthesizing' ? "bg-blue-500/10 text-blue-400 animate-pulse" :
                      "bg-white/5 text-daedalus-muted"
                    )}>
                      {f.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-panel relative overflow-hidden flex flex-col">
            <div className="absolute inset-0 grid-bg opacity-20" />
            <div className="p-6 border-b border-white/10 flex justify-between items-center relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="ml-2 text-[10px] font-mono text-daedalus-muted">Neural Preview v0.1-alpha</span>
              </div>
              <button className="text-daedalus-accent animate-pulse">
                <Play className="w-4 h-4 fill-current" />
              </button>
            </div>
            
            <div className="flex-1 flex items-center justify-center relative z-10 p-12">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <div className="w-48 h-48 rounded-full border-2 border-daedalus-accent/50 border-t-daedalus-accent ring-8 ring-daedalus-accent/5 flex items-center justify-center">
                  <Cpu className="w-16 h-16 text-daedalus-accent opacity-50" />
                </div>
                <div className="absolute inset-x-0 -bottom-16 text-center">
                  <div className="text-[10px] font-mono text-daedalus-accent animate-pulse">CORE SYNTHESIS ACTIVE</div>
                  <div className="text-[8px] text-daedalus-muted mt-1 uppercase tracking-widest leading-tight">Processing requirements<br/>at 12.4 t-flops</div>
                </div>
              </motion.div>
            </div>
            
            <div className="p-6 border-t border-white/10 relative z-10 bg-black/20 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-[10px] text-daedalus-muted uppercase font-bold">Visual Representation</div>
                  <div className="text-xs">Dynamic Artifact Canvas v4.0</div>
                </div>
                <button className="btn-primary py-1.5 px-4 text-[10px] flex items-center gap-2">
                  <Share2 className="w-3 h-3" /> External Link
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto w-full space-y-8 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestingCard icon={<Users />} title="Beta Testers" value="12 Candidates" />
            <TestingCard icon={<MessageSquare />} title="Feedback Cycle" value="Weekly Sprints" />
            <TestingCard icon={<BarChart2 />} title="Target KPI" value="< 10ms Jitter" />
          </div>

          <div className="glass-panel p-8 space-y-8">
            <div className="flex items-center gap-4 border-b border-white/10 pb-6">
              <div className="w-12 h-12 rounded-xl bg-daedalus-accent/10 border border-daedalus-accent/20 flex items-center justify-center">
                <ClipboardList className="w-6 h-6 text-daedalus-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold">User Testing & Feedback Plan</h3>
                <p className="text-xs text-daedalus-muted">Validation strategy for MVP manifest 'Neural Core'.</p>
              </div>
            </div>

            <div className="space-y-6">
              <TestStep 
                num="01" 
                title="Internal Dogfooding" 
                desc="Or4cl3 QA specialists audit the functional prototype for technical parity and ethical adherence." 
              />
              <TestStep 
                num="02" 
                title="Selective Alpha Access" 
                desc="Invite hand-picked system architects to stress-test the Neural Ingestion Loop and report hallucinations." 
              />
              <TestStep 
                num="03" 
                title="UX Heatmap Synthesis" 
                desc="Analyze interaction patterns in the Prototype Lab to refine artifact navigation and UI responsiveness." 
              />
              <TestStep 
                num="04" 
                title="Feedback Integration" 
                desc="Aura-synthesize reported issues into the next development sprint backlog automatically." 
              />
            </div>

            <div className="pt-4 flex justify-between items-center text-[10px] font-mono text-daedalus-muted italic">
              <div>* Ethical Monitor active during all testing phases</div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                Live Status: Awaiting Recruitment
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TestingCard = ({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) => (
  <div className="glass-panel p-6 flex flex-col items-center text-center space-y-3">
    <div className="text-daedalus-accent opacity-60">
      {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { className: 'w-6 h-6' }) : icon}
    </div>
    <div>
      <div className="text-[10px] font-mono text-daedalus-muted uppercase tracking-widest">{title}</div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  </div>
);

const TestStep = ({ num, title, desc }: { num: string, title: string, desc: string }) => (
  <div className="flex gap-6 group">
    <div className="text-lg font-mono font-bold text-white/10 group-hover:text-daedalus-accent transition-colors">{num}.</div>
    <div className="space-y-1">
      <h4 className="font-bold text-sm">{title}</h4>
      <p className="text-xs text-daedalus-muted leading-relaxed">{desc}</p>
    </div>
  </div>
);
