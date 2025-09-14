
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fetch = require('node-fetch'); 
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/medibot', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('✅ Connected to MongoDB');
});

app.get('/', (req, res) => {
  res.send('MERN Backend Running');
});

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-1.5-flash'; 
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;


async function geminiChat(prompt) {
  try {
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Gemini API error:', response.status, errorText);
      return `Gemini API error: ${response.status} - ${errorText}`;
    }

    const data = await response.json();
    console.log('Gemini Response:', data);
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No text generated.';
  } catch (err) {
    console.error('❌ Gemini API fetch error:', err);
    return `Gemini API fetch error: ${err.message}`;
  }
}

app.post('/api/advanced-chat', async (req, res) => {
  const { message } = req.body;
  try {
    const reply = await geminiChat(message);
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: 'Gemini API error', details: err.message });
  }
});

app.post('/api/basic-chat', async (req, res) => {
  const { message } = req.body;
  try {
    const reply = await geminiChat(message);
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: 'Gemini API error', details: err.message });
  }
});

app.post('/api/report-assistant', async (req, res) => {
  res.json({ reply: 'Report assistant feature coming soon.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
