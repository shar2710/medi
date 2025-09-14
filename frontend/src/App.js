import React from 'react';
import AdvancedChat from './AdvancedChat';
import BasicChat from './BasicChat';
import ReportAssistant from './ReportAssistant';

const cardStyle = {
  background: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  padding: '2rem',
  margin: '2rem auto',
  maxWidth: '400px',
  textAlign: 'center',
};

function App() {
  return (
    <div style={{ background: '#f5f6fa', minHeight: '100vh', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', color: '#222', marginBottom: '2rem', fontFamily: 'Segoe UI, sans-serif' }}>
        MediBot Chat Suite
      </h1>
      <div style={cardStyle}>
        <AdvancedChat />
      </div>
      <div style={cardStyle}>
        <BasicChat />
      </div>
      <div style={cardStyle}>
        <ReportAssistant />
      </div>
      <footer style={{ textAlign: 'center', color: '#888', marginTop: '2rem', fontSize: '0.9rem' }}>
        &copy; 2025 MediBot. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
