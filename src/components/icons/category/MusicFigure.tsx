import { SVGProps } from '../types';

export const MusicFigure = ({ size = 16, className }: SVGProps) => {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0ZM20 13.6074C18.6667 12.8377 17 13.8003 17 15.3398V32.6602C17 34.1997 18.6667 35.1623 20 34.3926L35 25.7324C36.3333 24.9626 36.3333 23.0374 35 22.2676L20 13.6074Z"
        fill="currentColor"
      />
    </svg>
  );
};
