import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Maximize2, Minimize2, Copy, Check, 
  Code2, Eye, Download, History, Play,
  FileCode, FileJson, FileText, Palette,
  Terminal as TerminalIcon, Cpu, AlertCircle,
  ChevronRight, Square, ArrowLeft, ShieldCheck
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Markdown from 'react-markdown';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { cn } from '../utils/cn';

export interface Artifact {
  id: string;
  title: string;
  type: 'code' | 'markdown' | 'html' | 'svg' | 'json' | 'latex';
  language: string;
  content: string;
  version: number;
}

interface ArtifactCanvasProps {
  artifact: Artifact | null;
  onClose: () => void;
}

export const ArtifactCanvas: React.FC<ArtifactCanvasProps> = ({ artifact, onClose }) => {
  const [view, setView] = useState<'code' | 'preview' | 'optimize' | 'tests'>('code');
  const [isMaximized, setIsMaximized] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [currentVersion, setCurrentVersion] = useState(artifact?.version || 1);

  useEffect(() => {
    // Reset terminal when artifact changes
    setTerminalOutput([]);
    setIsRunning(false);
    if (artifact) setCurrentVersion(artifact.version);
    // Default to preview for HTML/SVG/Markdown/LaTeX
    if (artifact && ['html', 'svg', 'markdown', 'latex'].includes(artifact.type)) {
      setView('preview');
    } else {
      setView('code');
    }
  }, [artifact?.id, artifact?.version]);

  if (!artifact) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(artifact.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const simulateExecution = () => {
    setIsRunning(true);
    setTerminalOutput([`> Initializing ${artifact.language} runtime...`, `> Compiling ${artifact.title}...`]);
    
    setTimeout(() => {
      setTerminalOutput(prev => [...prev, `> Execution started at ${new Date().toLocaleTimeString()}`]);
      
      // Simulate language specific output
      setTimeout(() => {
        let output = "";
        switch(artifact.language.toLowerCase()) {
          case 'python':
            output = "Hello from Daedalus Python Engine!\nProcess finished with exit code 0";
            break;
          case 'java':
            output = "Daedalus JVM v21.0.2\nMain class executed successfully.\nHeap usage: 42MB";
            break;
          case 'julia':
            output = "Julia v1.10.0\nOptimization complete.\nResult: 42.0";
            break;
          case 'typescript':
          case 'javascript':
            output = "Node.js v20.11.0\n[LOG] Application started\n[LOG] Listening on port 3000";
            break;
          default:
            output = `Successfully executed ${artifact.language} script.\nNo errors found.`;
        }
        setTerminalOutput(prev => [...prev, output]);
        setIsRunning(false);
      }, 1500);
    }, 1000);
  };

  const renderPreview = () => {
    if (artifact.type === 'html' || artifact.type === 'svg') {
      return (
        <iframe
          title="Artifact Preview"
          srcDoc={artifact.type === 'svg' ? `<html><body style="margin:0;display:flex;justify-content:center;align-items:center;height:100vh;background:#0a0a0a;">${artifact.content}</body></html>` : artifact.content}
          className="w-full h-full border-none bg-white"
        />
      );
    }
    
    if (artifact.type === 'markdown') {
      return (
        <div className="p-8 prose prose-invert max-w-none overflow-auto h-full bg-daedalus-bg">
          <Markdown>{artifact.content}</Markdown>
        </div>
      );
    }

    if (artifact.type === 'latex' || artifact.language === 'latex') {
      return (
        <div className="p-12 overflow-auto h-full bg-white text-black flex flex-col items-center">
          <div className="max-w-2xl w-full">
            <BlockMath>{artifact.content}</BlockMath>
          </div>
        </div>
      );
    }

    // Terminal for everything else
    return (
      <div className="h-full bg-[#0c0c0c] font-mono text-sm p-6 overflow-auto">
        <div className="flex items-center gap-2 text-daedalus-muted mb-4 border-b border-white/5 pb-2">
          <TerminalIcon className="w-4 h-4" />
          <span>Daedalus Runtime Terminal</span>
        </div>
        
        {terminalOutput.length === 0 && !isRunning ? (
          <div className="flex flex-col items-center justify-center h-[60%] text-daedalus-muted space-y-4">
            <Play className="w-12 h-12 opacity-10" />
            <p className="text-xs uppercase tracking-widest">Ready to execute {artifact.language}</p>
            <button 
              onClick={simulateExecution}
              className="btn-primary py-2 px-6 text-xs"
            >
              Run Script
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {terminalOutput.map((line, i) => (
              <div key={i} className={cn(
                "whitespace-pre-wrap",
                line.startsWith('>') ? "text-daedalus-accent" : "text-daedalus-ink"
              )}>
                {line}
              </div>
            ))}
            {isRunning && (
              <div className="flex items-center gap-2 text-daedalus-accent">
                <span className="w-2 h-2 bg-daedalus-accent rounded-full animate-pulse" />
                <span className="animate-pulse">Executing...</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const getIcon = () => {
    const lang = artifact.language.toLowerCase();
    switch (lang) {
      case 'json': return <FileJson className="w-4 h-4" />;
      case 'css': return <Palette className="w-4 h-4" />;
      case 'html': return <Code2 className="w-4 h-4" />;
      case 'python': return <FileCode className="w-4 h-4 text-blue-400" />;
      case 'javascript':
      case 'typescript': return <FileCode className="w-4 h-4 text-yellow-400" />;
      case 'java': return <FileCode className="w-4 h-4 text-red-400" />;
      case 'julia': return <FileCode className="w-4 h-4 text-purple-400" />;
      case 'latex': return <FileText className="w-4 h-4 text-daedalus-accent" />;
      case 'markdown': return <FileText className="w-4 h-4" />;
      default: return <FileCode className="w-4 h-4" />;
    }
  };

  return (
    <div
      className={cn(
        "bg-daedalus-surface border-l border-daedalus-border flex flex-col shadow-2xl transition-all duration-300 overflow-hidden",
        isMaximized ? "fixed inset-0 z-[200] w-screen h-screen" : "relative w-full h-full"
      )}
    >
      {/* Header */}
      <div className="h-16 border-b border-daedalus-border flex items-center justify-between px-6 bg-daedalus-bg/50 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-daedalus-accent/10 flex items-center justify-center text-daedalus-accent">
            {getIcon()}
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight truncate max-w-[200px] md:max-w-xs">{artifact.title}</h3>
            <p className="text-[10px] font-mono text-daedalus-muted uppercase tracking-widest">
              v{artifact.version} • {artifact.language}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-white/5 rounded-lg p-1 mr-4 overflow-x-auto max-w-[200px] md:max-w-none no-scrollbar">
            <button
              onClick={() => setView('code')}
              className={cn(
                "px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded-md transition-all whitespace-nowrap",
                view === 'code' ? "bg-daedalus-accent text-daedalus-bg font-bold" : "text-daedalus-muted hover:text-daedalus-ink"
              )}
            >
              Code
            </button>
            <button
              onClick={() => setView('preview')}
              className={cn(
                "px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded-md transition-all whitespace-nowrap",
                view === 'preview' ? "bg-daedalus-accent text-daedalus-bg font-bold" : "text-daedalus-muted hover:text-daedalus-ink"
              )}
            >
              Preview
            </button>
            {artifact.type === 'code' && (
              <>
                <button
                  onClick={() => setView('optimize')}
                  className={cn(
                    "px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded-md transition-all whitespace-nowrap",
                    view === 'optimize' ? "bg-daedalus-accent text-daedalus-bg font-bold" : "text-daedalus-muted hover:text-daedalus-ink"
                  )}
                >
                  Optimize
                </button>
                <button
                  onClick={() => setView('tests')}
                  className={cn(
                    "px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded-md transition-all whitespace-nowrap",
                    view === 'tests' ? "bg-daedalus-accent text-daedalus-bg font-bold" : "text-daedalus-muted hover:text-daedalus-ink"
                  )}
                >
                  Tests
                </button>
              </>
            )}
          </div>

          <button 
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-2 text-daedalus-muted hover:text-daedalus-ink transition-colors hidden md:block"
          >
            {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button 
            onClick={onClose}
            className="p-2 text-daedalus-muted hover:text-red-400 transition-colors"
          >
            <div className="lg:hidden flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-xs font-mono uppercase tracking-widest">Back</span>
            </div>
            <X className="w-5 h-5 hidden lg:block" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {view === 'preview' ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full bg-daedalus-bg"
            >
              {renderPreview()}
            </motion.div>
          ) : view === 'optimize' ? (
            <motion.div
              key="optimize"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full p-8 overflow-auto space-y-6"
            >
              <div className="flex items-center gap-3 text-daedalus-accent mb-4">
                <Cpu className="w-5 h-5" />
                <h4 className="font-bold tracking-tight">Performance Analysis</h4>
              </div>
              <div className="space-y-4">
                <div className="glass-panel p-4 border-daedalus-accent/20">
                  <p className="text-xs font-mono text-daedalus-accent mb-2">OPTIMIZATION SUGGESTION #1</p>
                  <p className="text-sm text-daedalus-ink leading-relaxed">
                    Memory allocation in the main loop can be reduced by pre-allocating the buffer. 
                    Current implementation causes frequent GC cycles.
                  </p>
                </div>
                <div className="glass-panel p-4">
                  <p className="text-xs font-mono text-daedalus-muted mb-2">COMPLEXITY SCORE</p>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold">O(n log n)</span>
                    <span className="text-[10px] text-green-400 mb-1">Optimal for this use case</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : view === 'tests' ? (
            <motion.div
              key="tests"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full p-8 overflow-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3 text-daedalus-accent">
                  <ShieldCheck className="w-5 h-5" />
                  <h4 className="font-bold tracking-tight">Test Suite Synthesis</h4>
                </div>
                <button className="btn-primary py-1 px-4 text-xs">Run Tests</button>
              </div>
              
              <div className="space-y-3">
                {[
                  { name: "Initialization Test", status: "Passed", time: "12ms" },
                  { name: "Boundary Condition Check", status: "Passed", time: "45ms" },
                  { name: "Neural Link Integrity", status: "Passed", time: "8ms" },
                  { name: "Memory Leak Scan", status: "Passed", time: "120ms" }
                ].map((test, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-sm font-medium">{test.name}</span>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-mono text-daedalus-muted">
                      <span>{test.time}</span>
                      <span className="text-green-400 uppercase tracking-widest">{test.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="code"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full overflow-auto bg-[#1e1e1e]"
            >
              <SyntaxHighlighter
                language={artifact.language}
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  padding: '2rem',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  background: 'transparent',
                }}
                showLineNumbers
              >
                {artifact.content}
              </SyntaxHighlighter>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Actions */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-2">
          {view === 'preview' && !['html', 'svg', 'markdown', 'latex'].includes(artifact.type) && (
            <button 
              onClick={isRunning ? () => setIsRunning(false) : simulateExecution}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all active:scale-95",
                isRunning ? "bg-red-500 text-white" : "bg-daedalus-accent text-daedalus-bg"
              )}
              title={isRunning ? "Stop Execution" : "Run Script"}
            >
              {isRunning ? <Square className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
          )}
          <button 
            onClick={handleCopy}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-daedalus-ink flex items-center justify-center shadow-lg hover:scale-110 transition-all active:scale-95"
            title="Copy Code"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
          <button 
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-daedalus-ink flex items-center justify-center shadow-lg hover:scale-110 transition-all active:scale-95"
            title="Download"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="h-12 border-t border-daedalus-border bg-daedalus-bg/80 backdrop-blur-md px-6 flex items-center justify-between text-[10px] font-mono text-daedalus-muted uppercase tracking-widest shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <History className="w-3 h-3" />
            <span>Timeline:</span>
            <input 
              type="range" 
              min="1" 
              max={artifact.version} 
              value={currentVersion} 
              onChange={(e) => setCurrentVersion(parseInt(e.target.value))}
              className="w-24 accent-daedalus-accent h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-daedalus-accent">v{currentVersion}</span>
          </div>
          <span className="flex items-center gap-1"><Play className="w-3 h-3" /> Status: Compiled</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline">Or4cl3 Artifact Engine v1.0</span>
          <div className="w-px h-4 bg-white/10" />
          <span className="text-daedalus-accent">Optimized</span>
        </div>
      </div>
    </div>
  );
};
