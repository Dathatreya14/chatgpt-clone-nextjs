'use client';

import { useState } from 'react';
import { Container, Form, Button, ListGroup, Spinner } from 'react-bootstrap';
import { trpc } from '@/utils/trpc';

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<{ role: string; content: string }[]>([]);

  const mutation = trpc.chat.sendMessage.useMutation({
    onSuccess(data) {
      setChat((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    },
  });

  const handleSend = () => {
    if (!message.trim()) return;
    setChat((prev) => [...prev, { role: 'user', content: message }]);
    mutation.mutate({ message });
    setMessage('');
  };

  return (
    <Container fluid className="p-0 vh-100 d-flex flex-column">
      <div className="bg-dark text-white p-3 text-center">
        <h5 className="m-0">ChatGPT Mobile Clone</h5>
      </div>

      <ListGroup variant="flush" className="flex-grow-1 overflow-auto">
        {chat.map((msg, idx) => (
          <ListGroup.Item
            key={idx}
            className={`border-0 ${
              msg.role === 'user' ? 'text-end bg-primary-subtle' : 'text-start'
            }`}
          >
            <small className="d-block fw-bold text-muted">{msg.role}</small>
            {msg.content}
          </ListGroup.Item>
        ))}
        {mutation.isLoading && (
          <ListGroup.Item className="text-center">
            <Spinner animation="border" size="sm" />
          </ListGroup.Item>
        )}
      </ListGroup>

      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="d-flex border-top p-2"
      >
        <Form.Control
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit" variant="primary" className="ms-2">
          Send
        </Button>
      </Form>
    </Container>
  );
}
