'use client';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex-grow-1 overflow-auto p-2">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`mb-2 p-2 rounded ${
            msg.role === 'user'
              ? 'bg-primary text-white align-self-end'
              : 'bg-secondary text-white align-self-start'
          }`}
          style={{ maxWidth: '80%', wordWrap: 'break-word' }}
        >
          {msg.content}
        </div>
      ))}
    </div>
  );
}
