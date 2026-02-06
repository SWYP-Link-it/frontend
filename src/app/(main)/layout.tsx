import { Header } from '@/src/components/common/Header';
import { Sidebar } from '@/src/components/common/Sidebar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-brand-50 flex h-screen w-full">
      <Sidebar />
      <main className="flex flex-1 flex-col overflow-y-auto">
        <Header />
        {children}
      </main>
    </div>
  );
}
