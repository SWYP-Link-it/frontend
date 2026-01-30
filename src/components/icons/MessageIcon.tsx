import { SVGProps } from './types';

export const MessageIcon = ({ size = 16, className }: SVGProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="10.0001" cy="9.99987" r="7.99987" fill="currentColor" />
      <path
        d="M10.0952 17.9984C2.37808 18.138 0.830309 15.7839 1.81308 15.6266C4.82469 15.1446 3.32521 12.1187 5.35627 14.1176C6.36624 15.1116 11.5231 17.9725 10.0952 17.9984Z"
        fill="currentColor"
      />
      <circle cx="5.96468" cy="10.0006" r="1.07186" fill="#E9EAEB" />
      <circle cx="9.99984" cy="10.0006" r="1.07186" fill="#E9EAEB" />
      <circle cx="14.0347" cy="10.0006" r="1.07186" fill="#E9EAEB" />
    </svg>
  );
};
