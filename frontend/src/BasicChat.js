import React, { useState } from 'react';

function BasicChat() {
  const [input, setInput] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setReply('');
    try {
      const res = await fetch('/api/basic-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      if (!res.ok) throw new Error('Server error');
      const data = await res.json();
      setReply(data.reply || 'No response.');
    } catch (err) {
      setReply('Error: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 style={{ color: '#38ada9', marginBottom: '1rem' }}>Basic Chat</h2>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type your message"
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
        disabled={loading}
        style={{
          background: '#38ada9',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          padding: '0.7rem 1.5rem',
          fontSize: '1rem',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '1rem',
        }}
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
      <div style={{ background: '#f1f2f6', borderRadius: '8px', padding: '1rem', minHeight: '2rem', color: '#222' }}>
        <strong>Reply:</strong> {reply}
      </div>
    </div>
  );
}

export default BasicChat;
