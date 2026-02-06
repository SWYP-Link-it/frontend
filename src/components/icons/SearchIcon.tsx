import { SVGProps } from './types';

export const SearchIcon = ({ size = 16, className }: SVGProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12.1373 12.1373L9.62312 9.62312M10.9813 6.35762C10.9813 8.91123 8.91123 10.9813 6.35762 10.9813C3.804 10.9813 1.73389 8.91123 1.73389 6.35762C1.73389 3.804 3.804 1.73389 6.35762 1.73389C8.91123 1.73389 10.9813 3.804 10.9813 6.35762Z"
        stroke="currentColor"
        strokeWidth="1.15593"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
