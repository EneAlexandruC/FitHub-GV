import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './AIChatWidget.css';

// Loading spinner component
const LoadingSpinner = () => (
  <div className="loading-spinner-container">
    <div className="loading-spinner"></div>
  </div>
);

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const AIChatWidget: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    let aiMsg = { sender: 'ai' as const, text: '' };
    setMessages(prev => [...prev, aiMsg]);
    try {
      // Folosește streaming cu fetch și ReadableStream
      const response = await fetch('/api/ai-assistant-stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text }),
      });
      if (!response.body) throw new Error('No stream');
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let done = false;
      let fullText = '';
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value);
          chunk.split('\n\n').forEach((event) => {
            if (event.startsWith('data:')) {
              try {
                const payload = JSON.parse(event.slice(5));
                if (payload.delta) {
                  fullText += payload.delta;
                  setMessages(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { sender: 'ai', text: fullText };
                    return updated;
                  });
                }
              } catch (e) { /* ignore */ }
            }
          });
        }
      }
    } catch (err) {
      setMessages((prev) => [...prev.slice(0, -1), { sender: 'ai', text: 'Eroare la conectarea cu AI-ul.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  if (minimized) {
    return (
      <button className="ai-chat-fab" onClick={() => setMinimized(false)} title="Deschide chat AI">
        💬
      </button>
    );
  }

  return (
    <div className={`ai-chat-widget ${expanded ? 'expanded' : ''}`}>
      <div className="ai-chat-header">
        <span>Asistent AI FitHub</span>
        <div className="header-controls">
          <button className="expand-button" onClick={toggleExpand}>
            {expanded ? '↙' : '↗'}
          </button>
          <button className="minimize-button" onClick={() => setMinimized(true)} title="Minimizează chat-ul">–</button>
        </div>
      </div>
      <div className="ai-chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`ai-chat-message ai-chat-message-${msg.sender}`}>
            {msg.sender === 'ai' ? <ReactMarkdown>{msg.text}</ReactMarkdown> : msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="ai-chat-input-row">
        <input
          type="text"
          placeholder="Write a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()}>
          {loading ? '' : 'Send'}
          {loading && <div className="button-spinner"></div>}
        </button>
      </div>
    </div>
  );
};

export default AIChatWidget;
