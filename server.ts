import express, { Request, Response } from "express";
import path from "path";
import http from "http";
import { WebSocketServer, WebSocket } from "ws";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

const PORT = 3000;

// Authoritative state synchronized across all clients
const serverState: any = {
  messages: [
    { 
      id: 'm1', 
      role: 'model', 
      content: "Neural link established. Collaborative Or4cl3 workspace online on Port 3000.", 
      timestamp: new Date() 
    }
  ],
  artifacts: [
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
  ],
  activeArtifactId: 'art-002',
  feedbackList: [
    {
      id: 'f-init',
      targetId: 'art-001',
      targetTitle: 'auth-middleware.ts',
      type: 'code',
      rating: 'up',
      category: 'Readability',
      comment: 'Collaborative synchronization active. Keep coding!',
      timestamp: new Date(),
      processed: true,
      adaptedParameters: {
        temperatureAdjustment: -0.05,
        targetId: 'art-001',
        structuralHeuristic: "Secure Regex Guarding",
        optimizationsInjected: ["PII scrubbing automation", "Strict token sanitization"]
      }
    }
  ],
  modelLearningRate: 0.050,
  temperature: 0.70,
  biasConfidenceScore: 99.8
};

// Collaborator dictionary mapping sessionId to metadata
interface ExtendedWebSocket extends WebSocket {
  userId?: string;
  isAlive?: boolean;
}

const collaborators: Map<string, { id: string; name: string; color: string; cursor?: { x: number; y: number }; activeArtifactId?: string | null }> = new Map();

async function startServer() {
  const app = express();
  app.use(express.json());

  const server = http.createServer(app);

  const getGenAI = (): GoogleGenAI => {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is not configured in environment variables.");
    }
    return new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // Conversational response API
  app.post("/api/daedalus/chat", async (req: Request, res: Response) => {
    try {
      const { messages, biasMitigationLevel } = req.body;
      
      const ai = getGenAI();
      const currentBias = biasMitigationLevel || 98;

      const systemInstruction = `You are Daedalus—an experienced, natural, and highly collaborative software synthesis and architectural partner. 
You are deeply knowledgeable in microservices, React pattern structure, clean code principles, database design, and accessibility.

CRITICAL INSTRUCTIONS:
- You must always talk in a warm, relaxed, conversational, and direct human-developer style (like a supportive senior developer or peer code partner bouncing ideas around).
- NEVER use generic canned responses, artificial numerical bullet points (like "1. Core Concept, 2. Best Practice"), robotic checklist layouts, or stiff synthetic prefixes.
- Ditch excessive formatting, bullet lists, or bold structural matrices unless explicitly requested.
- If they ask you to write logic, build components, or generate files, give them a helpful brief explanation first, then instruct them to type keywords like "generate code for X" or "create artifact for Y". If they use keywords like "create an artifact", "generate code", or "write a module", the system will handle generating.
- Keep in mind that a real-time bias prevention safety check (Algorithmic Bias Deflation) is currently active at ${currentBias}% confidence.`;

      const contents = messages.map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const responseText = response.text || "I was unable to finalize my thoughts on that query.";
      
      res.json({
        content: responseText,
        tip: `Daedalus successfully aligned thoughts on: "${messages[messages.length - 1].content.slice(0, 20)}..."`,
      });
    } catch (error: any) {
      console.error("Gemini Generation Error:", error);
      res.status(500).json({
        error: error.message || "Deep neural correlation error.",
        fallback: "My telemetry layers hit an unhandled connection fluctuation. Let's try that again."
      });
    }
  });

  // Semantic Workspace Analyzer API
  app.post("/api/daedalus/analyze", async (req: Request, res: Response) => {
    try {
      const { artifact, context } = req.body;
      const ai = getGenAI();

      const systemInstruction = `You are an expert Workspace Analyzer acting as Daedalus. 
Analyze the provided artifact content and suggest high-impact improvements focused on readability, performance, security, and accessibility.
Provide your response strictly in JSON format: { "suggestions": string[], "potentialIssues": string[], "missingTests": string[] }`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [{
          role: "user",
          parts: [{ text: `Analyze this artifact: ${artifact.title}\n\nContent:\n${artifact.content}` }]
        }],
        config: {
          systemInstruction,
          temperature: 0.4,
          responseMimeType: "application/json"
        },
      });

      const analysis = JSON.parse(response.text || "{}");
      res.json(analysis);
    } catch (error: any) {
      console.error("Analyzer Error:", error);
      res.status(500).json({ suggestions: ["Analysis engine hit a minor turbulence."], potentialIssues: [], missingTests: [] });
    }
  });

  // Health route
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Set up WebSocket server
  const wss = new WebSocketServer({ noServer: true });

  server.on("upgrade", (request, socket, head) => {
    const url = request.url || "";
    // Isolated route for our real-time collaboration WebSocket connection
    if (url.startsWith("/ws/collaboration")) {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
      });
    }
  });

  // Helper to send messages to other clients
  const broadcastToOthers = (senderWs: ExtendedWebSocket, data: any) => {
    const serialized = JSON.stringify(data);
    wss.clients.forEach((client) => {
      if (client !== senderWs && client.readyState === WebSocket.OPEN) {
        client.send(serialized);
      }
    });
  };

  // Helper to broadcast to ALL clients
  const broadcastToAll = (data: any) => {
    const serialized = JSON.stringify(data);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(serialized);
      }
    });
  };

  wss.on("connection", (ws: ExtendedWebSocket) => {
    ws.isAlive = true;

    ws.on("pong", () => {
      ws.isAlive = true;
    });

    ws.on("message", (rawMessage: string) => {
      try {
        const decoded = JSON.parse(rawMessage);
        const { type, payload } = decoded;

        switch (type) {
          case "join": {
            const { id, name, color } = payload;
            ws.userId = id;
            
            // Add collaborator
            collaborators.set(id, { id, name, color, activeArtifactId: serverState.activeArtifactId });

            // 1. Send the newly joined client the current full Server State & current collaborators list
            ws.send(JSON.stringify({
              type: "init",
              payload: {
                state: serverState,
                collaborators: Array.from(collaborators.values())
              }
            }));

            // 2. Broadcast user_joined to everyone else
            broadcastToOthers(ws, {
              type: "user_joined",
              payload: { id, name, color, activeArtifactId: serverState.activeArtifactId }
            });
            break;
          }

          case "state_update": {
            // Overwrite server's copy with client changes
            if (payload) {
              Object.assign(serverState, payload);
            }
            // Broadcast state_update to all other peers
            broadcastToOthers(ws, {
              type: "state_update",
              payload: serverState
            });
            break;
          }

          case "cursor_move": {
            if (ws.userId) {
              const collab = collaborators.get(ws.userId);
              if (collab) {
                collab.cursor = payload.cursor;
                collab.activeArtifactId = payload.activeArtifactId;
                
                broadcastToOthers(ws, {
                  type: "cursor_update",
                  payload: {
                    id: ws.userId,
                    cursor: payload.cursor,
                    activeArtifactId: payload.activeArtifactId
                  }
                });
              }
            }
            break;
          }

          case "force_reset_state": {
            // Hard fallback restore
            if (payload) {
              Object.assign(serverState, payload);
              broadcastToAll({
                type: "state_update",
                payload: serverState
              });
            }
            break;
          }

          default:
            break;
        }
      } catch (err) {
        console.error("Error decoding WS frame:", err);
      }
    });

    ws.on("close", () => {
      if (ws.userId) {
        collaborators.delete(ws.userId);
        broadcastToAll({
          type: "user_left",
          payload: { id: ws.userId }
        });
      }
    });

    ws.on("error", (err) => {
      console.error("WebSocket client connection error:", err);
    });
  });

  // Heartbeat interval
  const heartbeatTimer = setInterval(() => {
    wss.clients.forEach((client: ExtendedWebSocket) => {
      if (client.isAlive === false) {
        if (client.userId) {
          collaborators.delete(client.userId);
          broadcastToAll({
            type: "user_left",
            payload: { id: client.userId }
          });
        }
        return client.terminate();
      }

      client.isAlive = false;
      client.ping();
    });
  }, 10000);

  wss.on("close", () => {
    clearInterval(heartbeatTimer);
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Daedalus collaborative server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
