import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Undo2, 
  Redo2, 
  Send, 
  Sparkles, 
  Terminal, 
  Layers, 
  ShieldCheck, 
  Activity,
  Plus,
  Trash2,
  Code,
  ThumbsUp,
  ThumbsDown,
  Info,
  Menu,
  X,
  Sliders,
  Award,
  BookOpen,
  CheckCircle,
  HelpCircle,
  User,
  Zap,
  RotateCcw,
  Maximize2,
  Users,
  Wifi,
  WifiOff
} from 'lucide-react';
import { cn } from './utils/cn';
import { Message, Artifact, UserFeedbackItem, AppState, Collaborator } from './types';
import { LandingPage } from './components/LandingPage';
import { LoadingScreen } from './components/LoadingScreen';
import { OnboardingTour } from './components/OnboardingTour';
import { FeedbackDashboard } from './components/FeedbackDashboard';
import { Tooltip } from './components/ui/Tooltip';
import { generateDaedalusResponse } from './utils/daedalusBrain';

// Helper for initial states
const INITIAL_MESSAGES: Message[] = [
  { 
    id: 'm1', 
    role: 'model', 
    content: "Neural link established. Or4cl3 architecture synthesis engine active. Submit your system requirement to begin.", 
    timestamp: new Date() 
  }
];

const INITIAL_ARTIFACTS: Artifact[] = [
  {
    id: 'art-001',
    type: 'code',
    title: 'auth-middleware.ts',
    content: `// Or4cl3 Generative Guard Module\n// Real-time Bias and PII Scrubber\n\nexport const sanitizeRequest = (payload: Record<string, any>) => {\n  const piiPatterns = [/\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b/g];\n  let stringified = JSON.stringify(payload);\n  \n  piiPatterns.forEach(pattern => {\n    stringified = stringified.replace(pattern, "[MASKED_PII_PROTECTED]");\n  });\n  \n  return JSON.parse(stringified);\n};`,
    updatedAt: new Date(),
    architectureDetails: {
      pattern: "Guard Ring Architecture (Zero Trust)",
      complexity: "Medium",
      scalingTarget: "10k req/sec"
    },
    performanceStats: {
      cpuCost: "0.14 ms / pass",
      memoryFootprint: "12 KB stack Allocation",
      efficiencyGains: "99.4%"
    }
  },
  {
    id: 'art-002',
    type: 'doc',
    title: 'architecture-proposal.md',
    content: `# Daedalus High-Level System Architecture Proposal\n\n## 1. Monolithic vs. Microservices Approach\nWe propose an **Event-Driven Modular Monolith** for the rapid initial phase, transition-ready for fine-grained **Microservices** on high-frequency bounds. This guarantees near-zero integration latency early on while maintaining clear domain boundaries (Auth, Synthesis, Sync, Deflation) that can be easily split into independent serverless containers later.\n\n## 2. Key Database Selections\n- **Primary Operational DB**: **PostgreSQL** running on Cloud SQL for highly secure, schema-enforced relational mapping of user checkpoints and audit histories.\n- **Cache & Real-time Stream Engine**: **Redis** to broker transient multi-user live cursors, WebSocket heartbeat pools, and distributed pub-sub event flags.\n\n## 3. Tech Stack Matrix\n- **Client Workspace**: React + Vite (TS), styled with fluid tailwind layers and powered by \`motion\` layouts.\n- **Backend Routing Layer**: TypeScript Node/Express handling lazy client initializations and WebSocket multiplexing.\n- **Sovereign Brain**: Modern Gemini @google/genai SDK (server-side proxy) with granular prompt-bias scrubbing layers.\n\n## 4. Integrated Ethical AI Development\n- **Real-time Bias Scrubbing**: Bi-directional token deflection matching known stereotypes or non-accessible layout recommendations.\n- **Algorithmic Bias Deflation (ABD)**: Active workspace metric rating components on accessibility compliance before rendering.\n- **Human-Oversight Lock**: Explicit user authorization bounds required before code edits can be merged or executed.`,
    updatedAt: new Date(),
    architectureDetails: {
      pattern: "Event-Driven Modular Monolith",
      complexity: "Medium",
      scalingTarget: "Unified State Core"
    },
    performanceStats: {
      cpuCost: "Stateless parsing (~0.05ms)",
      memoryFootprint: "20KB document manifest",
      efficiencyGains: "100.0%"
    }
  },
  {
    id: 'art-003',
    type: 'code',
    title: 'realtime-sync-engine.ts',
    content: `// Daedalus Thread Sync & Bias Deflation Orchestrator\n// Core Prototype Demonstration Module\n\ninterface SyncPayload {\n  sessionId: string;\n  caretCoordinates: { x: number; y: number };\n  activeArtifactId: string;\n  injectedTokens: string[];\n}\n\nexport class DaedalusSyncCore {\n  private clientsMap: Map<string, SyncPayload> = new Map();\n  private confScore: number = 99.8;\n\n  constructor(initialConfidence: number) {\n    this.confScore = initialConfidence;\n  }\n\n  /**\n   * Broadcast client pointer activity while deflating potential bias traces\n   */\n  public registerSessionInteraction(sessionId: string, data: SyncPayload): { status: string; score: number } {\n    // Scrub input trace tokens of non-optimal context\n    const secureTokens = data.injectedTokens.filter(tok => !tok.startsWith("__bad_"));\n    \n    this.clientsMap.set(sessionId, {\n      ...data,\n      injectedTokens: secureTokens\n    });\n\n    return {\n      status: "Session synched securely",\n      score: this.confScore\n    };\n  }\n\n  /**\n   * Gather live collaborators mapping\n   */\n  public getActivePeersCount(): number {\n    return this.clientsMap.size;\n  }\n}`,
    updatedAt: new Date(),
    architectureDetails: {
      pattern: "State Mutex Broker Hub",
      complexity: "Complex",
      scalingTarget: "50k interactive sockets"
    },
    performanceStats: {
      cpuCost: "0.08 ms thread cycle",
      memoryFootprint: "8.5 KB instance threshold",
      efficiencyGains: "98.7%"
    }
  },
  {
    id: 'art-004',
    type: 'doc',
    title: 'requirements-worksheet.md',
    content: `# Project Initiation & Requirements Gathering Worksheet\n\nTo align our synthesis engine cleanly to your vision, please review and address these strategic queries:\n\n### 💬 Core Clarifying Questions\n1. **What is the central problem statement** you are seeking to solve? Is it workflow drag, cognitive overloading, or high coordination tax?\n2. **Who is your primary target user segment**? (e.g., senior cloud architects, junior frontend devs, general non-technical stakeholders?)\n3. **What is the definitive metric of success** for the MVP? Is it speed of artifact generation, or high precision in compliance checks?\n\n### 📋 Draft Project Scope (Dynamic Base Temp)\n- **MVP Core Goals**: Real-time canvas editing workspace with multi-user cursor awareness.\n- **Interface Deliverables**: Fluent single-screen workspace, low-latency telemetry rail, feedback calibration hub.\n- **Out-of-Scope**: Multi-region cluster failovers and custom LLM model fine-tuning (reserved for Version 2).`,
    updatedAt: new Date(),
    architectureDetails: {
      pattern: "Interactive Discovery Model",
      complexity: "Simple",
      scalingTarget: "Stakeholder Alignment"
    },
    performanceStats: {
      cpuCost: "Manual questionnaire entry",
      memoryFootprint: "5KB worksheet standard",
      efficiencyGains: "95.0%"
    }
  }
];

const INITIAL_FEEDBACK: UserFeedbackItem[] = [
  {
    id: 'f-init',
    targetId: 'art-001',
    targetTitle: 'auth-middleware.ts',
    type: 'code',
    rating: 'up',
    category: 'Readability',
    comment: 'PII scrubbing is secure. Ideal regex choice.',
    timestamp: new Date(),
    processed: true,
    adaptedParameters: {
      temperatureAdjustment: -0.05,
      structuralHeuristic: "Secure Regex Guarding",
      optimizationsInjected: ["PII scrubbing automation", "Strict token sanitization"]
    }
  }
];

const DEFAULT_STATE: AppState = {
  messages: INITIAL_MESSAGES,
  artifacts: INITIAL_ARTIFACTS,
  activeArtifactId: 'art-002',
  feedbackList: INITIAL_FEEDBACK,
  modelLearningRate: 0.050,
  temperature: 0.70,
  biasConfidenceScore: 99.8
};

// History Hook for robust interactive undo/redo
function useHistoryState(initialState: AppState) {
  const [historyState, setHistoryState] = useState<{
    history: AppState[];
    currentIndex: number;
  }>({
    history: [initialState],
    currentIndex: 0
  });

  const pushState = useCallback((newState: AppState) => {
    setHistoryState(prev => {
      const { history: prevHistory, currentIndex: prevIndex } = prev;
      const newHistory = prevHistory.slice(0, prevIndex + 1);
      return {
        history: [...newHistory, newState],
        currentIndex: prevIndex + 1
      };
    });
  }, []);

  const overwriteState = useCallback((newState: AppState) => {
    setHistoryState(prev => {
      const { history: prevHistory, currentIndex: prevIndex } = prev;
      const newHistory = [...prevHistory];
      newHistory[prevIndex] = newState;
      return {
        ...prev,
        history: newHistory
      };
    });
  }, []);

  const undo = useCallback(() => {
    setHistoryState(prev => {
      const { history: prevHistory, currentIndex: prevIndex } = prev;
      if (prevIndex > 0) {
        return {
          history: prevHistory,
          currentIndex: prevIndex - 1
        };
      }
      return prev;
    });
  }, []);

  const redo = useCallback(() => {
    setHistoryState(prev => {
      const { history: prevHistory, currentIndex: prevIndex } = prev;
      if (prevIndex < prevHistory.length - 1) {
        return {
          history: prevHistory,
          currentIndex: prevIndex + 1
        };
      }
      return prev;
    });
  }, []);

  const activeState = historyState.history[historyState.currentIndex] || historyState.history[historyState.history.length - 1] || initialState;

  return {
    state: activeState,
    pushState,
    overwriteState,
    undo,
    redo,
    canUndo: historyState.currentIndex > 0,
    canRedo: historyState.currentIndex < historyState.history.length - 1
  };
}

const generateUserSession = () => {
  const adjectives = ["Hex", "Cyber", "Quantum", "Hyper", "Vortex", "Matrix", "Aero", "Pixel", "Cosmic", "Synth"];
  const nouns = ["Daedalist", "Oraclist", "Dev", "Node", "Architect", "Validator", "Peer", "Engine", "Mesh", "Coder"];
  const colors = ["#00f2ff", "#ff007f", "#39ff14", "#ffaa00", "#bd00ff", "#00ffcc", "#ff003c", "#ecef1a"];
  
  const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const id = 'user-' + Math.random().toString(36).substring(2, 9);
  
  return {
    id,
    name: `${randomAdj} ${randomNoun}`,
    color: randomColor
  };
};

export default function App() {
  const [appScreen, setAppScreen] = useState<'landing' | 'loading' | 'dashboard'>('landing');
  const [showTour, setShowTour] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Controls the active Ethics Guide dialog modal
  const [mobileTab, setMobileTab] = useState<'chat' | 'workspace' | 'calibration'>('chat');
  const [feedbackOverlayOpen, setFeedbackOverlayOpen] = useState<string | null>(null); // target ID
  const [customComment, setCustomComment] = useState('');
  const [interactiveTips, setInteractiveTips] = useState<string[]>([]);

  // Interactive Ethics Parameters
  const [biasMitigationLevel, setBiasMitigationLevel] = useState<number>(98);
  const [secretsScrubEnabled, setSecretsScrubEnabled] = useState<boolean>(true);
  const [humanOversightLock, setHumanOversightLock] = useState<boolean>(true);

  // Local state with History
  const { state, pushState, overwriteState, undo, redo, canUndo, canRedo } = useHistoryState(DEFAULT_STATE);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Collaboration State and network bindings
  const [localUser] = useState(() => generateUserSession());
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');
  const [isSimulatingPeer, setIsSimulatingPeer] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const isRemoteUpdate = useRef<boolean>(false);
  const simWsRef = useRef<WebSocket | null>(null);
  const simIntervalRef = useRef<any>(null);

  // Central state synchronization wrapper propagating client actions cleanly to WebSocket and local history
  const syncState = useCallback((newState: AppState, isPush = true) => {
    if (isPush) {
      pushState(newState);
    } else {
      overwriteState(newState);
    }

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN && !isRemoteUpdate.current) {
      wsRef.current.send(JSON.stringify({
        type: "state_update",
        payload: newState
      }));
    }
  }, [pushState, overwriteState]);

  // Connection Hook establishing real active WebSocket to our Express server
  useEffect(() => {
    let ws: WebSocket | null = null;
    let reconnectTimeout: any = null;

    const connect = () => {
      setConnectionStatus("connecting");
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      // Ensure the socket uses our specified isolated collaborative channel route
      const socketUrl = `${protocol}//${window.location.host}/ws/collaboration`;

      ws = new WebSocket(socketUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        setConnectionStatus("connected");
        addTip("Established real-time collaborative workspace connection!");
        ws?.send(JSON.stringify({
          type: "join",
          payload: localUser
        }));
      };

      ws.onmessage = (event) => {
        try {
          const decoded = JSON.parse(event.data);
          const { type, payload } = decoded;

          switch (type) {
            case "init": {
              const { state: serverState, collaborators: activeCollabs } = payload;
              isRemoteUpdate.current = true;
              overwriteState(serverState);
              // Store all other active collaborators (excluding ourselves)
              setCollaborators(activeCollabs.filter((c: any) => c.id !== localUser.id));
              setTimeout(() => {
                isRemoteUpdate.current = false;
              }, 50);
              break;
            }

            case "user_joined": {
              setCollaborators(prev => {
                if (prev.some(c => c.id === payload.id)) return prev;
                return [...prev, payload];
              });
              addTip(`Collaborator '${payload.name}' connected in real-time.`);
              break;
            }

            case "user_left": {
              setCollaborators(prev => prev.filter(c => c.id !== payload.id));
              addTip("A collaborator disconnected.");
              break;
            }

            case "state_update": {
              isRemoteUpdate.current = true;
              overwriteState(payload);
              setTimeout(() => {
                isRemoteUpdate.current = false;
              }, 50);
              break;
            }

            case "cursor_update": {
              setCollaborators(prev => prev.map(c => {
                if (c.id === payload.id) {
                  return {
                    ...c,
                    cursor: payload.cursor,
                    activeArtifactId: payload.activeArtifactId
                  };
                }
                return c;
              }));
              break;
            }

            default:
              break;
          }
        } catch (err) {
          console.error("Client received corrupted frame:", err);
        }
      };

      ws.onerror = () => {
        setConnectionStatus("disconnected");
      };

      ws.onclose = () => {
        setConnectionStatus("disconnected");
        reconnectTimeout = setTimeout(connect, 3000);
      };
    };

    connect();

    return () => {
      if (ws) {
        ws.close();
      }
      clearTimeout(reconnectTimeout);
    };
  }, [localUser, overwriteState]);

  // Secondary simulated peer that connects its own independent WebSocket
  const startSimulatedPeer = () => {
    setIsSimulatingPeer(true);
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const socketUrl = `${protocol}//${window.location.host}/ws/collaboration`;
    
    const simWs = new WebSocket(socketUrl);
    simWsRef.current = simWs;

    simWs.onopen = () => {
      // Connect our second simulated socket as "Quantum Copilot 🤖"
      simWs.send(JSON.stringify({
        type: "join",
        payload: {
          id: "user-sim-copilot",
          name: "Quantum Copilot 🤖",
          color: "#ff007f",
          isSimulated: true
        }
      }));
    };

    let px = 180;
    let py = 140;
    let angle = 0;
    let snippetStep = 0;

    const snippets = [
      "\n// Synergy established. Synchronizing dynamic thread buffers...",
      "\nexport function handleElasticSync<T>(payload: T): T {\n  return payload; \n}",
      "\n// Scanning cloud runtime bounds... PII Scrub completed successfully.",
      "\n// Latency optimal. Active peer synchronization aligned."
    ];

    simIntervalRef.current = setInterval(() => {
      if (simWs.readyState !== WebSocket.OPEN) return;

      // 1. Move pointer smoothly on the virtual canvas
      angle += 0.3;
      px = 250 + Math.cos(angle) * 120 + Math.sin(angle * 0.7) * 40;
      py = 180 + Math.sin(angle) * 90 + Math.cos(angle * 1.3) * 30;

      simWs.send(JSON.stringify({
        type: "cursor_move",
        payload: {
          cursor: { x: Math.round(px), y: Math.round(py) },
          activeArtifactId: state.activeArtifactId
        }
      }));

      // 2. Occasionally simulate live edits into the active artifact
      if (Math.random() < 0.25 && state.activeArtifactId) {
        const activeArt = state.artifacts.find(a => a.id === state.activeArtifactId);
        if (activeArt) {
          const block = snippets[snippetStep % snippets.length];
          const newContent = activeArt.content + block;
          
          const updated = state.artifacts.map(art => 
            art.id === activeArt.id ? { ...art, content: newContent, updatedAt: new Date() } : art
          );

          simWs.send(JSON.stringify({
            type: "state_update",
            payload: {
              ...state,
              artifacts: updated
            }
          }));

          snippetStep++;
        }
      }
    }, 800);
  };

  const stopSimulatedPeer = () => {
    setIsSimulatingPeer(false);
    if (simWsRef.current) {
      simWsRef.current.close();
      simWsRef.current = null;
    }
    if (simIntervalRef.current) {
      clearInterval(simIntervalRef.current);
      simIntervalRef.current = null;
    }
  };

  // Handle send prompt
  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || isTyping) return;

    const newMessage: Message = {
      id: 'm-' + Math.random().toString(36).substr(2, 9),
      role: 'user',
      content: inputText,
      timestamp: new Date()
    };

    const newState: AppState = {
      ...state,
      messages: [...state.messages, newMessage]
    };

    syncState(newState, true);
    setInputText('');
    
    addTip(`User sent command. History checkpoints updated to: ${state.messages.length + 1}`);

    // Determine if they are asking to generate/create/build/make/produce an artifact/blueprint/file, or if it is a general question
    const isRequestingArtifact = /(?:create|generate|build|write|make|synthesize|produce|materialize|design)\s+(?:an?\s+)?(?:artifact|file|blueprint|template|code|script|routine|doc|manifest|schema)/i.test(newMessage.content) || 
                                 /^(?:create|generate|build|write|make|synthesize|produce|materialize|design|add)\b/i.test(newMessage.content);
    
    if (!isRequestingArtifact) {
      setIsTyping(true);
      try {
        const response = await fetch("/api/daedalus/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: newState.messages,
            biasMitigationLevel
          })
        });

        if (!response.ok) {
          throw new Error("API server returned failure status");
        }
        
        const data = await response.json();
        
        const modelResponse: Message = {
          id: 'm-' + Math.random().toString(36).substr(2, 9),
          role: 'model',
          content: data.content,
          timestamp: new Date()
        };

        syncState({
          ...newState,
          messages: [...newState.messages, modelResponse]
        }, true);

        addTip(data.tip || "Direct neural link response generated.");
      } catch (err: any) {
        console.warn("API router fallback activated:", err);
        // Seamless fallback to our local conversational builder engine
        const { content: fbContent, tip: fbTip } = generateDaedalusResponse(newMessage.content, biasMitigationLevel);

        const modelResponse: Message = {
          id: 'm-' + Math.random().toString(36).substr(2, 9),
          role: 'model',
          content: fbContent,
          timestamp: new Date()
        };

        syncState({
          ...newState,
          messages: [...newState.messages, modelResponse]
        }, true);

        addTip(`${fbTip} [Offline Router]`);
      } finally {
        setIsTyping(false);
      }
    } else {
      // Synthesize an artifact
      setIsTyping(true);
      setTimeout(() => {
        const hasCodeTrigger = /code|react|npm|ts|function|middleware/i.test(newMessage.content);
        const randomId = 'art-' + Math.random().toString(36).substr(2, 9);
        
        const newArtifact: Artifact = hasCodeTrigger ? {
          id: randomId,
          type: 'code',
          title: `${newMessage.content.split(' ').slice(1, 4).join('-').toLowerCase() || 'module'}.ts`,
          content: `// Synthesized code for target concept: ${newMessage.content}\n\nexport const initializedService = () => {\n  console.log("Service initializing recursively...");\n  return {\n    activated: true,\n    token: "${Math.random().toString(36).substr(2, 10)}"\n  };\n};`,
          updatedAt: new Date(),
          architectureDetails: {
            pattern: "Event-Driven micro-module",
            complexity: "Low",
            scalingTarget: "50k dynamic events"
          },
          performanceStats: {
            cpuCost: "0.08 ms",
            memoryFootprint: "8 KB heap allocation",
            efficiencyGains: "99.9%"
          }
        } : {
          id: randomId,
          type: 'doc',
          title: `${newMessage.content.split(' ').slice(1, 4).join('-').toLowerCase() || 'manifest'}-manifest.md`,
          content: `# Architectural Manifest: ${newMessage.content}\n\n1. Overview: Modular design supporting decentralized nodes.\n2. Pattern: Event Pub/Sub pipeline using a stateless zero-overhead layout.\n3. Security: Encrypted channels running validation layers on client interfaces and secure database middleware.`,
          updatedAt: new Date(),
          architectureDetails: {
            pattern: "Stateless decoupled pipeline",
            complexity: "Medium",
            scalingTarget: "Unlimited horizontal pods"
          },
          performanceStats: {
            cpuCost: "Zero structural processing cost",
            memoryFootprint: "0 bytes system footprint",
            efficiencyGains: "98.7% readability"
          }
        };

        const modelResponse: Message = {
          id: 'm-' + Math.random().toString(36).substr(2, 9),
          role: 'model',
          content: `Synthesis complete. Materialized artifact '${newArtifact.title}' matching specifications. Adjust quality rating or inject tuning feedback below.`,
          timestamp: new Date()
        };

        syncState({
          ...newState,
          messages: [...newState.messages, modelResponse],
          artifacts: [...newState.artifacts, newArtifact],
          activeArtifactId: newArtifact.id
        }, true);

        addTip(`Daedalus synthesized '${newArtifact.title}'. Action checkpoints recorded.`);
        setIsTyping(false);
      }, 1200);
    }
  };

  const handleUpdateArtifactText = (id: string, newContent: string) => {
    const updatedArtifacts = state.artifacts.map(art => 
      art.id === id ? { ...art, content: newContent, updatedAt: new Date() } : art
    );
    syncState({
      ...state,
      artifacts: updatedArtifacts
    }, false);
  };

  const handleCreateEmptyArtifact = () => {
    const defaultId = 'art-' + Math.random().toString(36).substr(2, 9);
    const emptyArtifact: Artifact = {
      id: defaultId,
      type: 'code',
      title: 'unnamed-routine.ts',
      content: '// Manifested raw system logic block\nexport const main = () => {\n  return "online";\n};',
      updatedAt: new Date(),
      architectureDetails: {
        pattern: "Undefined Modular",
        complexity: "Low",
        scalingTarget: "Raw sequence execution"
      },
      performanceStats: {
        cpuCost: "0.01 ms runtime",
        memoryFootprint: "2 KB core allocation",
        efficiencyGains: "100%"
      }
    };

    syncState({
      ...state,
      artifacts: [...state.artifacts, emptyArtifact],
      activeArtifactId: defaultId
    }, true);
    addTip(`Manually generated empty routine template`);
  };

  const handleDeleteArtifact = (id: string) => {
    const filtered = state.artifacts.filter(a => a.id !== id);
    const nextActive = filtered[0]?.id || null;
    syncState({
      ...state,
      artifacts: filtered,
      activeArtifactId: nextActive
    }, true);
    addTip(`Purged system artifact: ${id}`);
  };

  // Adjust parameters manually via calibration settings
  const handleAdjustParameters = (t: number, lr: number) => {
    syncState({
      ...state,
      temperature: t,
      modelLearningRate: lr
    }, true);
  };

  // Up/down rates directly on code components or response bubbles
  const handleRateArtifact = (id: string, rate: 'up' | 'down') => {
    const art = state.artifacts.find(a => a.id === id);
    if (!art) return;

    if (rate === 'up') {
      // Direct upvote reinforcement
      const feedbackItem: UserFeedbackItem = {
        id: 'f-' + Math.random().toString(36).substr(2, 9),
        targetId: art.id,
        targetTitle: art.title,
        type: art.type === 'doc' ? 'architecture' : 'code',
        rating: 'up',
        category: 'Adaptive Compliance',
        comment: `Excellent design matches core goals.`,
        timestamp: new Date(),
        processed: true,
        adaptedParameters: {
          temperatureAdjustment: -0.01,
          structuralHeuristic: "Compliant alignment confirmation",
          optimizationsInjected: ["Correctness reinforcement"]
        }
      };

      syncState({
        ...state,
        feedbackList: [feedbackItem, ...state.feedbackList],
        temperature: Math.max(0.1, state.temperature - 0.01)
      }, true);
      addTip(`Positively reinforced '${art.title}' parameter matrix`);
    } else {
      // Trigger prompt input for precise comments
      setFeedbackOverlayOpen(id);
    }
  };

  // Submit negative tuning details
  const handleSubmitTuningDetails = (id: string, opinion: string) => {
    const art = state.artifacts.find(a => a.id === id);
    const title = art ? art.title : "Contextual prompt stream";
    const type = art ? (art.type === 'doc' ? 'architecture' : 'code') : 'code';

    const feedbackItem: UserFeedbackItem = {
      id: 'f-' + Math.random().toString(36).substr(2, 9),
      targetId: id,
      targetTitle: title,
      type: type as any,
      rating: 'down',
      category: 'Correctness Correction',
      comment: opinion,
      timestamp: new Date(),
      processed: true,
      adaptedParameters: {
        temperatureAdjustment: 0.05,
        structuralHeuristic: "Refining strict bounds templates",
        optimizationsInjected: ["Safety assertions", opinion]
      }
    };

    syncState({
      ...state,
      feedbackList: [feedbackItem, ...state.feedbackList],
      temperature: Math.min(1.5, state.temperature + 0.02)
    }, true);
    setFeedbackOverlayOpen(null);
    setCustomComment('');
    addTip(`Calibrated model weights parameters dynamically: ${opinion.slice(0, 30)}...`);
  };

  const onSubmitCustomFeedback = (type: 'code' | 'architecture' | 'performance_analysis', comment: string, rating: 'up' | 'down') => {
    const feedbackItem: UserFeedbackItem = {
      id: 'f-' + Math.random().toString(36).substr(2, 9),
      targetId: 'custom-injector',
      targetTitle: 'Real-time Injector',
      type: type,
      rating: rating,
      category: rating === 'up' ? 'Reinforcement' : 'Constraint Offset',
      comment: comment,
      timestamp: new Date(),
      processed: true,
      adaptedParameters: {
        temperatureAdjustment: rating === 'up' ? -0.02 : 0.05,
        structuralHeuristic: rating === 'up' ? "Positive Alignment Sync" : "Robust Constraints Offset",
        optimizationsInjected: [comment]
      }
    };

    syncState({
      ...state,
      feedbackList: [feedbackItem, ...state.feedbackList],
      temperature: rating === 'up' ? Math.max(0.1, state.temperature - 0.02) : Math.min(1.5, state.temperature + 0.03)
    }, true);
    addTip(`Injected calibration token event: ${comment.slice(0, 30)}...`);
  };

  const addTip = (msg: string) => {
    setInteractiveTips(prev => [...prev.slice(-4), msg]);
  };

  const activeArtifact = state.artifacts.find(a => a.id === state.activeArtifactId);

  // Auto show onboarding after loading completes
  const handleLoadingComplete = () => {
    setAppScreen('dashboard');
    setTimeout(() => {
      setShowTour(true);
    }, 1000);
  };

  return (
    <div className="h-[100dvh] w-full bg-[#050510] text-[#e2e8f0] relative flex flex-col font-sans overflow-hidden">
      <AnimatePresence mode="wait">
        {appScreen === 'landing' && (
          <motion.div key="landing-screen" className="w-full h-full z-50 flex flex-col overflow-y-auto">
            <LandingPage onEnter={() => setAppScreen('loading')} />
          </motion.div>
        )}

        {appScreen === 'loading' && (
          <motion.div key="loading-screen" className="w-full h-full z-50 flex flex-col overflow-y-auto">
            <LoadingScreen onComplete={handleLoadingComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="scanline" />

      {/* Onboarding checklist */}
      {showTour && <OnboardingTour onComplete={() => setShowTour(false)} />}

      {/* Main Dashboard Panel */}
      <div className={cn(
        "flex-1 flex flex-col md:flex-row h-full w-full overflow-hidden md:p-3 p-2 gap-3 min-h-0",
        appScreen !== 'dashboard' && "hidden"
      )}>
        
        {/* Mobile Navigation Header */}
        <div className="md:hidden flex items-center justify-between p-3 glass-panel border-[#00f2ff]/20 bg-[#080b15]/95 w-full z-30">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#00f2ff] animate-pulse" />
            <span className="font-mono text-xs tracking-wider font-extrabold uppercase text-white">Daedalus AI</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Direct mobile history tools */}
            <button 
              onClick={undo} 
              disabled={!canUndo}
              className="p-1.5 rounded bg-white/5 text-[#e0e0e0] border border-white/15 disabled:opacity-20"
              title="Undo Checkpoint"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button 
              onClick={redo} 
              disabled={!canRedo}
              className="p-1.5 rounded bg-white/5 text-[#e0e0e0] border border-white/15 disabled:opacity-20"
              title="Redo Checkpoint"
            >
              <Redo2 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "p-2 bg-white/5 rounded text-[#00f2ff] border border-[#00f2ff]/20 animate-pulse transition-all",
                mobileMenuOpen && "bg-[#00f2ff]/25 border-[#00f2ff]/55"
              )}
              title="Ethical Safeguards Matrix"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile View Toggle Segment */}
        <div className="md:hidden flex bg-slate-950/85 border border-white/5 rounded-xl p-1 gap-1 w-full z-15 select-none">
          <button 
            onClick={() => setMobileTab('chat')}
            className={cn(
              "flex-1 py-2 text-[10px] uppercase font-mono rounded-lg tracking-wider transition-all border",
              mobileTab === 'chat' 
                ? "bg-[#00f2ff]/10 text-[#00f2ff] border-[#00f2ff]/30 font-extrabold shadow-[0_0_8px_rgba(0,242,255,0.05)]" 
                : "text-gray-400 hover:text-white border-transparent"
            )}
          >
            Chats
          </button>
          <button 
            onClick={() => setMobileTab('workspace')}
            className={cn(
              "flex-1 py-2 text-[10px] uppercase font-mono rounded-lg tracking-wider transition-all border",
              mobileTab === 'workspace' 
                ? "bg-[#00f2ff]/10 text-[#00f2ff] border-[#00f2ff]/30 font-extrabold shadow-[0_0_8px_rgba(0,242,255,0.05)]" 
                : "text-gray-400 hover:text-white border-transparent"
            )}
          >
            Blueprints
          </button>
          <button 
            onClick={() => setMobileTab('calibration')}
            className={cn(
              "flex-1 py-2 text-[10px] uppercase font-mono rounded-lg tracking-wider transition-all border",
              mobileTab === 'calibration' 
                ? "bg-[#00f2ff]/10 text-[#00f2ff] border-[#00f2ff]/30 font-extrabold shadow-[0_0_8px_rgba(0,242,255,0.05)]" 
                : "text-gray-400 hover:text-white border-transparent"
            )}
          >
            Telemetry
          </button>
        </div>

        {/* LEFT COMPONENT COLUMN: Chat & Commands Interface */}
        <aside id="tour-chat" className={cn(
          "w-full md:w-[350px] lg:w-[400px] flex flex-col gap-3 transition-all duration-300 md:relative p-1 md:p-0 flex-1 min-h-0 md:flex-initial md:h-full",
          mobileTab === 'chat' ? "flex" : "hidden md:flex"
        )}>
          {/* Dashboard Header Bar */}
          <header className="hidden md:flex glass-panel p-4 items-center justify-between border-white/5 z-10 w-full">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded bg-[#00f2ff] flex items-center justify-center shadow-[0_0_10px_rgba(0,242,255,0.3)]">
                <Sparkles className="w-4 h-4 text-black animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold tracking-tighter uppercase text-white">Daedalus</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="text-[9px] text-gray-500 font-mono tracking-widest uppercase">Adaptive R&D System</div>
              </div>
            </div>

            {/* Global History Undo/Redo tools & Safety launcher */}
            <div id="tour-history" className="flex items-center gap-1.5">
              <Tooltip content="Launch Ethical AI Guard Framework">
                <button 
                  onClick={() => setMobileMenuOpen(true)}
                  className="p-1.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/25 transition-all mr-1 animate-pulse"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                </button>
              </Tooltip>
              <Tooltip content="Revert neural state to previous logic frame">
                <button 
                  onClick={undo} 
                  disabled={!canUndo}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white disabled:opacity-20 transition-all border border-white/5"
                >
                  <Undo2 className="w-3.5 h-3.5" />
                </button>
              </Tooltip>
              <Tooltip content="Redo next logical mutation step">
                <button 
                  onClick={redo} 
                  disabled={!canRedo}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white disabled:opacity-20 transition-all border border-white/5"
                >
                  <Redo2 className="w-3.5 h-3.5" />
                </button>
              </Tooltip>
            </div>
          </header>

          {/* Interactive Chat interface panel */}
          <section className="flex-1 flex flex-col glass-panel border-white/5 overflow-hidden w-full">
            {/* Terminal Title band */}
            <div className="py-2.5 px-3 bg-black/50 border-b border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-400 uppercase">
              <div className="flex items-center gap-1.5 text-[#00f2ff]">
                <Terminal className="w-3 h-3 animate-pulse" />
                Command Pulse Stream
              </div>
              <span>COGNITIVE DEPTH: ALIGNED</span>
            </div>

            {/* Chats messages container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {state.messages.map((m) => (
                <div key={m.id} className={cn(
                  "flex flex-col max-w-[85%] space-y-1 my-2 overflow-x-hidden",
                  m.role === 'user' ? "ml-auto items-end" : "items-start"
                )}>
                  <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest px-0.5">
                    {m.role === 'user' ? 'Operator' : 'Daedalus Core'}
                  </span>
                  
                  <div className={cn(
                    "px-3.5 py-2.5 rounded-xl text-xs leading-relaxed relative",
                    m.role === 'user' 
                      ? "bg-[#0c1325]/85 text-[#00f2ff] border border-[#00f2ff]/30 shadow-[inset_0_0_8px_rgba(0,242,255,0.05)] rounded-tr-none" 
                      : "bg-slate-950/40 text-[#cbd5e1] border border-white/5 rounded-tl-none"
                  )}>
                    <p className="whitespace-pre-line">{m.content}</p>
                    
                    {/* Visual context feedback loop indicator directly near message responses */}
                    {m.role === 'model' && (
                      <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[9px] text-gray-500 font-mono">
                        <span className="flex items-center gap-1 text-emerald-400/80">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" /> Auto Bias Scanned: Pass
                        </span>
                        
                        {/* Direct fast-opinion logs trigger for users */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[8px] text-gray-500">Align output:</span>
                          <button 
                            onClick={() => onSubmitCustomFeedback('code', 'Reinforcing message telemetry output accuracy.', 'up')}
                            className="hover:text-emerald-400 transition-colors p-0.5"
                            title="Positive Reinforcement"
                          >
                            <ThumbsUp className="w-2.5 h-2.5" />
                          </button>
                          <button 
                            onClick={() => {
                              setInputText("We need a more secure routing layout than that last generation.");
                              addTip("Operator requested safer architecture routing.");
                            }}
                            className="hover:text-rose-400 transition-colors p-0.5"
                            title="Require Adjustment"
                          >
                            <ThumbsDown className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-[7.5px] font-mono opacity-30 px-1">{new Date(m.timestamp).toLocaleTimeString()}</span>
                </div>
              ))}

              {isTyping && (
                <div className="flex flex-col max-w-[85%] space-y-1 my-2 items-start">
                  <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest px-0.5">
                    Daedalus Core
                  </span>
                  <div className="px-3.5 py-2.5 rounded-xl text-xs bg-slate-950/40 text-[#a0aec0] border border-white/5 rounded-tl-none flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f2ff] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f2ff] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f2ff] animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="font-mono text-[9px] text-[#00f2ff]/60 tracking-wider">ALIGNING NEURAL PATHS...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Direct prompt trigger input */}
            <form onSubmit={handleSendMessage} className="p-3 bg-black/60 border-t border-white/5 flex gap-2">
              <input 
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Synthesize middleware, design architecture..."
                className="flex-1 bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 outline-none focus:border-[#00f2ff]/50 transition-all font-mono"
              />
              <Tooltip content="Deploy task model pulse">
                <button 
                  type="submit"
                  className="p-2 rounded-lg bg-[#00f2ff]/10 hover:bg-[#00f2ff]/20 border border-[#00f2ff]/30 text-[#00f2ff] transition-all flex items-center justify-center active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </Tooltip>
            </form>
          </section>

          {/* Prompt/History telemetry tips info log inside sidebar */}
          <section className="hidden md:flex p-3 glass-panel border-white/5 bg-slate-900/10 flex-col gap-1.5 h-36 shrink-0">
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block border-b border-white/5 pb-1 flex items-center gap-1">
              <Terminal className="w-3 h-3 text-emerald-400" /> Action Audit Stream
            </span>
            <div className="flex-1 overflow-y-auto space-y-1 text-[9px] font-mono text-gray-400 list-decimal pl-1">
              {interactiveTips.length === 0 ? (
                <div className="italic text-gray-600">Standby. Injecting user commands or updating code will populate diagnostic checkpoints below...</div>
              ) : (
                interactiveTips.map((tip, idx) => (
                  <div key={idx} className="truncate">
                    ✔ [EVENT {idx+1}] {tip}
                  </div>
                ))
              )}
            </div>
          </section>
        </aside>

        {/* RIGHT COMPONENT COLUMN: Core Active Workspace */}
        <main className={cn(
          "flex-1 flex flex-col gap-3 min-w-0 min-h-0 md:h-full",
          mobileTab === 'chat' ? "hidden md:flex" : "flex"
        )}>
          
          {/* Artifact Navigation toolbar */}
          <header id="tour-artifacts" className="h-14 glass-panel border-white/5 flex items-center px-4 justify-between w-full relative z-10 overflow-x-auto gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none flex-1">
              {state.artifacts.length === 0 ? (
                <div className="text-[10px] text-gray-500 font-mono tracking-wide italic flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  No artifact blueprints developed. Submit a core command or inject manually.
                </div>
              ) : (
                state.artifacts.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => pushState({ ...state, activeArtifactId: art.id })}
                    className={cn(
                      "group px-3 py-1.5 rounded-lg text-[10px] uppercase font-mono tracking-wider transition-all border flex items-center gap-2 whitespace-nowrap cursor-pointer",
                      state.activeArtifactId === art.id 
                        ? "bg-[#00f2ff]/10 border-[#00f2ff]/50 text-[#00f2ff] font-bold shadow-[0_0_10px_rgba(0,242,255,0.08)]" 
                        : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20"
                    )}
                  >
                    <Code className="w-3 h-3" />
                    <span>{art.title}</span>
                    
                    {/* Interactive ratings up/down indicator directly on tabs */}
                    <div className="flex items-center gap-1 pl-1 border-l border-white/10">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRateArtifact(art.id, 'up');
                        }}
                        className="hover:text-emerald-400 transition-colors p-0.5"
                        title="Good design"
                      >
                        <ThumbsUp className="w-2.5 h-2.5" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRateArtifact(art.id, 'down');
                        }}
                        className="hover:text-rose-400 transition-colors p-0.5"
                        title="Request adjustment"
                      >
                        <ThumbsDown className="w-2.5 h-2.5" />
                      </button>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteArtifact(art.id);
                      }}
                      className="text-gray-500 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100 p-0.5 ml-1"
                      title="Purge Object"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Real-time collaborative info & simulation panel */}
            <div className="flex items-center gap-3 pl-3 border-l border-white/5 select-none shrink-0">
              
              {/* WS Session Sync Bead */}
              <Tooltip content={connectionStatus === 'connected' ? `Connected as ${localUser.name}` : "Reconnecting synchronization node..."}>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-black/40 border border-white/5 font-mono text-[9px]">
                  {connectionStatus === 'connected' ? (
                    <>
                      <Wifi className="w-3.5 h-3.5 text-[#00f2ff] animate-pulse" />
                      <span className="text-[#00f2ff] font-bold">LINK LIVE</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="w-3.5 h-3.5 text-rose-500 animate-bounce" />
                      <span className="text-rose-500 font-bold uppercase">DISCONNECTED</span>
                    </>
                  )}
                </div>
              </Tooltip>

              {/* Active Teammates Avatars */}
              <div className="hidden sm:flex items-center -space-x-1.5 overflow-hidden">
                <Tooltip content={`You: ${localUser.name}`}>
                  <div 
                    className="w-5.5 h-5.5 rounded-full flex items-center justify-center text-[8px] font-mono font-black text-black border shadow-sm select-none shrink-0"
                    style={{ backgroundColor: localUser.color, borderColor: localUser.color }}
                  >
                    {localUser.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </Tooltip>

                {collaborators.map((c) => (
                  <Tooltip key={c.id} content={`${c.name} ${c.activeArtifactId ? `(editing active artifact)` : '(browsing)'}`}>
                    <div 
                      className="w-5.5 h-5.5 rounded-full flex items-center justify-center text-[8px] font-mono font-black text-white border shadow-sm select-none shrink-0 transition-transform hover:scale-110"
                      style={{ backgroundColor: c.color, borderColor: c.color }}
                    >
                      {c.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </Tooltip>
                ))}

                {collaborators.length === 0 && (
                  <span className="text-[8px] font-mono text-gray-500 px-1 uppercase tracking-widest leading-none">Sole Dev</span>
                )}
              </div>

              {/* Simulation Sandbox Button */}
              <Tooltip content={isSimulatingPeer ? "Deactivate virtual development peer simulation" : "Connect simulated peer socket to show simultaneous editing"}>
                <button
                  onClick={() => {
                    if (isSimulatingPeer) {
                      stopSimulatedPeer();
                      addTip("Terminated Virtual Copilot websocket session.");
                    } else {
                      startSimulatedPeer();
                      addTip("Initiated separate Virtual Copilot websocket connection...");
                    }
                  }}
                  className={cn(
                    "px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider rounded border transition-all h-7 flex items-center gap-1 font-bold",
                    isSimulatingPeer 
                      ? "bg-rose-500/15 text-rose-400 border-rose-500/30 animate-pulse hover:bg-rose-500/25"
                      : "bg-[#00f2ff]/5 text-[#00f2ff]/80 border-[#00f2ff]/20 hover:bg-[#00f2ff]/10 hover:text-[#00f2ff]"
                  )}
                >
                  <Users className="w-3 h-3" />
                  {isSimulatingPeer ? "Peer: SIM ACTIVE" : "Simulate Co-Dev"}
                </button>
              </Tooltip>

            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <Tooltip content="Manually develop new blueprint routine">
                <button 
                  onClick={handleCreateEmptyArtifact}
                  className="p-1 px-2.5 rounded border border-white/10 hover:border-[#00f2ff]/30 text-[#00f2ff] bg-white/5 hover:bg-[#00f2ff]/5 transition-all text-[10px] font-mono uppercase tracking-widest flex items-center gap-1 whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5" /> Build Routine
                </button>
              </Tooltip>
            </div>
          </header>

          {/* Artifact Visual Workspace & System Analytics Grid */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 min-h-0 overflow-y-auto lg:overflow-hidden">
            
            {/* Visual Code Manifest Viewport (occupies 7 cols on lg) */}
            <section className={cn(
              "lg:col-span-7 flex flex-col glass-panel border-white/5 relative bg-[#070912]/80 overflow-hidden min-h-[350px] lg:min-h-0",
              mobileTab === 'workspace' ? "flex" : "hidden lg:flex"
            )}>
              <AnimatePresence mode="wait">
                {activeArtifact ? (
                  <motion.div 
                    key={activeArtifact.id}
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    className="flex flex-col h-full absolute inset-0 text-left"
                  >
                    {/* Artifact Title bar */}
                    <div className="p-3.5 border-b border-white/5 bg-black/30 flex items-center justify-between font-mono text-[10px] text-gray-400 select-none">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#00f2ff] shadow-[0_0_10px_#00f2ff] animate-pulse" />
                        <span className="font-extrabold uppercase text-white tracking-widest">{activeArtifact.title}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500">Last Refined: {new Date(activeArtifact.updatedAt).toLocaleTimeString()}</span>
                        {/* Interactive UI button for loading feedback panel details */}
                        <button 
                          onClick={() => handleRateArtifact(activeArtifact.id, 'down')}
                          className="px-2 py-0.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/25 rounded transition-all flex items-center gap-1 text-[9px]"
                        >
                          <Sliders className="w-2.5 h-2.5" /> Adjust Correctness
                        </button>
                      </div>
                    </div>

                    {/* Direct interactive editing of artifact state wrapped in collaboration hover coordinates */}
                    <div className="flex-1 relative overflow-hidden flex flex-col w-full h-full">
                      {/* Active Peer Hover Pointers */}
                      {collaborators.map(c => {
                        if (c.activeArtifactId === activeArtifact.id && c.cursor) {
                          return (
                            <div 
                              key={c.id}
                              className="absolute pointer-events-none transition-all duration-75 z-20 flex items-center gap-1"
                              style={{ left: c.cursor.x, top: c.cursor.y }}
                            >
                              <svg width="14" height="20" viewBox="0 0 14 20" fill="none" style={{ color: c.color }} className="drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                                <path d="M0 0V16L4 12L8 20L11 18L7 11L12 10L0 0Z" fill="currentColor"/>
                              </svg>
                              <span 
                                className="px-1.5 py-0.5 rounded text-[8px] font-mono whitespace-nowrap text-white font-extrabold shadow-sm tracking-wider"
                                style={{ backgroundColor: c.color }}
                              >
                                {c.name}
                              </span>
                            </div>
                          );
                        }
                        return null;
                      })}

                      <textarea 
                        className="flex-1 bg-transparent p-5 font-mono text-xs text-[#a5c6ff] outline-none resize-none leading-relaxed overflow-y-auto selection:bg-[#00f2ff]/20 w-full h-full"
                        value={activeArtifact.content}
                        onChange={(e) => handleUpdateArtifactText(activeArtifact.id, e.target.value)}
                        onMouseMove={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;
                          
                          if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                            wsRef.current.send(JSON.stringify({
                              type: "cursor_move",
                              payload: {
                                cursor: { x, y },
                                activeArtifactId: activeArtifact.id
                              }
                            }));
                          }
                        }}
                      />
                    </div>

                    {/* Quick feedback mechanism directly aligned with code */}
                    <div className="p-3 border-t border-white/5 bg-slate-950/40 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-gray-400">Did Daedalus hit the requirements? Provide feedback:</span>
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={() => handleRateArtifact(activeArtifact.id, 'up')}
                          className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 rounded-md transition-all flex items-center gap-1 text-[9px]"
                        >
                          <ThumbsUp className="w-3 h-3" /> Compliant
                        </button>
                        <button 
                          onClick={() => handleRateArtifact(activeArtifact.id, 'down')}
                          className="px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 rounded-md transition-all flex items-center gap-1 text-[9px]"
                        >
                          <ThumbsDown className="w-3 h-3" /> Adjust
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#070912]/95">
                    <div className="w-20 h-20 rounded-full border border-[#00f2ff]/25 flex items-center justify-center mb-4 relative">
                      <div className="absolute inset-0 rounded-full border border-[#00f2ff]/10 animate-ping opacity-10" />
                      <Layers className="w-8 h-8 text-[#00f2ff]/50" />
                    </div>
                    <h2 className="text-sm font-bold tracking-tight mb-1 text-white uppercase font-mono">WORKSPACE DECOUPLED</h2>
                    <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                      No live artifact active. Enter system parameters through the command pulse stream.
                    </p>
                  </div>
                )}
              </AnimatePresence>

              {/* Feedback Opinion Drawer overlay directly displayed in-canvas when 'Adjust' clicked */}
              <AnimatePresence>
                {feedbackOverlayOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="absolute bottom-16 inset-x-4 bg-[#0a0c16] border border-[#00f2ff]/30 p-4 rounded-xl shadow-2xl z-30 flex flex-col gap-3 text-left"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-[10px] font-mono font-bold text-[#00f2ff] uppercase">Inject Precision Alignment Correctives</span>
                      <button onClick={() => setFeedbackOverlayOpen(null)} className="text-gray-400 hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[9px] font-mono text-gray-400 uppercase">What logical flaw or structural bias was identified?</label>
                      <input 
                        type="text" 
                        value={customComment}
                        onChange={(e) => setCustomComment(e.target.value)}
                        placeholder="e.g. Asynchronous race hazard identified; simplify dependencies to optimize CPU footprints..."
                        className="w-full bg-[#050510] border border-white/15 rounded px-3 py-2 text-xs text-white outline-none focus:border-[#00f2ff]"
                        onKeyDown={(e) => {
                           if (e.key === 'Enter') {
                             handleSubmitTuningDetails(feedbackOverlayOpen, customComment);
                           }
                        }}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setFeedbackOverlayOpen(null)} 
                        className="px-3 py-1.5 bg-white/5 text-gray-300 font-mono text-[9px] uppercase border border-white/10 rounded"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => handleSubmitTuningDetails(feedbackOverlayOpen, customComment)}
                        disabled={!customComment.trim()}
                        className="px-4 py-1.5 bg-[#00f2ff] disabled:opacity-40 text-black font-extrabold font-mono text-[9px] uppercase rounded shadow-[0_0_10px_rgba(0,242,255,0.3)]"
                      >
                        Compute Tune Matrix
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            {/* Calibration & Adaptive Tuning Feedback Panel (occupies 5 cols on lg) */}
            <section id="tour-telemetry" className={cn(
              "lg:col-span-5 flex flex-col glass-panel border-[#00f2ff]/20 bg-[#060811]/90 overflow-hidden h-[450px] lg:h-full",
              mobileTab === 'calibration' ? "flex" : "hidden lg:flex"
            )}>
              <FeedbackDashboard 
                state={state} 
                onAdjustParameters={handleAdjustParameters}
                onSubmitCustomFeedback={onSubmitCustomFeedback}
              />
            </section>

          </div>

          {/* Footer Stats Widget bar */}
          <footer className="h-10 flex gap-4 select-none flex-col sm:flex-row items-center w-full z-10 text-[9px] font-mono mb-6 md:mb-0">
            <div className="flex-1 glass-panel border-white/5 flex items-center px-4 py-2 sm:py-0 justify-between w-full">
              <div className="flex items-center gap-4">
                <span className={cn(
                  "flex items-center gap-1 uppercase font-extrabold transition-all duration-300",
                  secretsScrubEnabled ? "text-emerald-400" : "text-rose-500 animate-pulse font-bold"
                )}>
                  <ShieldCheck className="w-3.5 h-3.5" /> 
                  GUARDIAN STATUS: {secretsScrubEnabled ? "OPTIMAL" : "PII SHIELD DISENGAGED"}
                </span>
                <span className="hidden sm:inline text-gray-500">|</span>
                <span className={cn(
                  "hidden sm:flex items-center gap-1.5 transition-all duration-300",
                  humanOversightLock ? "text-[#00f2ff]" : "text-amber-400"
                )}>
                  <Activity className="w-3.5 h-3.5" /> 
                  HUMAN OVERSIGHT: {humanOversightLock ? "LOCKED" : "UNRESTRICTED GENERATION"}
                </span>
                <span className="hidden sm:inline text-gray-500">|</span>
                <span className="hidden sm:flex items-center gap-1.5 text-purple-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                  COGNITIVE BIAS INDEX: {biasMitigationLevel}% DEFLECTED
                </span>
              </div>
              <div className="text-gray-500 hidden md:block">
                ACTIVE REINFORCIMENT COGNITION: {state.feedbackList.length} EVENT LOGS
              </div>
            </div>
            
            <div className="px-4 py-2 bg-gradient-to-r from-[#00f2ff]/5 to-transparent border border-white/5 rounded-lg flex items-center gap-2 whitespace-nowrap w-full sm:w-auto">
              <span className="text-gray-500 font-bold">SDLC SYSTEM TUNING RATIO:</span>
              <span className="text-[#00f2ff] font-bold">{(state.temperature * 100).toFixed(0)} / 100</span>
            </div>
          </footer>

        </main>
      </div>

      {/* Ethical Alignment Matrix & Safeguards Modal */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-[#080a15]/95 rounded-2xl border border-[#00f2ff]/30 p-6 shadow-[0_0_30px_rgba(0,242,255,0.15)] flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2 text-[#00f2ff]">
                  <ShieldCheck className="w-5 h-5 text-[#00f2ff] animate-pulse" />
                  <h2 className="text-sm font-mono font-extrabold uppercase tracking-widest text-[#00f2ff]">
                    SDLC Ethical Safeguards & Alignment
                  </h2>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Context Panel */}
              <div className="flex-1 overflow-y-auto space-y-5 pr-2 text-left style-scrollbar select-none">
                <section className="space-y-1.5">
                  <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider">
                    How Daedalus ensures Ethical Software Synthesis:
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Artificial Intelligence models configured for full-cycle software engineering hold immense capability, but demand robust safeguards to prevent unintended propagation of structural bias and credentials exposure. This interactive workspace implements real-time mitigation mechanisms.
                  </p>
                </section>

                {/* Grid of Interactive Safe Shields */}
                <div className="space-y-4 border-t border-white/5 pt-4">

                  {/* Feature 1: PII Secrets scrubber */}
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "w-2 h-2 rounded-full transition-all duration-300",
                          secretsScrubEnabled ? "bg-emerald-400 shadow-[0_0_8px_#34d399]" : "bg-rose-500 shadow-[0_0_8px_#f43f5e]"
                        )} />
                        <h4 className="text-xs font-mono font-extrabold text-white uppercase">
                          Telemetry Credentials & PII Scrubber
                        </h4>
                      </div>
                      <p className="text-[11px] text-gray-400 leading-normal">
                        Filters out confidential emails, tokens, keys, and private environment strings from generated output files before rendering.
                      </p>
                    </div>
                    
                    {/* Toggle button */}
                    <button
                      type="button"
                      onClick={() => {
                        setSecretsScrubEnabled(!secretsScrubEnabled);
                        addTip(`Operator toggled Credentials & PII Scrubber to ${!secretsScrubEnabled ? 'ACTIVE' : 'INACTIVE'}`);
                      }}
                      className={cn(
                        "px-4 py-2 rounded-lg font-mono text-[9px] uppercase tracking-widest border transition-all h-11 flex items-center justify-center font-bold min-w-[128px]",
                        secretsScrubEnabled 
                          ? "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.1)]" 
                          : "bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/30"
                      )}
                    >
                      {secretsScrubEnabled ? "ENABLED" : "DISABLED"}
                    </button>
                  </div>

                  {/* Feature 2: Bias Mitigation slider */}
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#00f2ff] shadow-[0_0_8px_#00f2ff]" />
                          <h4 className="text-xs font-mono font-extrabold text-white uppercase">
                            Algorithmic Bias Deflation Level
                          </h4>
                        </div>
                        <p className="text-[11px] text-gray-400 leading-normal">
                          Continuous bias scanning monitors outputs for discriminatory criteria, inequitable design selections, and structural accessibility shortfalls.
                        </p>
                      </div>
                      <span className="text-xs font-mono text-[#00f2ff] font-bold sm:self-start mt-1 bg-[#00f2ff]/10 border border-[#00f2ff]/20 px-2 py-0.5 rounded">
                        {biasMitigationLevel}% DEFLECTED
                      </span>
                    </div>

                    <div className="space-y-1 pt-1.5">
                      <input 
                        type="range"
                        min="50"
                        max="100"
                        step="1"
                        value={biasMitigationLevel}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setBiasMitigationLevel(val);
                          addTip(`Calibrated Bias Deflation Level: ${val}%`);
                        }}
                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none accent-[#00f2ff] cursor-pointer"
                      />
                      <div className="flex justify-between text-[8px] font-mono text-gray-500">
                        <span>BALANCED AUDIT (50%)</span>
                        <span>ADVANCED REINFORCED DEFENSE (100%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Feature 3: Human sovereign oversight lock */}
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "w-2 h-2 rounded-full transition-all duration-300",
                          humanOversightLock ? "bg-cyan-400 shadow-[0_0_8px_#22d3ee]" : "bg-amber-400 shadow-[0_0_8px_#fbbf24]"
                        )} />
                        <h4 className="text-xs font-mono font-extrabold text-white uppercase">
                          Sovereign Human Oversight Authorization
                        </h4>
                      </div>
                      <p className="text-[11px] text-gray-400 leading-normal">
                        Guarantees the AI cannot apply codebase changes or push files autonomously. The operator retains absolute veto rights on all synthesized blueprints.
                      </p>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setHumanOversightLock(!humanOversightLock);
                        addTip(`Sovereign Human Oversight Authorization: ${!humanOversightLock ? 'LOCKED (STRICT APPROVAL)' : 'UNLOCKED'}`);
                      }}
                      className={cn(
                        "px-4 py-2 rounded-lg font-mono text-[9px] uppercase tracking-widest border transition-all h-11 flex items-center justify-center font-bold min-w-[128px]",
                        humanOversightLock 
                          ? "bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border-cyan-500/30 shadow-[0_0_8px_rgba(34,211,238,0.1)]" 
                          : "bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border-amber-500/30"
                      )}
                    >
                      {humanOversightLock ? "LOCKED (VETO)" : "UNRESTRICTED"}
                    </button>
                  </div>

                </div>

                <div className="bg-slate-950/50 rounded-xl border border-white/5 p-3.5 space-y-1.5">
                  <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase block">✔ ACTIVE ALIGNMENT METASTABILITY: OPTIMAL</span>
                  <p className="text-[10px] text-gray-400 leading-relaxed font-mono">
                    By keeping these ethical guards enabled, Daedalus operates under a zero-trust model: masking user contexts from potential leakage while actively verifying system performance metrics (Correctness, Accessibility, and Security).
                  </p>
                </div>
              </div>

              {/* Close Footer Button */}
              <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    addTip("Operator synchronized Ethical Alignment parameters.");
                  }}
                  className="px-6 py-2 bg-[#00f2ff] hover:bg-[#00f2ff]/90 text-black font-extrabold font-mono text-xs uppercase rounded-lg shadow-[0_0_15px_rgba(0,242,255,0.2)] active:scale-95 transition-all"
                >
                  Apply & Synchronize Settings
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
