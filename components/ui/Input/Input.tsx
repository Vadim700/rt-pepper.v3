import styles from './style.module.scss'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  className = '',
  disabled = false,
  ...props
}) => {
  return (
    <input
      className={`${styles.input}`}
      {...props}
    />
  );
};
