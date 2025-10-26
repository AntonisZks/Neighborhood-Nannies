import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './chat.module.css';

/* ConversationList now supports creating a new conversation */
function ConversationList({ conversations = [], selectedId, onSelect, onCreate }) {
  const [newName, setNewName] = useState('');

  function handleCreate() {
    const name = (newName || '').trim();
    if (!name) return;
    onCreate(name);
    setNewName('');
  }

  return (
    <div className={styles.conversationsColumn}>
      <div className={styles.conversationsHeader} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ flex: 1 }}>Συνομιλίες</span>
        <div style={{ display: 'flex', gap: 6 }}>
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Νέος χρήστης"
            style={{ padding: '4px 8px', borderRadius: 6, border: 'none', outline: 'none', fontSize: '0.9rem' }}
          />
          <button onClick={handleCreate} title="Νέα συνομιλία" style={{ padding: '6px 8px', borderRadius: 6, background: '#fff', border: '1px solid #e0e0e0', cursor: 'pointer' }}>
            Νέα
          </button>
        </div>
      </div>

      <div className={styles.conversationsList}>
        {conversations.length === 0 && (
          <div style={{ padding: '1rem', color: '#666' }}>Δεν υπάρχουν συνομιλίες. Δημιούργησε μία νέα.</div>
        )}

        {conversations.map(c => (
          <div
            key={c.id}
            className={`${styles.conversationItem} ${selectedId === c.id ? styles.activeConversation : ''}`}
            onClick={() => onSelect(c.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') onSelect(c.id); }}
          >
            <div className={styles.conversationAvatar}>
              {c.name ? c.name.charAt(0).toUpperCase() : '?'}
            </div>
            <div className={styles.conversationMeta}>
              <div className={styles.conversationName}>{c.name}</div>
              <div className={styles.conversationLast}>{c.lastMessage || ''}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const initialConversations = [];
const initialMessages = {};

export default function Chat() {
  const [conversations, setConversations] = useState(initialConversations);
  const [messages, setMessages] = useState(initialMessages);
  const [selectedId, setSelectedId] = useState(initialConversations.length ? initialConversations[0].id : null);
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // scroll to bottom when messages change or selection changes
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, selectedId, showPopup]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape' && showPopup) setShowPopup(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showPopup]);

  function handleSelect(id) {
    setSelectedId(id);
  }

  /* Create a new conversation, initialize its messages array and select it */
  function createConversation(name) {
    const id = Date.now().toString();
    const conv = { id, name, lastMessage: '' };
    setConversations(prev => [conv, ...prev]);
    setMessages(prev => ({ ...prev, [id]: [] }));
    setSelectedId(id);
  }

  function handleSend(e) {
    e && e.preventDefault();
    if (!text.trim() || !selectedId) return;
    const newMsg = { id: `m${Date.now()}`, sender: 'me', text: text.trim(), ts: Date.now() };
    setMessages(prev => {
      const next = { ...prev, [selectedId]: [...(prev[selectedId] || []), newMsg] };
      return next;
    });
    // update lastMessage in conversations
    setConversations(prev => prev.map(c => c.id === selectedId ? { ...c, lastMessage: newMsg.text } : c));
    setText('');
    // NOTE: Removed automatic reply simulation — replies must come from other users/backend
  }

  const currentConv = conversations.find(c => c.id === selectedId) || {};

  function renderChatContent() {
    return (
      <div className={styles.panelContent}>
        <ConversationList conversations={conversations} selectedId={selectedId} onSelect={handleSelect} onCreate={createConversation} />

        <div className={styles.chatArea}>
          <div className={styles.chatHeaderArea}>
            <div className={styles.avatar}>{currentConv.name ? currentConv.name.charAt(0).toUpperCase() : '?'}</div>
            <div style={{ fontWeight: 700 }}>{currentConv.name || 'Άγνωστος'}</div>
          </div>

          <div className={styles.chatMessagesArea}>
            {!selectedId && (
              <div style={{ padding: '1rem', color: '#666' }}>
                Επίλεξε συνομιλία ή δημιούργησε νέα για να ξεκινήσεις συζήτηση.
              </div>
            )}

            {(selectedId ? (messages[selectedId] || []) : []).map(m => (
              <div key={m.id} className={`${styles.message} ${m.sender === 'me' ? styles.userMessage : styles.receivedMessage}`}>
                <div style={{ fontSize: '0.95rem' }}>{m.text}</div>
                <small>{new Date(m.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
              </div>
            ))}

            {typing && <div className={styles.typingIndicator}>... πληκτρολογεί</div>}
            <div ref={messagesEndRef} />
          </div>

          <form className={styles.chatInputArea} onSubmit={handleSend}>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={selectedId ? "Γράψε μήνυμα..." : "Επίλεξε / δημιούργησε συνομιλία"}
              disabled={!selectedId}
              style={{ flex: 1, padding: '0.6rem 0.8rem', borderRadius: 20, border: '1px solid #ccc', outline: 'none' }}
            />
            <button type="submit" disabled={!selectedId} style={{ padding: '0.6rem 1rem', borderRadius: 20, background: selectedId ? '#007bff' : '#9bb6ea', color: '#fff', border: 'none', cursor: selectedId ? 'pointer' : 'not-allowed' }}>
              Αποστολή
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Return only the portal (floating button + popup)
  return ReactDOM.createPortal(
    <>
      <button className={styles.chatButton} onClick={() => setShowPopup(true)} aria-label="Άνοιγμα chat">
        Chat
      </button>

      {showPopup && (
        <div className={styles.chatPopup} role="dialog" aria-modal="true">
          <div className={styles.chatPanel}>
            <button className={styles.chatClose} onClick={() => setShowPopup(false)} aria-label="Κλείσιμο">✕</button>
            {renderChatContent()}
          </div>
        </div>
      )}
    </>,
    document.body
  );
}