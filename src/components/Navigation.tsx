import React, { useState } from 'react';
import { Menu, X, LayoutDashboard, BrainCircuit, FileText, Settings, Wifi, WifiOff } from 'lucide-react';
import { cn } from '../utils/cn';

interface NavigationProps {
  currentScreen: 'dashboard' | 'analytics' | 'docs';
  setScreen: (screen: 'dashboard' | 'analytics' | 'docs') => void;
  connectionStatus: 'connecting' | 'connected' | 'disconnected';
}

export const Navigation: React.FC<NavigationProps> = ({ currentScreen, setScreen, connectionStatus }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Workspace', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BrainCircuit },
    { id: 'docs', label: 'Documentation', icon: FileText },
  ] as const;

  return (
    <nav className="bg-slate-950 border-b border-white/10 p-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-tr from-[#00f2ff] to-purple-600 flex items-center justify-center font-black text-black">D</div>
            <h1 className="font-sans font-bold text-lg text-white">Daedalus</h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setScreen(item.id as any)}
              className={cn(
                "flex items-center gap-2 font-mono text-xs uppercase tracking-wider transition-colors",
                currentScreen === item.id ? "text-[#00f2ff]" : "text-gray-400 hover:text-white"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 font-mono text-[10px]">
             {connectionStatus === 'connected' ? (
                <Wifi className="w-3.5 h-3.5 text-[#00f2ff]" /> 
             ) : (
                <WifiOff className="w-3.5 h-3.5 text-rose-500" />
             )}
             <span className={connectionStatus === 'connected' ? 'text-[#00f2ff]' : 'text-rose-500'}>
                {connectionStatus.toUpperCase()}
             </span>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 p-4 border-t border-white/10 bg-slate-900">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setScreen(item.id as any); setIsOpen(false); }}
              className="flex items-center gap-2 text-white font-mono text-sm"
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};
