'use client';

import { ReactNode } from 'react';

interface MobileShellProps {
  children: ReactNode;
}

export default function MobileShell({ children }: MobileShellProps) {
  return (
    <div
      className="d-flex flex-column"
      style={{
        height: '100vh',
        maxWidth: '500px',
        margin: '0 auto',
        border: '1px solid #ddd',
      }}
    >
      {children}
    </div>
  );
}
