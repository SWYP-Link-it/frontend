import { LoaderIcon } from 'lucide-react';

type LoaderViewProps = {
  loadingText?: string;
};

export const LoaderView = ({
  loadingText = '불러오는 중...',
}: LoaderViewProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-lg text-gray-700">
      <LoaderIcon className="animate-spin" />
      {loadingText}
    </div>
  );
};
