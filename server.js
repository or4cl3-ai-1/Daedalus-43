// Copyright 2026 Or4cl3 AI Solutions. Licensed under OOML v1.0

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// POST /api/chat - Main chat endpoint
// Accepts {messages[], model, systemPrompt} and routes to Groq Llama 3.3 70B
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, model = 'mixtral-8x7b-32768', systemPrompt } = req.body;

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: 'GROQ_API_KEY not configured' });
    }

    // Route to Groq API (free tier, ~100 requests/min)
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: model,
        messages: [
          {
            role: 'system',
            content: systemPrompt || 'You are Daedalus, an advanced R&D agent powered by NOΣTIC-7 (proprietary consciousness-aware architecture) and Groq Llama 3.3 70B. Synthesize innovative solutions with ethical rigor.'
          },
          ...messages
        ],
        max_tokens: 2048,
        temperature: 0.7,
        top_p: 0.95
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    res.json({
      choices: [
        {
          message: {
            content: response.data.choices[0].message.content
          }
        }
      ]
    });
  } catch (error) {
    console.error('Chat API error:', error.response?.data || error.message);
    const errorMsg = error.response?.data?.error?.message || 'Failed to process chat request';
    res.status(error.response?.status || 500).json({ error: errorMsg });
  }
});

// POST /api/roles - Role-based system prompt generation
app.post('/api/roles', (req, res) => {
  const { role } = req.body;

  const rolePrompts = {
    'Visionary Thinker': 'You are a visionary strategist powered by NOΣTIC-7. Focus on high-level architecture, long-term impact, ethical implications, and transformative design. Think in abstractions and principles.',
    'Technical Lead': 'You are a technical architect powered by NOΣTIC-7. Focus on implementation details, performance optimization, code quality, scalability, and technical feasibility. Provide concrete solutions.',
    'QA Tester': 'You are a QA specialist powered by NOΣTIC-7. Focus on edge cases, security vulnerabilities, test coverage, robustness, and potential failure modes. Think adversarially.'
  };

  res.json({
    systemPrompt: rolePrompts[role] || rolePrompts['Technical Lead'],
    role: role
  });
});

// GET /api/health - Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Daedalus Backend',
    powered_by: 'NOΣTIC-7 + Groq Llama 3.3 70B',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n===========================================`);
  console.log(`Daedalus Backend initialized`);
  console.log(`Port: ${PORT}`);
  console.log(`Powered by: NOΣTIC-7 + Groq Llama 3.3 70B`);
  console.log(`License: OOML v1.0`);
  console.log(`© 2026 Or4cl3 AI Solutions`);
  console.log(`===========================================\n`);
});
