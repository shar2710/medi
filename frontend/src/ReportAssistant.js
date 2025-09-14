import React, { useState } from 'react';

function ReportAssistant() {
  const [file, setFile] = useState(null);
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSend = async () => {
    if (!file) return;
    setLoading(true);
    // Placeholder: No actual PDF upload yet
    const res = await fetch('/api/report-assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    const data = await res.json();
    setReply(data.reply);
    setLoading(false);
  };

  return (
    <div>
      <h2 style={{ color: '#fa983a', marginBottom: '1rem' }}>Report Assistant</h2>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        style={{
          padding: '0.7rem',
          borderRadius: '8px',
          border: '1px solid #ddd',
          width: '80%',
          marginBottom: '1rem',
          fontSize: '1rem',
        }}
      />
      <br />
      <button
        onClick={handleSend}
        disabled={loading || !file}
        style={{
          background: '#fa983a',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          padding: '0.7rem 1.5rem',
          fontSize: '1rem',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '1rem',
        }}
      >
        {loading ? 'Sending...' : 'Send PDF'}
      </button>
      <div style={{ background: '#f1f2f6', borderRadius: '8px', padding: '1rem', minHeight: '2rem', color: '#222' }}>
        <strong>Reply:</strong> {reply}
      </div>
    </div>
  );
}

export default ReportAssistant;
