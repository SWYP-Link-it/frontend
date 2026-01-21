import { LoginContent } from '@/src/features/auth/LoginContent';
import Image from 'next/image';

export default function Login() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-sky-50">
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
