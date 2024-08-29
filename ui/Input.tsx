interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  disabled?: boolean;
}

export const MyInput: React.FC<InputProps> = ({
  className = '',
  disabled = false,
  ...props
}) => {
  return <input
    className={`${className} border border-dark-green size-full rounded-lg h-10 text-xl`}
    {...props} />;
};
