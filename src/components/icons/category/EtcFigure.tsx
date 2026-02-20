import { SVGProps } from '../types';

export const EtcFigure = ({ size = 16, className }: SVGProps) => {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="24" r="5" fill="currentColor" />
      <circle cx="24" cy="24" r="5" fill="currentColor" />
      <circle cx="38" cy="24" r="5" fill="currentColor" />
    </svg>
  );
};
