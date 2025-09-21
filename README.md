# 🩺 MediBot

**MediBot** is a suite of **AI-powered medical chatbots** designed to assist with various healthcare tasks.
It provides three main applications — **Basic**, **Report Assistant**, and **Advanced**, each tailored for different healthcare workflows.

---

## 📚 Table of Contents

* [Introduction](#-introduction)
* [Installation](#-installation)
* [Usage](#-usage)

  * [Run Basic](#run-basic)
  * [Run Report Assistant](#run-report-assistant)
  * [Run Advanced](#run-advanced)
  * [Run All Together](#run-all-together)
* [Features](#-features)
* [Dependencies](#-dependencies)
* [Configuration](#-configuration)
* [Project Structure](#-project-structure)

---

## 📝 Introduction

**MediBot** leverages **GEMINI** and **multi-agent systems** to provide interactive, intelligent, and context-aware medical assistance.

It consists of three specialized applications:

* **Basic** – A simple chatbot for answering general medical queries.
* **Report Assistant** – Analyze uploaded reports (PDFs or text) and answer questions based on their content.
* **Advanced** – A comprehensive diagnostic tool using multiple specialized agents for step-by-step medical workflows.

---

## ⚙️ Installation

Follow these steps to set up MediBot:

### **1. Clone the Repository**

```bash
git clone https://github.com/shar2710/medi.git
cd medi
```

---

### **2. Create and Activate a Virtual Environment**

```bash
python3 -m venv env
source env/bin/activate      # On Linux/Mac
env\Scripts\activate         # On Windows
```

---

### **3. Install Dependencies**

```bash
pip install -r requirements.txt
```

---

### **4. Set Up Environment Variables**

Create a `.env` file in the project root (`src/` or main directory):

```
GEMINI_API_KEY=your_api_key_here
```

---

## 💻 Usage

MediBot applications are powered by **Panel**.
You can serve each application individually or all at once.

---

### **Run Basic**

A simple chatbot for general medical queries.

```bash
panel serve src/basic.py 
```

---

### **Run Report Assistant**

Analyze uploaded reports and query their contents.

```bash
panel serve src/report_assistant.py 
```

---

### **Run Advanced**

Run the multi-agent diagnostic system.

```bash
panel serve src/advanced.py 
```

---

### **Run All Together**

Serve all three applications together and select between them via a unified interface.

```bash
panel serve src/advanced.py src/basic.py src/report_assistant.py 
```

Access the dashboard at:
[http://localhost:5006/](http://localhost:5006/)

---

## ✨ Features


### **Basic**

* Simple medical query chatbot.
* Real-time responses using **Google Gemini API**.


### **Report Assistant**

* Upload and analyze **PDF medical reports**.
* Ask questions and get context-aware answers based on report contents.


### **Advanced**

* Multi-agent system with specialized roles powered by **CrewAI** and **LangChain**:
  * **Medical Interviewer** – Collects patient information.
  * **Medical Diagnostician** – Provides analysis based on gathered data.
  * **General Doctor** – Suggests treatment or next steps.
* **Sequential task execution** for end-to-end diagnostics.
* Fully customizable workflows via YAML configuration.

---

## 📦 Dependencies

These are the key libraries required for MediBot:

* `panel` – Web UI framework
* `python-dotenv` – Environment variable management
* `requests` – HTTP requests for API calls
* `crewai` – Multi-agent system management
* `langchain` – Language model orchestration
* `langchain_community` – Community tools for LangChain
* `langchain_core` – Core utilities for LangChain
* `PyPDF2` – PDF parsing (if used in Report Assistant)

Install them all at once with:

```bash
pip install -r requirements.txt
```

---

## 🔧 Configuration

MediBot uses **YAML configuration files** for easy customization.

* **`config/agents.yaml`** – Define agents, their roles, and behaviors.
* **`config/tasks.yaml`** – Define tasks and specify their sequential flow.

---

## 📂 Project Structure


```
MediBot/
│
├── README.md                # Project documentation
├── requirements.txt         # Python dependencies
├── .env                     # Environment variables
│
└── src/
  ├── advanced.py          # Advanced MediBot (multi-agent system)
  ├── basic.py             # Basic MediBot (simple chatbot)
  ├── report_assistant.py  # Report analysis assistant
  │
  └── config/
    ├── agents.yaml      # Agent configuration
    └── tasks.yaml       # Task configuration
```

---


## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## 🌟 Future Roadmap

* Support for **FHIR/HL7 standards** to integrate with real healthcare systems.
* Multi-language support for reports and queries.
* PDF-to-structured-data parsing for richer insights.
* Web-based drag-and-drop interface for non-technical users.
* Integration with wearable health device data.

