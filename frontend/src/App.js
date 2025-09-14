import React from 'react';
import AdvancedChat from './AdvancedChat';
import BasicChat from './BasicChat';
import ReportAssistant from './ReportAssistant';

const containerStyle = {
  background: 'linear-gradient(135deg, #f0f4ff, #e8f7f6)',
  minHeight: '100vh',
  padding: '3rem 1rem',
  fontFamily: "'Segoe UI', sans-serif",
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const headingStyle = {
  textAlign: 'center',
  color: '#2c3e50',
  marginBottom: '2.5rem',
  fontSize: '2.5rem',
  fontWeight: '700',
  letterSpacing: '1px',
};

const cardContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '2rem',
  width: '100%',
  maxWidth: '1200px',
};

const cardStyle = {
  background: '#fff',
  borderRadius: '16px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  padding: '2rem',
  textAlign: 'center',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
};

const cardHoverStyle = {
  transform: 'translateY(-6px)',
  boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
};

const footerStyle = {
  textAlign: 'center',
  color: '#666',
  marginTop: '3rem',
  fontSize: '0.9rem',
};

function App() {
  const [hoveredCard, setHoveredCard] = React.useState(null);

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>MediBot</h1>

      <div style={cardContainerStyle}>
        {[<AdvancedChat />, <BasicChat />, <ReportAssistant />].map((component, index) => (
          <div
            key={index}
            style={{
              ...cardStyle,
              ...(hoveredCard === index ? cardHoverStyle : {}),
            }}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {component}
          </div>
        ))}
      </div>

      <footer style={footerStyle}>
        &copy; 2025 MediBot. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
