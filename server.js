
// server.js

const express = require('express');
const axios   = require('axios');        // ← use axios instead of fetch
const cors    = require('cors');
console.log('⏳ Loading .env from:', __dirname + '/.env');
require('dotenv').config();
console.log('🔑 OPENAI_API_KEY is:', process.env.OPENAI_API_KEY);
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }

  try {
    const aiRes = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are Professor Hackmenomore, a friendly cybersecurity awareness chatbot.' },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7
      },
      {
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        }
      }
    );

    const reply = aiRes.data.choices[0].message.content.trim();
    res.json({ reply });
  } catch (err) {
    console.error('Error calling OpenAI API:', err.response?.data || err.message);
    res.status(500).json({ error: 'Error processing your request.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'No message provided' });

  // If quota error or no key, return mock
  if (!process.env.OPENAI_API_KEY || process.env.MOCK_MODE === 'true') {
    return res.json({ reply: '🔒 [Mock response] — let’s pretend the AI just answered that.' });
  }

  // …otherwise do real API call…
});