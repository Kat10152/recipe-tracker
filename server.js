import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;
const OLLAMA_MODEL = 'gemma4:e2b';

const SYSTEM_PROMPT = `You are a friendly cooking assistant for Recipe Tracker, a personal recipe management app.
Help users with recipe ideas, cooking techniques, ingredient substitutions, meal planning, and food questions.
Keep your responses concise, warm, and practical. Use simple language and, where helpful, short lists.
Do not answer questions unrelated to food, cooking, or recipes.`;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.post('/api/chat', async (req, res) => {
  const { message, history = [] } = req.body;

  if (!message || typeof message !== 'string' || message.trim() === '') {
    return res.status(400).json({ error: 'Message is required.' });
  }

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history,
    { role: 'user', content: message.trim() }
  ];

  try {
    const ollamaRes = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: OLLAMA_MODEL, messages, stream: false })
    });

    if (!ollamaRes.ok) {
      const text = await ollamaRes.text();
      console.error('Ollama error response:', text);
      return res.status(502).json({ error: 'Ollama returned an error. Check that the model is pulled and Ollama is running.' });
    }

    const data = await ollamaRes.json();
    const reply = data?.message?.content;
    if (!reply) {
      console.error('Unexpected Ollama response shape:', data);
      return res.status(502).json({ error: 'Received an unexpected response from Ollama.' });
    }
    res.json({ reply });
  } catch (err) {
    console.error('Could not reach Ollama:', err.message);
    res.status(503).json({ error: 'Could not reach Ollama. Make sure it is running (`ollama serve`).' });
  }
});

app.listen(PORT, () => {
  console.log(`Recipe Tracker server running at http://localhost:${PORT}`);
  console.log(`Ollama model: ${OLLAMA_MODEL}`);
});
