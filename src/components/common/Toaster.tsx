'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from 'lucide-react';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster"
      icons={{
        success: <CircleCheckIcon className="h-5 w-5 text-green-600" />,
        info: <InfoIcon className="text-brand-600 h-5 w-5" />,
        warning: <TriangleAlertIcon className="h-5 w-5 text-amber-400" />,
        error: <OctagonXIcon className="h-5 w-5 text-red-600" />,
        loading: <Loader2Icon className="h-5 w-5 animate-spin text-gray-600" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            'bg-white text-gray-900 border border-gray-200 shadow-lg rounded-lg',
          title: 'text-base',
        },
      }}
      position="top-center"
      visibleToasts={1}
      {...props}
    />
  );
};

export { Toaster };
