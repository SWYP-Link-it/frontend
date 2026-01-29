import Image from 'next/image';

export default function PreAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full bg-[#F8FAFE]">
      <Image
        className="fixed top-12.5 left-25"
        src="/icons/logo.svg"
        alt="logo"
        width={134}
        height={54}
      />
      {children}
    </div>
  );
}
