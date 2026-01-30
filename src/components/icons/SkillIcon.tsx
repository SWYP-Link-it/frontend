import { SVGProps } from './types';

export const SkillIcon = ({ size = 16, className }: SVGProps) => {
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
        d="M3 11.1895L3 6.7497C3 6.07684 3.26252 5.43155 3.7298 4.95577C4.19709 4.47999 4.83086 4.2127 5.4917 4.2127L14.9428 4.2127"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.8877 3.9456C18.0544 4.04183 18.0544 4.28239 17.8877 4.37862L14.5728 6.2925C14.4061 6.38872 14.1978 6.26844 14.1978 6.07599L14.1978 2.24823C14.1978 2.05578 14.4061 1.9355 14.5728 2.03172L17.8877 3.9456Z"
        fill="currentColor"
      />
      <path
        d="M17.0297 8.79395V13.2337C17.0297 13.9066 16.7672 14.5519 16.2999 15.0276C15.8326 15.5034 15.1989 15.7707 14.538 15.7707L5.0869 15.7707"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.14178 16.0378C1.97511 15.9416 1.97511 15.701 2.14178 15.6048L5.45672 13.6909C5.62339 13.5947 5.83172 13.715 5.83172 13.9074L5.83172 17.7352C5.83172 17.9276 5.62339 18.0479 5.45672 17.9517L2.14178 16.0378Z"
        fill="currentColor"
      />
    </svg>
  );
};
