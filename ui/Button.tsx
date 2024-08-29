import React from 'react';

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
      className={`${className} text-white uppercase grid place-items-center tracking-wider bg-dark-green py-4 px-8 rounded-lg hover:opacity-90 transition-opacity active:opacity-90`}
      type={type}
      {...props}
    />
  );
};

export default Button;
