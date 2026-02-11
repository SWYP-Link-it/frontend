import { LoginContent } from '@/src/features/auth/LoginContent';
import Image from 'next/image';

export default function Login() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(54.47%_52.89%_at_50%_0%,rgba(108,214,245,0.2)_0%,rgba(254,226,253,0.2)_100%)]">
      <Image
        className="fixed top-12.5 left-25"
        src="/icons/logo.svg"
        alt="logo"
        width={134}
        height={54}
      />
      <LoginContent />
    </div>
  );
}
