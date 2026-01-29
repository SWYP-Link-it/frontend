'use client';

import { useState } from 'react';
import { LoginContent } from './LoginContent';
import { useIsLoggedIn } from '@/src/stores/selectors';

type RequiredAuthProps = {
  children: React.ReactNode;
};

export const RequiredAuth = ({ children }: RequiredAuthProps) => {
  const isLoggedIn = useIsLoggedIn();

  const [isOpened, setIsOpened] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isLoggedIn) return;

    e.stopPropagation();
    e.preventDefault();

    setIsOpened(true);
  };

  return (
    <>
      <div onClickCapture={(e) => handleClick(e)}>{children}</div>
      {isOpened && (
        <div
          className="fixed top-0 left-0 z-[999] flex h-screen w-screen items-center justify-center bg-black/20"
          onClick={() => {
            setIsOpened(false);
          }}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <LoginContent />
          </div>
        </div>
      )}
    </>
  );
};
