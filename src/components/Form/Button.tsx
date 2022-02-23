import React, { ButtonHTMLAttributes } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'submit' | 'reset' | 'button' | undefined;
  title: string;
  isDisabled?: boolean;
  color?: string;
}

const Button: React.FC<IButtonProps> = ({
  title,
  type = 'submit',
  color = 'ring-blue-700 p-2 bg-blue-500 text-white border-blue-600 hover:bg-blue-600',
  isDisabled = false,
  ...rest
}) => {
  return (
    <button
      disabled={isDisabled}
      className={`
      inline-flex
      cursor-pointer
      justify-center
      items-center
      whitespace-nowrap
      focus:outline-none
      transition-colors
      focus:ring duration-150
      border rounded
      ${color}
      mr-3 last:mr-0
      mb-3${isDisabled ? ' opacity-50 cursor-not-allowed' : ''}`}
      type={type}
      {...rest}
    >
      <span className='px-2'>{title}</span>
    </button>
  );
};

export default Button;
