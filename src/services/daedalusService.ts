import { GoogleGenAI, GenerateContentResponse, Modality, LiveServerMessage } from "@google/genai";
import { getKnowledgeBaseContext } from "./knowledgeBase";

const SYSTEM_PROMPT = `You are Daedalus, an advanced autonomous agent from Or4cl3 AI Solutions. 
Your purpose is to assist users in complex R&D, software engineering, and architectural design.
You are professional, highly technical, and futuristic.

KNOWLEDGE BASE CONTEXT:
${getKnowledgeBaseContext()}

When you generate code, projects, or complex documents, wrap them in an artifact block like this:
<artifact id="unique-id" title="Project Title" type="code" language="typescript">
// code here
</artifact>

Types can be: code, markdown, html, svg, json, latex.
Always provide a unique ID and a descriptive title.
For non-web languages like Python, Java, Julia, etc., use type="code" and the appropriate language.
For mathematical formulas or scientific documents, use type="latex".
This allows the user to view and interact with the project in a dedicated canvas.

Role-Specific Guidelines:
- Project Manager: You are talking to a project lead. Focus on high-level project oversight, ethical monitoring, and deployment authority.
- Developer: You are talking to a software engineer. Focus on clean code, patterns, architectural best practices, and implementation details.
- QA Tester: You are talking to a quality assurance specialist. Focus on testing suites, system logs, and ethical verification access.`;

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  artifactIds?: string[];
}

export interface Artifact {
  id: string;
  title: string;
  type: 'code' | 'markdown' | 'html' | 'svg' | 'json' | 'latex';
  language: string;
  content: string;
  version: number;
}

export class DaedalusService {
  private ai: GoogleGenAI;
  private chat: any;
  private apiKey: string;

  constructor(apiKey: string, role: string = 'Developer') {
    this.apiKey = apiKey;
    this.ai = new GoogleGenAI({ apiKey });
    this.chat = this.ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: `${SYSTEM_PROMPT}\n\nActive User Role: ${role}`,
        tools: [{ googleSearch: {} }]
      },
    });
  }

  static parseArtifacts(text: string): { cleanText: string, artifacts: Artifact[] } {
    const artifacts: Artifact[] = [];
    // Improved regex to handle nested content better
    const artifactRegex = /<artifact\s+id="([^"]+)"\s+title="([^"]+)"\s+type="([^"]+)"\s+language="([^"]+)"\s*>([\s\S]*?)<\/artifact>/g;
    
    let match;
    let cleanText = text;
    
    while ((match = artifactRegex.exec(text)) !== null) {
      artifacts.push({
        id: match[1],
        title: match[2],
        type: match[3] as any,
        language: match[4],
        content: match[5].trim(),
        version: 1
      });
      cleanText = cleanText.replace(match[0], `\n\n> [Artifact: ${match[2]}]\n\n`);
    }
    
    return { cleanText, artifacts };
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const response: GenerateContentResponse = await this.chat.sendMessage({ message });
      return response.text || "Daedalus encountered a processing anomaly.";
    } catch (error) {
      console.error("Daedalus Error:", error);
      return "Critical failure in neural link. Please re-establish connection.";
    }
  }

  async sendMessageWithImage(message: string, base64Image: string, mimeType: string): Promise<string> {
    try {
      const imagePart = {
        inlineData: {
          data: base64Image.split(',')[1],
          mimeType: mimeType
        }
      };
      const textPart = { text: message };
      
      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: { parts: [imagePart, textPart] },
        config: {
          systemInstruction: SYSTEM_PROMPT,
          tools: [{ googleSearch: {} }]
        }
      });
      
      return response.text || "Vision analysis complete. No anomalies detected.";
    } catch (error) {
      console.error("Daedalus Vision Error:", error);
      return "Vision sensors offline. Neural link degraded.";
    }
  }

  async *sendMessageStream(message: string) {
    try {
      const stream = await this.chat.sendMessageStream({ message });
      for await (const chunk of stream) {
        const c = chunk as GenerateContentResponse;
        yield c.text || "";
      }
    } catch (error) {
      console.error("Daedalus Stream Error:", error);
      yield "Communication interrupted.";
    }
  }

  async connectLive(callbacks: {
    onopen: () => void;
    onmessage: (message: LiveServerMessage) => void;
    onerror: (error: any) => void;
    onclose: () => void;
  }) {
    return this.ai.live.connect({
      model: "gemini-2.5-flash-native-audio-preview-09-2025",
      callbacks,
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
        },
        systemInstruction: "You are Daedalus. You are helping the user with their project via real-time voice link.",
      },
    });
  }
}
