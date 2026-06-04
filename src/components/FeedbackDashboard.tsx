import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GitBranch, 
  HelpCircle, 
  MessageSquare, 
  Settings, 
  Sliders, 
  ThumbsUp, 
  ThumbsDown, 
  CheckCircle,
  Lightbulb,
  Radio,
  RefreshCw,
  TrendingUp,
  Award
} from 'lucide-react';
import { UserFeedbackItem, AppState } from '../types';
import { cn } from '../utils/cn';

interface FeedbackDashboardProps {
  state: AppState;
  onAdjustParameters: (temperature: number, learningRate: number) => void;
  onSubmitCustomFeedback: (type: 'code' | 'architecture' | 'performance_analysis', comment: string, rating: 'up' | 'down') => void;
}

export const FeedbackDashboard: React.FC<FeedbackDashboardProps> = ({
  state,
  onAdjustParameters,
  onSubmitCustomFeedback
}) => {
  const [activeTab, setActiveTab] = useState<'monitor' | 'submit' | 'heuristics'>('monitor');
  const [comment, setComment] = useState('');
  const [type, setType] = useState<'code' | 'architecture' | 'performance_analysis'>('code');
  const [rating, setRating] = useState<'up' | 'down'>('up');
  const [simulating, setSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState('');

  const upvotes = state.feedbackList.filter(f => f.rating === 'up').length;
  const downvotes = state.feedbackList.filter(f => f.rating === 'down').length;
  const alignmentPercentage = upvotes + downvotes > 0 
    ? Math.round((upvotes / (upvotes + downvotes)) * 100) 
    : 100;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    setSimulating(true);
    setSimulationStep('Analyzing semantic token vectors...');
    
    // Simulate training loop step
    setTimeout(() => {
      setSimulationStep('Calibrating architectural weights...');
      setTimeout(() => {
        onSubmitCustomFeedback(type, comment, rating);
        setComment('');
        setSimulating(false);
        setSimulationStep('');
      }, 800);
    }, 800);
  };

  const getCategorizedCount = (catType: string) => {
    return state.feedbackList.filter(f => f.type === catType).length;
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Visual Header */}
      <div className="p-4 border-b border-white/5 bg-slate-950/20 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-[#00f2ff] animate-pulse" />
            <h2 className="text-xs font-mono font-bold tracking-widest text-[#00f2ff] uppercase">Feedback & Calibration Loop</h2>
          </div>
          <div className="px-2 py-0.5 rounded bg-[#00f2ff]/10 border border-[#00f2ff]/20 text-[9px] font-mono text-[#00f2ff] uppercase">
            Active SDLC Audit
          </div>
        </div>
        <p className="text-[10px] text-gray-400">
          Daedalus captures granular user feedback across structural domains, using recursive reinforcement to minimize biases and align generated targets.
        </p>
      </div>

      {/* Navigation Inside Dashboard */}
      <div className="flex border-b border-white/5 bg-black/40 p-1">
        <button
          onClick={() => setActiveTab('monitor')}
          className={cn(
            "flex-1 py-1.5 px-2 rounded text-[10px] font-mono uppercase tracking-wider transition-all",
            activeTab === 'monitor' ? "bg-[#00f2ff]/10 text-[#00f2ff] border border-[#00f2ff]/20" : "text-gray-400 hover:text-white"
          )}
        >
          Model Monitor
        </button>
        <button
          onClick={() => setActiveTab('submit')}
          className={cn(
            "flex-1 py-1.5 px-2 rounded text-[10px] font-mono uppercase tracking-wider transition-all",
            activeTab === 'submit' ? "bg-[#00f2ff]/10 text-[#00f2ff] border border-[#00f2ff]/20" : "text-gray-400 hover:text-white"
          )}
        >
          Inject Tuning
        </button>
        <button
          onClick={() => setActiveTab('heuristics')}
          className={cn(
            "flex-1 py-1.5 px-2 rounded text-[10px] font-mono uppercase tracking-wider transition-all",
            activeTab === 'heuristics' ? "bg-[#00f2ff]/10 text-[#00f2ff] border border-[#00f2ff]/20" : "text-gray-400 hover:text-white"
          )}
        >
          SDLC Settings
        </button>
      </div>

      {/* Main Tab Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence mode="wait">
          {activeTab === 'monitor' && (
            <motion.div
              key="monitor"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {/* Telemetry Grid */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-center relative overflow-hidden">
                  <div className="text-[10px] font-mono text-gray-400 uppercase">Alignment</div>
                  <div className="text-lg font-bold font-mono text-[#00f2ff]">{alignmentPercentage}%</div>
                  <TrendingUp className="w-2.5 h-2.5 text-[#00f2ff]/40 absolute bottom-1.5 right-1.5" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-center relative overflow-hidden">
                  <div className="text-[10px] font-mono text-gray-400 uppercase">Model Temp</div>
                  <div className="text-lg font-bold font-mono text-cyan-200">{state.temperature.toFixed(2)}</div>
                  <Sliders className="w-2.5 h-2.5 text-cyan-200/40 absolute bottom-1.5 right-1.5" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-center relative overflow-hidden">
                  <div className="text-[10px] font-mono text-gray-400 uppercase">RL Rate</div>
                  <div className="text-lg font-bold font-mono text-sky-400">{state.modelLearningRate.toFixed(3)}</div>
                  <CheckCircle className="w-2.5 h-2.5 text-sky-400/40 absolute bottom-1.5 right-1.5" />
                </div>
              </div>

              {/* Feedback Domain Breakdown */}
              <div className="p-3 bg-black/40 border border-white/10 rounded-lg space-y-2.5">
                <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
                  <h3 className="text-[10px] font-mono uppercase text-[#00f2ff] flex items-center gap-1.5">
                    <GitBranch className="w-3 h-3" /> Domain Weighting
                  </h3>
                  <span className="text-[9px] font-mono text-gray-400">Updated: Real-time</span>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-[10px] text-gray-300 font-mono mb-1">
                      <span>Code Correctness & Readability</span>
                      <span>{getCategorizedCount('code')} events</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: getCategorizedCount('code') > 0 ? '70%' : '30%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] text-gray-300 font-mono mb-1">
                      <span>Architecture Complexity & Coupling</span>
                      <span>{getCategorizedCount('architecture')} events</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#00f2ff] rounded-full" style={{ width: getCategorizedCount('architecture') > 0 ? '85%' : '40%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] text-gray-300 font-mono mb-1">
                      <span>Performance Efficiency Analyses</span>
                      <span>{getCategorizedCount('performance_analysis')} events</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: getCategorizedCount('performance_analysis') > 0 ? '60%' : '20%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Historical Updates Log */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-mono uppercase text-[#00f2ff] tracking-wider pl-1">Iterative Calibration Log</h4>
                <div className="space-y-2">
                  {state.feedbackList.length === 0 ? (
                    <div className="text-center py-6 text-[11px] text-gray-500 italic">
                      No calibration triggers registered. Give thumbs up/down to start training loop.
                    </div>
                  ) : (
                    state.feedbackList.map(item => (
                      <div key={item.id} className="p-2.5 rounded border border-white/5 bg-white/5 space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className={cn(
                            "px-1.5 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider font-bold",
                            item.type === 'code' ? "bg-emerald-500/10 text-emerald-400" :
                            item.type === 'architecture' ? "bg-cyan-500/10 text-cyan-400" :
                            "bg-purple-500/10 text-purple-400"
                          )}>
                            {item.type.replace('_', ' ')}
                          </span>
                          <span className="text-[8px] text-gray-500 font-mono">
                            {new Date(item.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-gray-300 italic text-[11px]">"{item.comment}"</p>
                        <div className="pt-1.5 border-t border-white/5 flex flex-wrap gap-1.5 items-center justify-between text-[8px] font-mono text-gray-400">
                          <span className="flex items-center gap-1">
                            {item.rating === 'up' ? <ThumbsUp className="w-2.5 h-2.5 text-emerald-500" /> : <ThumbsDown className="w-2.5 h-2.5 text-rose-500" />}
                            {item.rating === 'up' ? 'Reinforcing positive alignment' : 'Adjusting heuristic parameters'}
                          </span>
                          <span className="text-daedalus-accent">H-Cal: {item.adaptedParameters.structuralHeuristic}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'submit' && (
            <motion.div
              key="submit"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <form onSubmit={handleCustomSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1 pl-0.5">Focus Module</label>
                  <select
                    value={type}
                    onChange={(e: any) => setType(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#00f2ff]/60 font-mono"
                  >
                    <option value="code">Code Synthesis Logic</option>
                    <option value="architecture">Architectural System Layout</option>
                    <option value="performance_analysis">Performance Analytics Constraints</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1 pl-0.5">Heuristic Quality Rating</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setRating('up')}
                      className={cn(
                        "flex-1 p-2 rounded border transition-all flex items-center justify-center gap-2 text-xs",
                        rating === 'up' ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold" : "border-white/10 text-gray-400 hover:bg-white/5"
                      )}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" /> High Quality
                    </button>
                    <button
                      type="button"
                      onClick={() => setRating('down')}
                      className={cn(
                        "flex-1 p-2 rounded border transition-all flex items-center justify-center gap-2 text-xs",
                        rating === 'down' ? "bg-rose-500/10 border-rose-500 text-rose-400 font-bold" : "border-white/10 text-gray-400 hover:bg-white/5"
                      )}
                    >
                      <ThumbsDown className="w-3.5 h-3.5" /> Requires Alignment
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-mono uppercase text-gray-400 mb-1 pl-0.5">Calibration Instructions / Context</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="e.g. Needs cleaner asynchronous error routing; partition the neural data bus into separate event channels..."
                    className="w-full h-24 bg-slate-900 border border-white/10 rounded p-2.5 text-xs text-white outline-none focus:border-[#00f2ff]/60 resize-none font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={simulating || !comment.trim()}
                  className="w-full bg-[#00f2ff] hover:bg-[#00f2ff]/90 disabled:bg-white/10 disabled:text-gray-400 text-black font-semibold text-xs uppercase py-2.5 rounded flex items-center justify-center gap-2 transition-all shadow-[0_0_12px_rgba(0,242,255,0.25)]"
                >
                  {simulating ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      {simulationStep}
                    </>
                  ) : (
                    <>
                      <Sliders className="w-3.5 h-3.5" /> Submit & Initiate Tuning
                    </>
                  )}
                </button>
              </form>

              {/* Real-time simulation info card */}
              <div className="p-3 rounded border border-white/10 bg-slate-950/40 text-[11px] text-gray-400 leading-relaxed font-mono">
                <span className="text-[#00f2ff] font-bold">STOCHASTIC ENGINE AT WORK:</span> Your comments are routed directly to the system's temperature scheduler and instruction vectors. This modifies how tomorrow's designs are contextualized and parsed.
              </div>
            </motion.div>
          )}

          {activeTab === 'heuristics' && (
            <motion.div
              key="heuristics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono uppercase text-gray-300 pl-0.5">Model Temperature</span>
                  <span className="text-[10px] font-mono text-[#00f2ff] font-bold">{state.temperature.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.5"
                  step="0.05"
                  value={state.temperature}
                  onChange={(e) => onAdjustParameters(parseFloat(e.target.value), state.modelLearningRate)}
                  className="w-full accent-[#00f2ff]"
                />
                <div className="flex justify-between text-[8px] font-mono text-gray-600">
                  <span>DETERMINISTIC</span>
                  <span>BALANCED</span>
                  <span>STOCHASTIC</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono uppercase text-gray-300 pl-0.5">Iterative Learning Rate</span>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">{state.modelLearningRate.toFixed(3)}</span>
                </div>
                <input
                  type="range"
                  min="0.001"
                  max="0.5"
                  step="0.005"
                  value={state.modelLearningRate}
                  onChange={(e) => onAdjustParameters(state.temperature, parseFloat(e.target.value))}
                  className="w-full accent-cyan-400"
                />
                <div className="flex justify-between text-[8px] font-mono text-gray-600">
                  <span>STABLE REINFORCEMENT</span>
                  <span>AGILE METASTABILITY</span>
                </div>
              </div>

              <div className="p-3 bg-white/5 border border-white/10 rounded-lg space-y-2">
                <span className="text-[10px] font-mono text-[#00f2ff] uppercase flex items-center gap-1.5 font-bold">
                  <Award className="w-3.5 h-3.5" /> Ethical Safeguards
                </span>
                <p className="text-[10px] text-gray-300 leading-relaxed font-mono">
                  Ethics checks are applied deterministically to all artifacts. If safety thresholds fall below 99.4%, a force-tune protocol adjusts parameters downstream.
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-green-400 bg-green-500/10 border border-green-500/20 p-1.5 rounded">
                  <span className="flex items-center gap-1">✔ COMPLIANCE CHECKS ONLINE</span>
                  <span>99.8% CONFIDENCE</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
