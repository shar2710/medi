import React from 'react';

const containerStyle = {
  background: '#f0f4ff',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

function App() {
  return (
    <div style={containerStyle}>
      <iframe
        src="http://localhost:5006/"
        title="MediBot Panel"
        style={{ width: '100vw', height: '100vh', border: 'none' }}
      />
    </div>
  );
}

export default App;
