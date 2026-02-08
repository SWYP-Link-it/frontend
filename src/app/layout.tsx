import type { Metadata } from 'next';
import { ClientProviders } from '../lib/providers';
import localFont from 'next/font/local';
import './globals.css';
import { Toaster } from '../components/common/Toaster';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.ttf',
  variable: '--font-pretendard',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Link it',
  description: 'Skill shop for amateur teachers and learners',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} antialiased`}>
        <ClientProviders>
          <Toaster />
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
