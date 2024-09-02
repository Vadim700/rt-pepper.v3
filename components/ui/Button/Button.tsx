import style from './style.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = 'submit',
  className = '',
  ...props
}) => {
  return (
    <button
      className={`${style.button} mb-8`}
      type={type} 
      {...props}
    />
  );
};

export default Button;
