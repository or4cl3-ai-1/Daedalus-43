import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Zap, BookOpen, Rocket, Scale, CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '../utils/cn';

export const ProtocolView: React.FC = () => {
  return (
    <motion.div 
      key="protocol"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full p-4 md:p-8 overflow-y-auto bg-daedalus-bg/50 backdrop-blur-md"
    >
      <div className="max-w-4xl mx-auto space-y-12 pb-20">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-daedalus-accent/10 border border-daedalus-accent/20 text-daedalus-accent text-[10px] font-mono uppercase tracking-widest">
            <ShieldCheck className="w-3 h-3" />
            Neural Protocol v2.0.4
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">DAEDALUS <span className="text-daedalus-accent">PROTOCOLS</span></h1>
          <p className="text-daedalus-muted text-lg font-light leading-relaxed">
            The fundamental operating principles for autonomous architectural synthesis and engineering.
          </p>
        </div>

        {/* Section 1: Core Proficiencies */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-daedalus-accent">
            <Zap className="w-5 h-5" />
            <h2 className="text-xs font-mono uppercase tracking-[0.3em] font-bold">Core Proficiencies</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ProficiencyCard 
              title="Architectural Synthesis"
              description="High-level vision to comprehensive system designs and SVG hierarchies."
              input="Vision, Requirements, Sketches"
              output="Architecture Diagrams, Component Maps"
            />
            <ProficiencyCard 
              title="Autonomous Implementation"
              description="Feature specs to production-ready code across multiple languages."
              input="Specs, UI Mockups, Logic"
              output="Code Artifacts, Unit Tests"
            />
            <ProficiencyCard 
              title="Ethical & Security Auditing"
              description="Risk assessments and bias detection for proposed designs."
              input="Designs, Code Snippets"
              output="Audit Reports, Mitigation Plans"
            />
          </div>
        </section>

        {/* Section 2: Onboarding Process */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-daedalus-accent">
            <Rocket className="w-5 h-5" />
            <h2 className="text-xs font-mono uppercase tracking-[0.3em] font-bold">Onboarding Process</h2>
          </div>
          <div className="space-y-4">
            {[
              { step: 1, title: "Neural Link Initialization", desc: "Select your access level (Administrator, Developer, or Guest) to tailor the interface." },
              { step: 2, title: "Project Inception", desc: "Use the 'New Project' command to create an isolated neural workspace." },
              { step: 3, title: "Requirement Ingestion", desc: "Describe your project idea or upload a visual mockup. Daedalus will analyze and confirm the scope." },
              { step: 4, title: "Artifact Manifestation", desc: "Daedalus generates initial artifacts (Architecture, Code, Docs) in the side-by-side canvas." },
              { step: 5, title: "Iterative Refinement", desc: "Provide feedback or ask for modifications. Use the Version Timeline to track evolution." }
            ].map((item) => (
              <div key={item.step} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-daedalus-accent/10 border border-daedalus-accent/30 flex items-center justify-center text-daedalus-accent font-mono text-xs group-hover:bg-daedalus-accent group-hover:text-daedalus-bg transition-all">
                    {item.step}
                  </div>
                  {item.step < 5 && <div className="w-px h-full bg-daedalus-border my-2" />}
                </div>
                <div className="pb-8">
                  <h3 className="text-lg font-bold tracking-tight mb-1">{item.title}</h3>
                  <p className="text-daedalus-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Ethical Guidelines */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-daedalus-accent">
            <Scale className="w-5 h-5" />
            <h2 className="text-xs font-mono uppercase tracking-[0.3em] font-bold">Ethical Guidelines</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EthicCard 
              title="Bias Identification"
              content="Daedalus uses linguistic analysis and algorithmic cross-referencing to detect social, gender, or racial biases in generated content."
            />
            <EthicCard 
              title="Security First"
              content="All code generation adheres to OWASP standards and undergoes automated vulnerability scanning."
            />
            <EthicCard 
              title="Privacy by Design"
              content="Daedalus prioritizes data minimization and secure state management in all architectural designs."
            />
            <EthicCard 
              title="Responsible AI"
              content="Every neural pulse is monitored by the Ethical Auditor to ensure fairness and transparency."
            />
          </div>
        </section>

        {/* Footer */}
        <div className="pt-12 border-t border-daedalus-border flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 text-daedalus-muted text-[10px] font-mono uppercase tracking-widest">
            <span>Or4cl3 AI Solutions</span>
            <div className="w-1 h-1 bg-daedalus-accent rounded-full" />
            <span>Neural Link Encrypted</span>
          </div>
          <button className="btn-primary py-2 px-6 text-xs flex items-center gap-2">
            Download Protocol PDF <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ProficiencyCard = ({ title, description, input, output }: { title: string, description: string, input: string, output: string }) => (
  <div className="glass-panel p-6 space-y-4 hover:border-daedalus-accent/30 transition-all">
    <h3 className="text-sm font-bold tracking-tight text-daedalus-accent">{title}</h3>
    <p className="text-xs text-daedalus-muted leading-relaxed">{description}</p>
    <div className="space-y-2 pt-2 border-t border-white/5">
      <div className="flex justify-between text-[10px] font-mono">
        <span className="text-daedalus-muted uppercase">Input:</span>
        <span className="text-white text-right">{input}</span>
      </div>
      <div className="flex justify-between text-[10px] font-mono">
        <span className="text-daedalus-muted uppercase">Output:</span>
        <span className="text-white text-right">{output}</span>
      </div>
    </div>
  </div>
);

const EthicCard = ({ title, content }: { title: string, content: string }) => (
  <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-daedalus-accent/20 transition-all">
    <CheckCircle2 className="w-5 h-5 text-daedalus-accent shrink-0 mt-1" />
    <div className="space-y-1">
      <h4 className="text-sm font-bold tracking-tight">{title}</h4>
      <p className="text-xs text-daedalus-muted leading-relaxed">{content}</p>
    </div>
  </div>
);
