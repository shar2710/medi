
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

const { spawn } = require('child_process');

function runPythonScript(script, args = []) {
  return new Promise((resolve, reject) => {
    const py = spawn('python', [script, ...args]);
    let data = '';
    let error = '';
    py.stdout.on('data', (chunk) => { data += chunk; });
    py.stderr.on('data', (chunk) => { error += chunk; });
    py.on('close', (code) => {
      if (code === 0) {
        resolve(data);
      } else {
        reject(error || `Python script exited with code ${code}`);
      }
    });
  });
}


app.post('/api/advanced-chat', async (req, res) => {
  const { message } = req.body;
  try {
    const result = await runPythonScript('./src/advanced.py', [message]);
    res.json({ reply: result });
  } catch (err) {
    res.status(500).json({ error: 'Python error', details: err });
  }
});


app.post('/api/basic-chat', async (req, res) => {
  const { message } = req.body;
  try {
    const result = await runPythonScript('./src/basic.py', [message]);
    res.json({ reply: result });
  } catch (err) {
    res.status(500).json({ error: 'Python error', details: err });
  }
});


app.post('/api/report-assistant', async (req, res) => {
  // For file uploads, you may need to handle multipart/form-data and pass the file path to Python
  // Here, just call the Python script for demonstration
  try {
    const result = await runPythonScript('./src/report_assisstant.py');
    res.json({ reply: result });
  } catch (err) {
    res.status(500).json({ error: 'Python error', details: err });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
