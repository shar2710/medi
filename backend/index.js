require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fetch = require('node-fetch'); 
// const app = express(); // Removed duplicate declaration
// ...existing code...
// require or import from './src/advanced.py', './src/basic.py', etc.
// ...existing code...
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

const HF_API_KEY = process.env.HF_API_KEY;
const HF_API_URL = 'https://api-inference.huggingface.co/models/facebook/blenderbot-3B';

async function hfChat(prompt) {
  try {
    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: { max_new_tokens: 100 }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Hugging Face API error:', response.status, errorText);
      return `Hugging Face API error: ${response.status} - ${errorText}`;
    }

    const data = await response.json();
    console.log('HF Response:', data);

    return data[0]?.generated_text || data[0]?.output_text || 'No text generated.';
  } catch (err) {
    console.error('❌ Hugging Face API fetch error:', err);
    return `Hugging Face API fetch error: ${err.message}`;
  }
}

app.post('/api/advanced-chat', async (req, res) => {
  const { message } = req.body;
  try {
    const reply = await hfChat(message);
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: 'Hugging Face API error', details: err.message });
  }
});

app.post('/api/basic-chat', async (req, res) => {
  const { message } = req.body;
  try {
    const reply = await hfChat(message);
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: 'Hugging Face API error', details: err.message });
  }
});

app.post('/api/report-assistant', async (req, res) => {
  res.json({ reply: 'Report assistant feature coming soon.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
