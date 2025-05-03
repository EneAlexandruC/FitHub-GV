require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// Streaming endpoint pentru AI chat
app.post('/api/ai-assistant-stream', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const ollamaRes = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistral',
        stream: true,
        messages: [
          { role: 'system', content: 'You are a helpful fitness assistant for the FitHub app. Answer in English, be concise and pragmatic, and always format your answer using Markdown (with paragraphs, bold, lists, etc).' },
          { role: 'user', content: message },
        ]
      })
    });
    const reader = ollamaRes.body;
    let buffer = '';
    reader.on('data', chunk => {
      buffer += chunk.toString();
      let lines = buffer.split('\n');
      buffer = lines.pop();
      for (const line of lines) {
        if (line.trim()) {
          try {
            const data = JSON.parse(line);
            if (data.message && data.message.content) {
              res.write(`data: ${JSON.stringify({ delta: data.message.content })}\n\n`);
            }
          } catch (e) { /* ignoră linii incomplete */ }
        }
      }
    });
    reader.on('end', () => {
      res.write('data: {"done":true}\n\n');
      res.end();
    });
    reader.on('error', (err) => {
      res.write('data: {"error":true}\n\n');
      res.end();
    });
  } catch (err) {
    res.write('data: {"error":true}\n\n');
    res.end();
  }
});

app.post('/api/ai-assistant', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }
  try {
    const ollamaRes = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistral',
        messages: [
          { role: 'system', content: 'You are a helpful fitness assistant for the FitHub app. Answer in Romanian.' },
          { role: 'user', content: message },
        ]
      })
    });

    // Citește tot răspunsul ca text și parcurge fiecare linie JSON
    const raw = await ollamaRes.text();
    let fullContent = '';
    raw.split('\n').forEach(line => {
      if (line.trim()) {
        try {
          const data = JSON.parse(line);
          if (data.message && data.message.content) {
            fullContent += data.message.content;
          }
        } catch (e) { /* ignoră linii incomplete */ }
      }
    });

    res.json({ reply: fullContent || 'Nu am găsit un răspuns.' });
  } catch (err) {
    console.error('Eroare Ollama:', err);
    res.status(500).json({ error: 'Eroare la conectarea cu Ollama.', details: err.message || err.toString() });
  }
});

app.listen(port, () => {
  console.log(`AI Assistant API server running on port ${port}`);
});
