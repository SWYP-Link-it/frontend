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
  title: '링킷 | 스킬 공유 플랫폼',
  description: '스킬을 공유하고 크레딧으로 성장하는 새로운 배움을 경험해보세요',
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
