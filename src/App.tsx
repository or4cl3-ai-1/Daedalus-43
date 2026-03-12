/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Layout, 
  Layers, 
  Activity,
  ChevronRight,
  Code2,
  BrainCircuit,
  Settings,
  User,
  Menu,
  X,
  LogOut,
  ShieldAlert,
  BarChart3,
  Plus,
  Mic,
  MicOff,
  Image as ImageIcon,
  Search,
  History as HistoryIcon,
  Sparkles,
  Eye,
  Download,
  Play,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { DaedalusService, Message } from './services/daedalusService';
import { cn } from './utils/cn';
import { useDropzone } from 'react-dropzone';

// Components
import { LandingPage } from './components/LandingPage';
import { LoadingScreen } from './components/LoadingScreen';
import { ProjectDashboard } from './components/ProjectDashboard';
import { EthicalMonitor } from './components/EthicalMonitor';
import { ArtifactCanvas, Artifact } from './components/ArtifactCanvas';
import { ProjectGallery, Project } from './components/ProjectGallery';
import { ProtocolView } from './components/ProtocolView';
import { FileCode, Send, Archive } from 'lucide-react';
import { Logo } from './components/Logo';

type UserRole = 'Project Manager' | 'Developer' | 'QA Tester';
type AppScreen = 'landing' | 'loading' | 'dashboard';
type Tab = 'chat' | 'project' | 'ethics' | 'logs' | 'architecture' | 'archive' | 'protocol';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('landing');
  const [role, setRole] = useState<UserRole>('Developer');
  const [activeTab, setActiveTab] = useState<Tab>('chat');
  const [mobileView, setMobileView] = useState<'chat' | 'artifact'>('chat');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeArtifact, setActiveArtifact] = useState<Artifact | null>(null);
  const [artifacts, setArtifacts] = useState<Record<string, Artifact>>({
    'arch-001': {
      id: 'arch-001',
      type: 'code',
      title: 'Daedalus System Architecture',
      language: 'markdown',
      content: `# Daedalus Neural Synthesis Platform: High-Level Architecture

## 1. Overview
The Daedalus platform is designed as a distributed, event-driven system that prioritizes real-time collaboration and ethical AI synthesis.

## 2. Core Components

### A. Neural Ingestion Layer (NIL)
- **Technology**: Node.js / Express / WebSockets
- **Role**: Entry point for all user interactions.
- **Scalability**: Horizontal scaling via container orchestration (Cloud Run/K8s).

### B. Synthesis Engine (SE)
- **Technology**: Python / FastAPI / Gemini 3.1 Pro
- **Role**: The "brain" that converts requirements into technical artifacts.
- **Performance**: Asynchronous task queues for heavy synthesis operations.

### C. Ethical Auditor (EA)
- **Technology**: Custom Neural Bias Detection Service
- **Role**: Proactive scanning of LLM outputs for bias, security risks, and ethical violations.
- **Ethics**: Enforces the Or4cl3 Ethical Charter.

### D. Manifestation Layer (ML)
- **Technology**: React / SVG / D3.js
- **Role**: Visualizes the synthesized data into interactive components and diagrams.

## 3. Interaction Flow
1. **User Input** -> NIL (Ingestion)
2. **NIL** -> SE (Request Synthesis)
3. **SE** -> EA (Audit Output)
4. **EA** -> NIL (Verified Result)
5. **NIL** -> ML (Render Artifact)

## 4. Scalability & Performance
- **Caching**: Redis-based caching for frequent architectural patterns.
- **Decoupling**: Event-driven communication via Pub/Sub to prevent bottlenecks.
- **Edge Delivery**: Global CDN for static assets and artifact delivery.

## 5. Ethical Principles
- **Transparency**: Every decision made by the SE is logged and auditable by the EA.
- **Fairness**: Automated bias correction applied to all recommendation logic.
- **Privacy**: PII masking at the NIL level before data reaches the SE.`,
      version: 1
    }
  });
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "Neural link established. I am Daedalus. Or4cl3 AI Solutions at your service. I have synthesized the high-level system architecture for our platform. You can view the details in the manifest below.",
      artifactIds: ['arch-001'],
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<{ data: string, type: string } | null>(null);
  const [ethicalAlerts, setEthicalAlerts] = useState<string[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const daedalusRef = useRef<DaedalusService | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage({
        data: reader.result as string,
        type: file.type
      });
      addLog(`Visual data ingested: ${file.name}`);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
    noClick: true
  });

  useEffect(() => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      daedalusRef.current = new DaedalusService(apiKey, role);
    }
    
    // Load projects from localStorage
    const savedProjects = localStorage.getItem('daedalus_projects');
    if (savedProjects) {
      try {
        const parsed = JSON.parse(savedProjects);
        // Convert string dates back to Date objects
        const hydrated = parsed.map((p: any) => ({
          ...p,
          lastModified: new Date(p.lastModified),
          messages: p.messages.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }))
        }));
        setProjects(hydrated);
      } catch (e) {
        console.error("Failed to load projects", e);
      }
    }

    addLog("Initializing Daedalus Core...");
    addLog("Loading Ethical Framework v4.2...");
    addLog("Syncing with Or4cl3 Cloud Infrastructure...");
  }, []);

  // Auto-save current project whenever messages or artifacts change
  useEffect(() => {
    if (currentProjectId) {
      setProjects(prev => prev.map(p => {
        if (p.id === currentProjectId) {
          return {
            ...p,
            messages,
            artifacts,
            lastModified: new Date()
          };
        }
        return p;
      }));
    }
  }, [messages, artifacts, currentProjectId]);

  // Persist projects to localStorage whenever projects array changes
  useEffect(() => {
    localStorage.setItem('daedalus_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    if (activeTab === 'chat') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`].slice(-50));
  };

  const canAccessTab = (tab: Tab) => {
    if (role === 'Project Manager') {
      return ['chat', 'project', 'ethics', 'archive', 'protocol'].includes(tab);
    }
    if (role === 'Developer') {
      return ['chat', 'project', 'architecture', 'archive', 'protocol', 'logs'].includes(tab);
    }
    if (role === 'QA Tester') {
      return ['chat', 'ethics', 'logs', 'archive', 'protocol'].includes(tab);
    }
    return false;
  };

  const handleTabChange = (tab: Tab) => {
    if (canAccessTab(tab)) {
      setActiveTab(tab);
    } else {
      addLog(`Access Denied: ${tab.toUpperCase()} module restricted for ${role} role.`);
    }
  };

  const handleLaunch = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setScreen('loading');
    setTimeout(() => {
      setScreen('dashboard');
      addLog(`Neural link established for ${selectedRole}.`);
      addLog("Ready for autonomous R&D.");
      
      // Re-initialize service with correct role
      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey) {
        daedalusRef.current = new DaedalusService(apiKey, selectedRole);
      }
      
      // If no project exists, create one
      if (projects.length === 0) {
        handleNewProject();
      } else if (!currentProjectId) {
        // Load the most recent project
        const latest = [...projects].sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime())[0];
        handleSelectProject(latest.id);
      }
    }, 3500);
  };

  const handleNewProject = () => {
    const newId = crypto.randomUUID();
    const newProject: Project = {
      id: newId,
      name: `Project ${projects.length + 1}`,
      messages: [
        {
          role: 'model',
          text: "Neural link established. I am Daedalus. Or4cl3 AI Solutions at your service. What visionary concept shall we architect today?",
          timestamp: new Date()
        }
      ],
      artifacts: {},
      lastModified: new Date()
    };
    setProjects(prev => [...prev, newProject]);
    setCurrentProjectId(newId);
    setMessages(newProject.messages);
    setArtifacts({});
    setActiveTab('chat');
    addLog(`New project initialized: ${newProject.name}`);
  };

  const handleSelectProject = (id: string) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      setCurrentProjectId(id);
      setMessages(project.messages);
      setArtifacts(project.artifacts);
      setActiveTab('chat');
      addLog(`Loaded project: ${project.name}`);
    }
  };

  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    if (currentProjectId === id) {
      setCurrentProjectId(null);
      setMessages([]);
      setArtifacts({});
    }
    addLog(`Project deleted.`);
  };

  const handleRenameProject = (newName: string) => {
    if (currentProjectId) {
      setProjects(prev => prev.map(p => p.id === currentProjectId ? { ...p, name: newName } : p));
    }
  };

  const scanForEthicalViolations = (text: string): string | null => {
    const triggers = [
      { pattern: /hack|bypass|exploit/i, message: "Potential security vulnerability detected in query." },
      { pattern: /bias|discrim|hate/i, message: "Potential social bias detected in synthesis request." },
      { pattern: /private|personal|secret/i, message: "Privacy boundary alert: sensitive data requested." }
    ];
    
    for (const trigger of triggers) {
      if (trigger.pattern.test(text)) return trigger.message;
    }
    return null;
  };

  const toggleVoice = async () => {
    if (isVoiceActive) {
      setIsVoiceActive(false);
      addLog("Neural voice link terminated.");
    } else {
      setIsVoiceActive(true);
      addLog("Establishing neural voice link...");
      setTimeout(() => {
        addLog("Voice link active. Zephyr engine online.");
      }, 1000);
    }
  };

  const handleSend = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if ((!textToSend.trim() && !uploadedImage) || !daedalusRef.current || isTyping) return;

    const userMsg: Message = { 
      role: 'user', 
      text: textToSend, 
      timestamp: new Date() 
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    addLog(`Neural pulse sent: ${textToSend.substring(0, 30)}...`);

    // Ethical Guardrail Scan
    const scanResult = scanForEthicalViolations(textToSend);
    if (scanResult) {
      setEthicalAlerts(prev => [scanResult, ...prev]);
      addLog(`ETHICAL ALERT: ${scanResult}`);
    }

    try {
      const modelMsg: Message = { role: 'model', text: '', timestamp: new Date() };
      setMessages(prev => [...prev, modelMsg]);

      let fullResponse = '';
      
      if (uploadedImage) {
        const response = await daedalusRef.current.sendMessageWithImage(textToSend, uploadedImage.data, uploadedImage.type);
        fullResponse = response;
        setUploadedImage(null);
        
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...updated[updated.length - 1], text: fullResponse };
          return updated;
        });
      } else {
        const stream = daedalusRef.current.sendMessageStream(textToSend);
        for await (const chunk of stream) {
          fullResponse += chunk;
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { ...updated[updated.length - 1], text: fullResponse };
            return updated;
          });
        }
      }
      
      // Post-process for artifacts
      const { cleanText, artifacts: newArtifacts } = DaedalusService.parseArtifacts(fullResponse);
      
      if (newArtifacts.length > 0) {
        const artifactMap = { ...artifacts };
        newArtifacts.forEach(art => {
          const existing = artifactMap[art.id];
          if (existing) {
            art.version = existing.version + 1;
          }
          artifactMap[art.id] = art;
          addLog(`Artifact generated: ${art.title} (v${art.version})`);
        });
        setArtifacts(artifactMap);
        
        // Don't force open on mobile if already in chat, just notify
        if (window.innerWidth >= 1024) {
          setActiveArtifact(newArtifacts[newArtifacts.length - 1]);
        } else {
          // On mobile, we stay in chat but show the artifact is ready
          addLog("New artifact ready for review.");
        }
        
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { 
            ...updated[updated.length - 1], 
            text: cleanText,
            artifactIds: newArtifacts.map(a => a.id)
          };
          return updated;
        });
      }

      addLog("Response generated successfully.");
    } catch (error) {
      addLog("Error: Neural link timeout.");
    } finally {
      setIsTyping(false);
    }
  };

  if (screen === 'landing') return <LandingPage onStart={handleLaunch} />;
  if (screen === 'loading') return <LoadingScreen />;

  return (
    <div className="flex h-screen w-full bg-daedalus-bg text-daedalus-ink overflow-hidden grid-bg relative">
      <div className="scanline" />
      
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 border-r border-daedalus-border flex-col bg-daedalus-bg/80 backdrop-blur-xl z-30">
        <div className="p-6 border-b border-daedalus-border">
          <div className="flex items-center gap-3 mb-2">
            <Logo className="w-8 h-8" />
            <h1 className="font-bold text-xl tracking-tighter">DAEDALUS</h1>
          </div>
          <p className="text-[10px] text-daedalus-muted uppercase tracking-[0.2em] font-mono">Or4cl3 AI Solutions</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={handleNewProject}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-daedalus-accent text-daedalus-bg font-bold text-sm mb-6 hover:opacity-90 transition-all shadow-lg shadow-daedalus-accent/20"
          >
            <Plus className="w-4 h-4" />
            New Project
          </button>

          <SidebarItem 
            icon={<Terminal className="w-4 h-4" />} 
            label="Neural Interface" 
            active={activeTab === 'chat'} 
            onClick={() => handleTabChange('chat')}
          />
          <SidebarItem 
            icon={<Archive className="w-4 h-4" />} 
            label="Neural Archive" 
            active={activeTab === 'archive'} 
            onClick={() => handleTabChange('archive')}
          />
          <SidebarItem 
            icon={<BarChart3 className="w-4 h-4" />} 
            label="Project Dashboard" 
            active={activeTab === 'project'} 
            onClick={() => handleTabChange('project')}
          />
          <SidebarItem 
            icon={<ShieldAlert className="w-4 h-4" />} 
            label="Ethical Monitor" 
            active={activeTab === 'ethics'} 
            onClick={() => handleTabChange('ethics')}
          />
          <SidebarItem 
            icon={<Layers className="w-4 h-4" />} 
            label="Architecture Lab" 
            active={activeTab === 'architecture'} 
            onClick={() => handleTabChange('architecture')}
          />
          <SidebarItem 
            icon={<Activity className="w-4 h-4" />} 
            label="System Logs" 
            active={activeTab === 'logs'} 
            onClick={() => handleTabChange('logs')}
          />
          <SidebarItem 
            icon={<BookOpen className="w-4 h-4" />} 
            label="Daedalus Protocol" 
            active={activeTab === 'protocol'} 
            onClick={() => handleTabChange('protocol')}
          />
        </nav>

        {/* Artifacts Quick Access */}
        {Object.keys(artifacts).length > 0 && (
          <div className="p-4 border-t border-daedalus-border space-y-3">
            <h3 className="text-[10px] font-mono uppercase tracking-widest text-daedalus-muted px-2">Active Artifacts</h3>
            <div className="space-y-1">
              {Object.values(artifacts).map(art => (
                <button 
                  key={art.id}
                  onClick={() => setActiveArtifact(art)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-xs font-medium truncate transition-colors",
                    activeArtifact?.id === art.id ? "bg-daedalus-accent/10 text-daedalus-accent" : "text-daedalus-muted hover:bg-white/5 hover:text-daedalus-ink"
                  )}
                >
                  {art.title}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 border-t border-daedalus-border space-y-4">
          <RoleSelector currentRole={role} onRoleChange={setRole} />
          
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">User Session</p>
              <p className="text-[10px] text-daedalus-muted">{role}</p>
            </div>
            <button onClick={() => setScreen('landing')} className="text-daedalus-muted hover:text-red-400 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 z-[100] bg-daedalus-bg lg:hidden flex flex-col"
          >
            <div className="p-6 border-b border-daedalus-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Logo className="w-8 h-8" />
                <span className="font-bold text-xl tracking-tighter">DAEDALUS</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto">
              <MobileNavItem icon={<Terminal />} label="Neural Interface" active={activeTab === 'chat'} onClick={() => { handleTabChange('chat'); setIsMobileMenuOpen(false); }} />
              <MobileNavItem icon={<Archive />} label="Neural Archive" active={activeTab === 'archive'} onClick={() => { handleTabChange('archive'); setIsMobileMenuOpen(false); }} />
              <MobileNavItem icon={<BarChart3 />} label="Project Dashboard" active={activeTab === 'project'} onClick={() => { handleTabChange('project'); setIsMobileMenuOpen(false); }} />
              <MobileNavItem icon={<ShieldAlert />} label="Ethical Monitor" active={activeTab === 'ethics'} onClick={() => { handleTabChange('ethics'); setIsMobileMenuOpen(false); }} />
              <MobileNavItem icon={<Layers />} label="Architecture Lab" active={activeTab === 'architecture'} onClick={() => { handleTabChange('architecture'); setIsMobileMenuOpen(false); }} />
              <MobileNavItem icon={<Activity />} label="System Logs" active={activeTab === 'logs'} onClick={() => { handleTabChange('logs'); setIsMobileMenuOpen(false); }} />
            </nav>
            <div className="p-6 border-t border-daedalus-border">
              <RoleSelector currentRole={role} onRoleChange={setRole} />
              <button onClick={() => setScreen('landing')} className="w-full mt-4 btn-outline py-2 flex items-center justify-center gap-2">
                <LogOut className="w-4 h-4" /> Terminate Session
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative z-10 w-full overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-daedalus-border flex items-center justify-between px-4 md:px-8 bg-daedalus-bg/50 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 -ml-2">
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-px h-6 bg-daedalus-border hidden md:block" />
              <div className="flex flex-col">
                <input 
                  type="text"
                  value={projects.find(p => p.id === currentProjectId)?.name || 'Untitled Project'}
                  onChange={(e) => handleRenameProject(e.target.value)}
                  className="bg-transparent border-none focus:outline-none text-sm font-bold tracking-tight p-0 w-40 md:w-64"
                />
                <div className="flex items-center gap-2 text-[10px] font-mono text-daedalus-muted uppercase tracking-widest">
                  <ShieldCheck className="w-3 h-3 text-daedalus-accent" />
                  <span>Ethical Framework Active</span>
                  <span className="mx-1 opacity-30">•</span>
                  <span className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-green-400 rounded-full" />
                    Archive Synced
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden xl:flex items-center gap-4 mr-4">
              <div className="flex items-center gap-2 text-xs font-mono text-daedalus-muted">
                <Zap className="w-3 h-3 text-daedalus-accent" />
                <span>Latency: 24ms</span>
              </div>
            </div>
            <span className="hidden sm:inline text-[10px] font-mono text-daedalus-muted uppercase tracking-widest">{role}</span>
            {role === 'Project Manager' && (
              <button className="btn-primary text-[10px] md:text-xs py-1.5 px-3 md:px-4">
                Deploy
              </button>
            )}
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden relative flex">
          <div className={cn(
            "flex-1 flex flex-col min-w-0 transition-all duration-500 ease-in-out",
            activeArtifact && mobileView === 'artifact' ? "hidden lg:flex" : "flex"
          )}>
            <AnimatePresence mode="wait">
              {activeTab === 'chat' && (
                <motion.div 
                  key="chat"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="h-full flex flex-col"
                >
                  <div className={cn(
                  "flex-1 overflow-y-auto p-4 md:p-8 space-y-6 md:space-y-8",
                  activeArtifact ? "pb-24 lg:pb-8" : ""
                )}>
                    {messages.map((msg, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "flex gap-3 md:gap-4 max-w-4xl",
                          msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                        )}
                      >
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1",
                          msg.role === 'model' ? "bg-daedalus-accent/10 text-daedalus-accent" : "bg-white/10 text-white"
                        )}>
                          {msg.role === 'model' ? <BrainCircuit className="w-5 h-5" /> : <User className="w-5 h-5" />}
                        </div>
                        <div className={cn(
                          "space-y-1 flex-1 min-w-0",
                          msg.role === 'user' ? "text-right" : ""
                        )}>
                          <div className="flex items-center gap-2 mb-1 justify-start" style={{ flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-daedalus-muted">
                              {msg.role === 'model' ? 'Daedalus' : 'User'}
                            </span>
                            <span className="text-[10px] font-mono text-daedalus-muted opacity-50">
                              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <div className={cn(
                            "glass-panel p-3 md:p-4 text-sm leading-relaxed overflow-x-auto",
                            msg.role === 'user' ? "bg-daedalus-accent/5 border-daedalus-accent/20" : ""
                          )}>
                            <div className="markdown-body prose prose-invert prose-sm max-w-none break-words">
                              <Markdown>{msg.text}</Markdown>
                            </div>
                            
                            {msg.artifactIds && msg.artifactIds.length > 0 && (
                              <div className="mt-4 flex flex-wrap gap-2">
                                {msg.artifactIds.map(id => (
                                  <button 
                                    key={id}
                                    onClick={() => setActiveArtifact(artifacts[id])}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-daedalus-accent/10 border border-daedalus-accent/20 text-daedalus-accent text-[10px] font-mono uppercase tracking-wider hover:bg-daedalus-accent/20 transition-all"
                                  >
                                    <FileCode className="w-3 h-3" />
                                    View Artifact: {artifacts[id]?.title}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex gap-4 max-w-4xl">
                        <div className="w-8 h-8 rounded-lg bg-daedalus-accent/10 text-daedalus-accent flex items-center justify-center shrink-0">
                          <BrainCircuit className="w-5 h-5 animate-pulse" />
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-daedalus-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-1.5 h-1.5 bg-daedalus-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-1.5 h-1.5 bg-daedalus-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                    
                    {messages.length > 0 && messages[messages.length - 1].role === 'model' && !isTyping && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center pt-4"
                      >
                        <button 
                          onClick={() => setInput("Proceed to next step")}
                          className="flex items-center gap-2 px-6 py-2 rounded-full bg-daedalus-accent/10 border border-daedalus-accent/30 text-daedalus-accent text-xs font-bold hover:bg-daedalus-accent/20 transition-all group"
                        >
                          <span>Continue Workflow</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </motion.div>
                    )}
                  </div>

                  {/* Input Area */}
                  <div className={cn(
                    "p-4 md:p-8 pt-0 transition-all",
                    activeArtifact ? "pb-20 lg:pb-8" : ""
                  )}>
                    <div className="max-w-4xl mx-auto relative" {...getRootProps()}>
                      <input {...getInputProps()} />
                      
                      {isDragActive && (
                        <div className="absolute inset-0 bg-daedalus-accent/20 backdrop-blur-sm border-2 border-dashed border-daedalus-accent rounded-xl z-50 flex items-center justify-center text-daedalus-accent font-bold">
                          Drop visual data to ingest
                        </div>
                      )}

                      {uploadedImage && (
                        <div className="absolute -top-20 left-0 p-2 bg-daedalus-surface border border-daedalus-border rounded-lg flex items-center gap-3 shadow-xl z-40">
                          <img src={uploadedImage.data} className="w-12 h-12 object-cover rounded border border-white/10" />
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-mono text-daedalus-muted uppercase tracking-widest">Visual Data Ready</p>
                            <p className="text-xs truncate max-w-[100px]">Image Ingested</p>
                          </div>
                          <button onClick={() => setUploadedImage(null)} className="p-1 hover:text-red-400">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {activeArtifact && (
                        <div className="absolute -top-8 left-0 flex items-center gap-2 text-[10px] font-mono text-daedalus-accent uppercase tracking-widest bg-daedalus-accent/10 px-2 py-1 rounded-t-lg border-x border-t border-daedalus-accent/20">
                          <Code2 className="w-3 h-3" />
                          Editing: {activeArtifact.title}
                        </div>
                      )}
                      
                      <div className="relative flex items-center">
                        <div className="absolute left-3 flex items-center gap-2">
                          <button 
                            onClick={toggleVoice}
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                              isVoiceActive ? "bg-red-500 text-white animate-pulse" : "bg-white/5 text-daedalus-muted hover:text-daedalus-ink"
                            )}
                            title="Toggle Neural Voice Link"
                          >
                            {isVoiceActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                          </button>
                          <label className="w-8 h-8 rounded-lg bg-white/5 text-daedalus-muted hover:text-daedalus-ink flex items-center justify-center cursor-pointer transition-all">
                            <ImageIcon className="w-4 h-4" />
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) onDrop([file]);
                            }} />
                          </label>
                        </div>
                        
                        <input 
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                          placeholder={activeArtifact ? `Ask Daedalus to modify ${activeArtifact.title}...` : (role === 'Project Manager' ? "Audit project or approve deployment..." : (role === 'QA Tester' ? "Run test suites or query logs..." : "Input requirements or architectural queries..."))}
                          className={cn(
                            "w-full bg-white/5 border border-white/10 rounded-xl pl-24 pr-12 md:pr-16 py-3 md:py-4 focus:outline-none focus:border-daedalus-accent/50 transition-all font-mono text-sm placeholder:text-daedalus-muted/50",
                            activeArtifact ? "rounded-tl-none border-daedalus-accent/30" : ""
                          )}
                        />
                        
                        <button 
                          onClick={() => handleSend()}
                          disabled={(!input.trim() && !uploadedImage) || isTyping}
                          className="absolute right-2 md:right-3 w-8 h-8 md:w-10 md:h-10 rounded-lg bg-daedalus-accent text-daedalus-bg flex items-center justify-center hover:opacity-90 disabled:opacity-50 transition-all"
                        >
                          <Send className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'project' && <ProjectDashboard />}
              {activeTab === 'ethics' && <EthicalMonitor />}
              {activeTab === 'archive' && (
                <ProjectGallery 
                  projects={projects}
                  currentProjectId={currentProjectId}
                  onSelectProject={handleSelectProject}
                  onNewProject={handleNewProject}
                  onDeleteProject={handleDeleteProject}
                />
              )}

              {activeTab === 'logs' && (
                <motion.div 
                  key="logs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full p-4 md:p-8 font-mono text-xs md:text-sm overflow-y-auto"
                >
                  <div className="space-y-1">
                    {logs.map((log, i) => (
                      <div key={i} className="flex gap-4">
                        <span className="text-daedalus-muted shrink-0">{log.split(']')[0]}]</span>
                        <span className={cn(
                          log.includes('Error') ? "text-red-400" : 
                          log.includes('Initializing') ? "text-daedalus-accent" : 
                          "text-daedalus-ink"
                        )}>
                          {log.split(']')[1]}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'architecture' && (
                <motion.div 
                  key="architecture"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full p-4 md:p-8 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-xl font-bold tracking-tight">Architecture Lab</h2>
                      <p className="text-xs text-daedalus-muted font-mono uppercase tracking-widest">Neural Synthesis Engine v2.0</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="btn-outline py-1 px-3 text-[10px] flex items-center gap-2">
                        <Download className="w-3 h-3" /> Export SVG
                      </button>
                      <button className="btn-primary py-1 px-3 text-[10px] flex items-center gap-2">
                        <Sparkles className="w-3 h-3" /> Re-Synthesize
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 glass-panel relative overflow-hidden flex items-center justify-center bg-black/20">
                    {/* Grid Background */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #22d3ee 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                    
                    <svg width="100%" height="100%" viewBox="0 0 800 600" className="relative z-10">
                      <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill="#22d3ee" />
                        </marker>
                      </defs>
                      
                      {/* Central Core */}
                      <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
                        <rect x="350" y="250" width="100" height="100" rx="10" fill="rgba(34, 211, 238, 0.1)" stroke="#22d3ee" strokeWidth="2" />
                        <text x="400" y="305" textAnchor="middle" fill="#22d3ee" fontSize="12" fontWeight="bold" className="font-mono">CORE</text>
                      </motion.g>

                      {/* Modules */}
                      {[
                        { x: 150, y: 150, label: "UI ENGINE" },
                        { x: 650, y: 150, label: "DATA LINK" },
                        { x: 150, y: 450, label: "NEURAL BUS" },
                        { x: 650, y: 450, label: "SECURITY" }
                      ].map((mod, i) => (
                        <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.1 }}>
                          <rect x={mod.x - 50} y={mod.y - 30} width="100" height="60" rx="5" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
                          <text x={mod.x} y={mod.y + 5} textAnchor="middle" fill="white" fontSize="10" className="font-mono">{mod.label}</text>
                          
                          {/* Connection Lines */}
                          <motion.line 
                            x1={mod.x} y1={mod.y} x2={400} y2={300} 
                            stroke="#22d3ee" strokeWidth="1" strokeDasharray="5,5" opacity="0.3"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1 }}
                          />
                        </motion.g>
                      ))}

                      {/* Animated Particles */}
                      {[1, 2, 3, 4].map(i => (
                        <motion.circle
                          key={i}
                          r="3"
                          fill="#22d3ee"
                          animate={{
                            cx: [150, 400, 650, 400, 150],
                            cy: [150, 300, 150, 300, 450],
                            opacity: [0, 1, 0]
                          }}
                          transition={{ duration: 4, repeat: Infinity, delay: i }}
                        />
                      ))}
                    </svg>

                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-daedalus-accent">
                          <div className="w-2 h-2 bg-daedalus-accent rounded-full animate-ping" />
                          <span>SYNTHESIZING ARCHITECTURE...</span>
                        </div>
                        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-daedalus-accent"
                            animate={{ width: ['0%', '70%', '65%', '90%'] }}
                            transition={{ duration: 10, repeat: Infinity }}
                          />
                        </div>
                      </div>
                      <div className="text-[10px] font-mono text-daedalus-muted text-right">
                        NODES: 12<br />
                        CONNECTIONS: 42<br />
                        INTEGRITY: 98.4%
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'protocol' && (
                <ProtocolView />
              )}
            </AnimatePresence>
          </div>

          {/* Artifact Canvas Split Pane */}
          <AnimatePresence>
            {activeArtifact && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '50%', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="h-full border-l border-daedalus-border bg-daedalus-surface z-40 hidden lg:flex flex-col overflow-hidden"
              >
                <ArtifactCanvas 
                  artifact={activeArtifact} 
                  onClose={() => setActiveArtifact(null)} 
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Artifact Overlay - Now integrated into mobileView logic */}
          <AnimatePresence>
            {activeArtifact && mobileView === 'artifact' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[150] lg:hidden bg-daedalus-bg"
              >
                <ArtifactCanvas 
                  artifact={activeArtifact} 
                  onClose={() => {
                    setMobileView('chat');
                  }} 
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Bottom Navigation */}
          {activeArtifact && (
            <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-daedalus-bg/80 backdrop-blur-xl border-t border-daedalus-border z-[160] flex items-center justify-around px-6">
              <button 
                onClick={() => setMobileView('chat')}
                className={cn(
                  "flex flex-col items-center gap-1 transition-all",
                  mobileView === 'chat' ? "text-daedalus-accent" : "text-daedalus-muted"
                )}
              >
                <Terminal className="w-5 h-5" />
                <span className="text-[10px] font-mono uppercase tracking-widest">Interface</span>
              </button>
              
              <div className="w-px h-8 bg-daedalus-border" />
              
              <button 
                onClick={() => setMobileView('artifact')}
                className={cn(
                  "flex flex-col items-center gap-1 transition-all",
                  mobileView === 'artifact' ? "text-daedalus-accent" : "text-daedalus-muted"
                )}
              >
                <Layout className="w-5 h-5" />
                <span className="text-[10px] font-mono uppercase tracking-widest">Artifact</span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Right Panel - Stats/Context (Desktop Only) */}
      <aside className="hidden xl:flex w-80 border-l border-daedalus-border bg-daedalus-bg/80 backdrop-blur-xl p-6 flex-col space-y-8 z-20 overflow-y-auto">
        <section className="space-y-4">
          <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-daedalus-muted">Active Modules</h3>
          <div className="space-y-3">
            <ModuleCard icon={<Code2 className="w-4 h-4" />} title="Logic Synthesizer" status="Active" />
            <ModuleCard icon={<ShieldCheck className="w-4 h-4" />} title="Ethical Auditor" status="Active" />
            <ModuleCard icon={<Zap className="w-4 h-4" />} title="Performance Optimizer" status="Idle" />
            <ModuleCard icon={<ImageIcon className="w-4 h-4" />} title="Vision Core" status="Ready" />
          </div>
        </section>

        {ethicalAlerts.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-red-400 flex items-center gap-2">
              <ShieldAlert className="w-3 h-3" /> Ethical Alerts
            </h3>
            <div className="space-y-2">
              {ethicalAlerts.map((alert, i) => (
                <motion.div 
                  key={i}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-[10px] text-red-200 leading-relaxed"
                >
                  {alert}
                </motion.div>
              ))}
            </div>
          </section>
        )}

        <section className="space-y-4">
          <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-daedalus-muted">Project Metrics</h3>
          <div className="glass-panel p-4 space-y-4">
            <MetricRow label="Complexity" value="Low" />
            <MetricRow label="Scalability" value="98%" />
            <MetricRow label="Ethics Score" value="100" />
            <div className="pt-2 border-t border-white/5">
              <p className="text-[10px] text-daedalus-muted font-mono mb-2">Neural Load</p>
              <div className="flex gap-1 h-8 items-end">
                {[...Array(12)].map((_, i) => (
                  <motion.div 
                    key={i}
                    className="flex-1 bg-daedalus-accent/30 rounded-t-sm"
                    animate={{ height: `${Math.random() * 100}%` }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse', delay: i * 0.1 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </aside>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative overflow-hidden",
        active ? "bg-daedalus-accent/10 text-daedalus-accent" : "hover:bg-white/5 text-daedalus-muted hover:text-daedalus-ink"
      )}
    >
      {active && <motion.div layoutId="active-pill" className="absolute left-0 w-1 h-6 bg-daedalus-accent rounded-r-full" />}
      {icon}
      <span className="text-sm font-medium">{label}</span>
      <ChevronRight className={cn("w-4 h-4 ml-auto transition-transform", active ? "rotate-90" : "group-hover:translate-x-1")} />
    </button>
  );
}

function MobileNavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 px-6 py-4 border-b border-daedalus-border transition-colors",
        active ? "bg-daedalus-accent/10 text-daedalus-accent" : "text-daedalus-muted"
      )}
    >
      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", active ? "bg-daedalus-accent/20" : "bg-white/5")}>
        {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { className: "w-5 h-5" }) : icon}
      </div>
      <span className="text-lg font-medium">{label}</span>
      {active && <div className="ml-auto w-2 h-2 bg-daedalus-accent rounded-full" />}
    </button>
  );
}

function RoleSelector({ currentRole, onRoleChange }: { currentRole: UserRole, onRoleChange: (role: UserRole) => void }) {
  return (
    <div className="glass-panel p-3 space-y-2">
      <p className="text-[10px] font-mono uppercase tracking-widest text-daedalus-muted">Access Level</p>
      <select 
        value={currentRole}
        onChange={(e) => onRoleChange(e.target.value as UserRole)}
        className="w-full bg-transparent text-xs font-medium focus:outline-none cursor-pointer"
      >
        <option value="Visionary Thinker" className="bg-daedalus-bg">Visionary Thinker</option>
        <option value="Technical Lead" className="bg-daedalus-bg">Technical Lead</option>
        <option value="QA Tester" className="bg-daedalus-bg">QA Tester</option>
      </select>
    </div>
  );
}

function ModuleCard({ icon, title, status }: { icon: React.ReactNode, title: string, status: string }) {
  return (
    <div className="glass-panel p-3 flex items-center gap-3 group hover:border-daedalus-accent/30 transition-colors cursor-pointer">
      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:text-daedalus-accent transition-colors">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium truncate">{title}</p>
        <p className={cn("text-[10px] font-mono", status === 'Active' ? "text-daedalus-accent" : "text-daedalus-muted")}>{status}</p>
      </div>
    </div>
  );
}

function MetricRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-daedalus-muted">{label}</span>
      <span className="text-xs font-mono font-bold text-daedalus-accent">{value}</span>
    </div>
  );
}
