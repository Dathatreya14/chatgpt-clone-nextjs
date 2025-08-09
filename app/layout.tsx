import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ChatGPT Mobile Clone',
  description: 'Mobile-only AI chat app using Next.js, tRPC, Supabase, Auth0, and Gemini API',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-light`}>{children}</body>
    </html>
  );
}
