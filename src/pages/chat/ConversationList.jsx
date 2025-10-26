import React from 'react';
import styles from './chat.module.css';

export default function ConversationList({ conversations = [], selectedId, onSelect }) {
  return (
    <div className={styles.conversationsColumn}>
      <div className={styles.conversationsHeader}>Συνομιλίες</div>
      <div className={styles.conversationsList}>
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
