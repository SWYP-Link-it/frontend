'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}

export const Popover = ({
  isOpen,
  onClose,
  trigger,
  children,
  className = '',
}: PopoverProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div ref={containerRef} className="relative">
      {trigger}
      {isOpen && (
        <div
          className={`absolute z-50 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl ${className}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};
