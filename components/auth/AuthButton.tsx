import { ButtonHTMLAttributes } from 'react';

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  children: React.ReactNode;
  isLoading?: boolean;
}

export function AuthButton({
  variant = 'primary',
  children,
  isLoading,
  disabled,
  ...props
}: AuthButtonProps) {
  const baseStyles = 'w-full py-3.5 px-4 rounded-full font-medium transition-all duration-200 flex items-center justify-center gap-2';

  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800 disabled:bg-gray-400',
    outline: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 disabled:bg-gray-100'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}
