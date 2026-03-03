import React from 'react';
import { motion } from 'motion/react';
import { Cpu, ChevronRight, Shield, Zap, Code2, Globe, Lock, Terminal } from 'lucide-react';
import { Logo } from './Logo';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-daedalus-bg text-daedalus-ink flex flex-col relative overflow-hidden grid-bg">
      <div className="scanline" />
      <div className="absolute inset-0 hero-gradient pointer-events-none" />

      {/* Navigation */}
      <nav className="h-20 border-b border-daedalus-border flex items-center justify-between px-6 md:px-12 relative z-20 bg-daedalus-bg/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Logo className="w-10 h-10" />
          <span className="font-bold text-2xl tracking-tighter">DAEDALUS</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-mono text-daedalus-muted uppercase tracking-widest">
          <a href="#features" className="hover:text-daedalus-accent transition-colors">Features</a>
          <a href="#ethics" className="hover:text-daedalus-accent transition-colors">Ethics</a>
          <a href="#solutions" className="hover:text-daedalus-accent transition-colors">Solutions</a>
          <button onClick={onStart} className="btn-primary py-2 px-6 text-sm">Launch Interface</button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-daedalus-accent/10 border border-daedalus-accent/20 text-daedalus-accent text-xs font-mono uppercase tracking-widest mb-4">
            <Zap className="w-3 h-3" />
            Autonomous R&D v4.0 Now Live
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none">
            ARCHITECT THE <br />
            <span className="text-daedalus-accent">IMPOSSIBLE.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-daedalus-muted max-w-2xl mx-auto leading-relaxed font-light">
            Empower your vision with Daedalus—the world's most advanced autonomous engineering agent. 
            From requirements to deployment, we handle the complexity so you can focus on the impact.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-8">
            <button 
              onClick={onStart}
              className="btn-primary w-full md:w-auto flex items-center justify-center gap-2 group text-lg"
            >
              Initialize Neural Link
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn-outline w-full md:w-auto">
              View Documentation
            </button>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 hidden lg:block animate-float opacity-20">
          <div className="glass-panel p-4 w-48 space-y-2">
            <div className="h-2 w-full bg-daedalus-accent/50 rounded" />
            <div className="h-2 w-2/3 bg-daedalus-accent/30 rounded" />
            <div className="h-2 w-1/2 bg-daedalus-accent/20 rounded" />
          </div>
        </div>
        <div className="absolute bottom-1/4 right-10 hidden lg:block animate-float opacity-20" style={{ animationDelay: '2s' }}>
          <div className="glass-panel p-4 w-56 space-y-3">
            <div className="flex justify-between">
              <div className="w-8 h-8 rounded bg-daedalus-accent/20" />
              <div className="w-8 h-8 rounded bg-daedalus-accent/20" />
            </div>
            <div className="h-2 w-full bg-daedalus-accent/30 rounded" />
          </div>
        </div>
      </main>

      {/* Features Grid */}
      <section className="py-24 px-6 md:px-12 border-t border-daedalus-border bg-daedalus-surface/50 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Shield className="w-8 h-8 text-daedalus-accent" />}
            title="Ethical Guardrails"
            description="Built-in bias detection and security auditing ensures your innovations remain safe and equitable."
          />
          <FeatureCard 
            icon={<Code2 className="w-8 h-8 text-daedalus-accent" />}
            title="Autonomous R&D"
            description="Daedalus handles the technical execution, from architecture design to flawless code implementation."
          />
          <FeatureCard 
            icon={<Globe className="w-8 h-8 text-daedalus-accent" />}
            title="Scalable Solutions"
            description="Designed for high-impact strategic planning and visionary thinking at any scale."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-daedalus-border bg-daedalus-bg/80 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <Logo className="w-8 h-8 opacity-50" />
            <span className="font-bold text-lg tracking-tighter opacity-50">DAEDALUS</span>
          </div>
          <p className="text-xs font-mono text-daedalus-muted uppercase tracking-widest">
            © 2026 Or4cl3 AI Solutions • Secure Neural Link Encrypted
          </p>
          <div className="flex gap-6 text-daedalus-muted">
            <Lock className="w-4 h-4 hover:text-daedalus-accent cursor-pointer transition-colors" />
            <Globe className="w-4 h-4 hover:text-daedalus-accent cursor-pointer transition-colors" />
            <Terminal className="w-4 h-4 hover:text-daedalus-accent cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="glass-panel p-8 space-y-4 hover:border-daedalus-accent/30 transition-all group">
    <div className="w-16 h-16 rounded-2xl bg-daedalus-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold tracking-tight">{title}</h3>
    <p className="text-daedalus-muted leading-relaxed text-sm">{description}</p>
  </div>
);
