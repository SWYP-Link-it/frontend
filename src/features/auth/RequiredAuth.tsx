'use client';

import { useState } from 'react';
import { LoginContent } from './LoginContent';
import { useIsLoggedIn } from '@/src/stores/selectors';
import { createPortal } from 'react-dom';

type RequiredAuthProps = {
  children: React.ReactNode;
};

export const RequiredAuth = ({ children }: RequiredAuthProps) => {
  const isLoggedIn = useIsLoggedIn();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (isLoggedIn) return;

    e.stopPropagation();
    e.preventDefault();

    setIsLoginModalOpen(true);
  };

  return (
    <>
      <div className="contents" onClickCapture={handleClick}>
        {children}
      </div>
      {isLoginModalOpen
        ? createPortal(
            <div
              className="fixed top-0 left-0 z-[999] flex h-screen w-screen items-center justify-center bg-black/20"
              onClick={() => {
                setIsLoginModalOpen(false);
              }}
            >
              <div onClick={(e) => e.stopPropagation()}>
                <LoginContent />
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
};
