import { SVGProps } from '../types';

export const DevelopmentFigure = ({ size = 16, className }: SVGProps) => {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="6" width="44" height="28" rx="3" fill="currentColor" />
      <rect x="2" y="36" width="44" height="6" rx="2" fill="currentColor" />
    </svg>
  );
};
