'use client';

import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

interface ChatInputProps {
  onSend: (message: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend(message);
    setMessage('');
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="d-flex gap-2 p-2 border-top bg-light"
    >
      <Form.Control
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-grow-1"
      />
      <Button type="submit" variant="primary">
        Send
      </Button>
    </Form>
  );
}
