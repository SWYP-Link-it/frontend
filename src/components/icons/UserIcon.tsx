import { SVGProps } from './types';

export const UserIcon = ({ size = 16, className }: SVGProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9.6 9.59766H10.4C14.596 9.59766 18 13.0017 18 17.1977C18 17.6377 17.64 17.9977 17.2 17.9977H2.8C2.36 17.9977 2 17.6377 2 17.1977C2 13.0017 5.404 9.59766 9.6 9.59766Z"
        fill="currentColor"
      />
      <path
        d="M10 8.79805C11.8778 8.79805 13.4 7.27582 13.4 5.39805C13.4 3.52028 11.8778 1.99805 10 1.99805C8.12223 1.99805 6.6 3.52028 6.6 5.39805C6.6 7.27582 8.12223 8.79805 10 8.79805Z"
        fill="currentColor"
      />
    </svg>
  );
};
