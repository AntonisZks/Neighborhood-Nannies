import React, { useState, useEffect } from 'react';
import styles from './chat.module.css';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user', timestamp: new Date().toLocaleTimeString() }]);
      setInput('');
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  useEffect(() => {
    if (isTyping) {
      const timeout = setTimeout(() => setIsTyping(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [isTyping]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
        <h2>Chat</h2>
      </div>
      <div className={styles.messagesContainer}>
        {messages.map((message, index) => (
          <div key={index} className={`${styles.message} ${styles.userMessage}`}>
            <span>{message.text}</span>
            <small className={styles.timestamp}>{message.timestamp}</small>
          </div>
        ))}
      </div>
      {isTyping && <div className={styles.typingIndicator}>User is typing...</div>}
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}