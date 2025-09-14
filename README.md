
# MediBot
MediBot is a suite of advanced medical chatbots designed to assist with various healthcare tasks. The project is organized into three main applications: Basic, Report Assistant, and Advanced, each providing specialized functionalities for different use cases.

## Table of Contents
- Introduction
- Demo Video
- Installation
- Usage
- Features
- Dependencies
- Configuration
- Contributors

## Introduction
MediBot is designed to offer medical assistance through interactive chat interfaces. It utilizes Google's Gemini API to provide responses and facilitate conversations tailored to medical contexts. The project includes:

- **Basic**: A simple chat interface for basic medical queries.
- **Report Assistant**: Assists with report analysis and answers questions based on provided documents.
- **Advanced**: A comprehensive medical diagnostic system with multiple agents and tasks.

## Demo Video
Demo Video

## Installation
To set up MediBot, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/MediBot.git
   cd MediBot
   ```
2. Create and activate a Python virtual environment (for backend Python logic):
   ```bash
   python3 -m venv env
   source env/bin/activate
   ```
3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   pip install -r requirements.txt
   ```
4. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```
5. Set up environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add your Gemini API key:
     ```
     GEMINI_API_KEY=your_gemini_api_key
     ```

## Usage

### Backend
Start the backend server:
```bash
cd backend
npm start
```

### Frontend
Start the React frontend:
```bash
cd frontend
npm start
```

### Python Apps (Optional)
To run the Python-based chatbots (if using Panel):
```bash
panel serve src/basic.py
panel serve src/report_assisstant.py
panel serve src/advanced.py
```
Or all together:
```bash
panel serve src/advanced.py src/basic.py src/report_assisstant.py
```

#### Integrate Panel App in React
To show the Python Panel app inside your React frontend, add an iframe in your React component:

```jsx
<iframe
   src="http://localhost:5006/"
   title="MediBot Panel"
   style={{ width: '100%', height: '800px', border: 'none' }}
/>
```
Place this in any React component (e.g., `App.js`) to embed the Panel dashboard UI directly in your React app.

## Features

**Basic:**
- Simple chat interface
- Real-time responses using Gemini API

**Report Assistant:**
- Upload PDF reports for analysis
- Retrieve answers to queries based on the content of the reports (Gemini API)

**Advanced:**
- Multi-agent system with specific roles (Medical Interviewer, Medical Diagnostician, General Doctor)
- Sequential task processing for comprehensive diagnostics
- Customizable human interface for interaction (Gemini API)

## Dependencies

- panel
- dotenv
- langchain
- chroma
- crew
- crewai
- requests

## Configuration

### YAML Configuration Files
- **Agents Configuration (`config/agents.yaml`)**: Defines the agents involved in the diagnostic process.
- **Tasks Configuration (`config/tasks.yaml`)**: Specifies the tasks and the sequence of their execution.

---
© 2025 MediBot. All rights reserved.