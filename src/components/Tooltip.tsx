'use client';

import { X } from 'lucide-react';
import { ReactElement, useState } from 'react';

type TooltipProps = {
  showTooltipDefault?: boolean;
  tooltipContent: ReactElement;
  tailPosition?: 'left' | 'center' | 'right';
  onClose?: () => void;
  children: ReactElement;
};

export const Tooltip = ({
  showTooltipDefault = true,
  tooltipContent,
  tailPosition = 'center',
  onClose,
  children,
}: TooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(showTooltipDefault);

  const tailPosStyle =
    tailPosition === 'left'
      ? 'left-[10%]'
      : tailPosition === 'center'
        ? 'left-1/2'
        : 'right-[10%]';

  return (
    <div className="relative contents">
      {showTooltip && (
        <div className="absolute bottom-[calc(100%-14px)] left-1/2 z-50 -translate-x-1/2">
          <div className="relative rounded-[12px] bg-gray-800 px-[16px] py-[12px] text-[13px] leading-[1.6] font-medium whitespace-nowrap text-white shadow-xl">
            <div className="flex items-start justify-between gap-3">
              {tooltipContent}
              <button
                onClick={() => {
                  setShowTooltip(false);
                  onClose?.();
                }}
                className="mt-[2px] text-gray-400 transition-colors hover:text-white"
              >
                <X size={14} />
              </button>
            </div>
            <div
              className={`absolute top-[100%] ${tailPosStyle} -translate-x-1/2 border-[7px] border-transparent border-t-gray-800`}
            />
          </div>
        </div>
      )}

      {children}
    </div>
  );
};
