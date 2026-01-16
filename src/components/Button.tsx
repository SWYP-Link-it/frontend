interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
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
