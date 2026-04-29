import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Layers, Info, ShieldCheck, Zap, 
  ArrowRight, CheckCircle2, AlertTriangle,
  Cpu, Server, Database
} from 'lucide-react';
import { cn } from '../utils/cn';

interface ArchitectureOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  tradeOffs: {
    pros: string[];
    cons: string[];
  };
  ethics: string;
  biasMitigation: string;
}

const architectures: ArchitectureOption[] = [
  {
    id: 'monolith',
    name: 'Modular Monolith',
    icon: <Database className="w-5 h-5 text-blue-400" />,
    description: 'A single unified codebase with clear domain boundaries within a single deployment unit.',
    tradeOffs: {
      pros: ['Simplified development and deployment', 'High performance (zero network latency)', 'Easier monitoring'],
      cons: ['Scaling is all-or-nothing', 'Longer build times', 'Potential for tight coupling over time']
    },
    ethics: 'Centralized control makes it easier to enforce uniform privacy data masking policies.',
    biasMitigation: 'Single audit point for decision-making logic ensures consistent fairness checks.'
  },
  {
    id: 'microservices',
    name: 'Neural Microservices',
    icon: <Server className="w-5 h-5 text-daedalus-accent" />,
    description: 'Decomposition of application into isolated, autonomous services communicating via neural bus or events.',
    tradeOffs: {
      pros: ['Independent scaling of critical components', 'Technology diversity', 'High fault isolation'],
      cons: ['Increased operational complexity', 'Network latency overhead', 'Data consistency challenges']
    },
    ethics: 'Decentralized data silos can improve privacy by restricting PII to specific, hardened services.',
    biasMitigation: 'Isolated services allow for specialized bias detection models tailored to specific domain data.'
  },
  {
    id: 'serverless',
    name: 'Event-Driven Serverless',
    icon: <Zap className="w-5 h-5 text-yellow-400" />,
    description: 'Infinite scalability with functions triggered by internal or external neural events.',
    tradeOffs: {
      pros: ['Nil operational overhead', 'Cost-effective for variable workloads', 'Rapid time-to-market'],
      cons: ['Cold start potential', 'Limited execution time', 'Vendor lock-in risks']
    },
    ethics: 'Ephemeral compute reduces the attack surface for long-term data leakage.',
    biasMitigation: 'Function-level auditing ensures that every atomic transformation is ethically verified.'
  }
];

export const ArchitectureAssistant: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('monolith');
  const selected = architectures.find(a => a.id === selectedId)!;

  return (
    <div className="h-full p-4 md:p-8 flex flex-col gap-6 overflow-y-auto">
      <header>
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
          <Layers className="w-8 h-8 text-daedalus-accent" />
          Architecture Assistant
        </h2>
        <p className="text-daedalus-muted text-sm mt-1">Intelligent synthesis of system structures with ethical alignment.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Selection Sidebar */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-daedalus-muted">Patterns</h3>
          <div className="space-y-2">
            {architectures.map((arch) => (
              <button
                key={arch.id}
                onClick={() => setSelectedId(arch.id)}
                className={cn(
                  "w-full p-4 rounded-xl border transition-all flex items-center gap-4 text-left",
                  selectedId === arch.id 
                    ? "bg-daedalus-accent/10 border-daedalus-accent shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)]" 
                    : "bg-white/5 border-white/10 hover:border-white/20"
                )}
              >
                <div className="p-2 rounded-lg bg-black/20">
                  {arch.icon}
                </div>
                <div>
                  <div className={cn("text-sm font-bold", selectedId === arch.id ? "text-daedalus-accent" : "text-daedalus-ink")}>
                    {arch.name}
                  </div>
                  <div className="text-[10px] text-daedalus-muted line-clamp-1">{arch.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">{selected.name} Analysis</h3>
              <span className="text-[10px] font-mono bg-daedalus-accent/20 text-daedalus-accent px-2 py-0.5 rounded border border-daedalus-accent/30 tracking-widest uppercase">
                Ethically Verified
              </span>
            </div>
            
            <p className="text-sm text-daedalus-muted leading-relaxed">
              {selected.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/10 space-y-3">
                <div className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-3 h-3" /> Strengths
                </div>
                <ul className="space-y-2">
                  {selected.tradeOffs.pros.map((pro, i) => (
                    <li key={i} className="text-xs text-daedalus-muted flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-green-400 mt-1.5" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/10 space-y-3">
                <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider">
                  <AlertTriangle className="w-3 h-3" /> Constraints
                </div>
                <ul className="space-y-2">
                  {selected.tradeOffs.cons.map((con, i) => (
                    <li key={i} className="text-xs text-daedalus-muted flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-red-400 mt-1.5" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 border-daedalus-accent/20 bg-daedalus-accent/5 space-y-4">
              <h4 className="font-bold text-sm flex items-center gap-2 text-daedalus-accent">
                <ShieldCheck className="w-4 h-4" /> Ethical Alignment
              </h4>
              <p className="text-xs text-daedalus-muted leading-relaxed italic">
                "{selected.ethics}"
              </p>
            </div>
            <div className="glass-panel p-6 border-purple-500/20 bg-purple-500/5 space-y-4">
              <h4 className="font-bold text-sm flex items-center gap-2 text-purple-400">
                <Cpu className="w-4 h-4" /> Bias Mitigation
              </h4>
              <p className="text-xs text-daedalus-muted leading-relaxed">
                {selected.biasMitigation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
