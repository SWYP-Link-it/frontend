interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼에 표시될 텍스트 */
  text: string;
  /** 버튼의 상태 (기본값: 'default')
   * - 'inactive': 비활성화 상태 (클릭 불가)
   * - 'active': 활성화 상태 (클릭 가능)
   * - 'default': 기본 상태 (클릭 가능)
   */
  mode?: 'inactive' | 'active' | 'default';
}

export const Button = ({ mode = 'default', text, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={mode === 'inactive'}
      className={`${
        mode === 'inactive'
          ? 'bg-gray-200 text-white'
          : mode === 'active'
            ? 'bg-brand-600 cursor-pointer text-white'
            : 'cursor-pointer bg-gray-200 text-gray-800'
      } w-full rounded-xl py-[15px] font-semibold`}
    >
      {text}
    </button>
  );
};
