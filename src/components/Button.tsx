interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  mode?: 'inactive' | 'active' | 'default';
}

export const Button = ({
  mode = 'default',
  text,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={mode === 'inactive'}
      className={` ${className} ${
        mode === 'inactive'
          ? 'bg-gray-200 text-white'
          : mode === 'active'
            ? 'bg-brand-600 cursor-pointer text-white'
            : 'cursor-pointer bg-gray-200 text-gray-800'
      } rounded-xl py-[15px] font-semibold`}
      {...props}
    >
      {text}
    </button>
  );
};
