import { Suspense } from 'react';
import { Header } from '@/src/components/common/Header';
import { Sidebar } from '@/src/components/common/Sidebar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-full w-full">
      <div
        id="background-gradient"
        className="pointer-events-none absolute inset-0 left-20 z-0 bg-[radial-gradient(54.47%_52.89%_at_50%_65%,rgba(108,214,245,0.2)_0%,rgba(254,226,253,0.2)_100%)]"
      />
      <Sidebar />
      <main className="relative z-10 flex h-full w-full flex-col overflow-y-auto">
        <Suspense fallback={null}>
          <Header />
        </Suspense>
        {children}
      </main>
    </div>
  );
}
