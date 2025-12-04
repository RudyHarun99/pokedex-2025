import { ButtonHTMLAttributes, ReactNode } from 'react';
import LoadingSpinner from './LoadingSpinner';

type ButtonVariant = 
  | 'page'
  | 'primary' 
  | 'secondary' 
  | 'danger' 
  | 'ghost' 
  | 'icon';

type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  // Base styles
  const baseStyles = 'font-bold rounded-xl transition-all duration-200 inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed';

  // Variant styles
  const variantStyles: Record<ButtonVariant, string> = {
    page: 'bg-pokemon-yellow text-gray-700 border-2 border-gray-400 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 shadow-md disabled:hover:translate-y-0',
    primary: 'bg-linear-to-r from-pokemon-yellow to-yellow-500 text-gray-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 shadow-md disabled:hover:translate-y-0',
    secondary: 'bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 shadow-md disabled:hover:translate-y-0',
    danger: 'bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl active:scale-95 disabled:hover:scale-100',
    ghost: 'text-gray-700 hover:bg-gray-100 active:bg-gray-200',
    icon: 'text-gray-700 hover:text-pokemon-red hover:scale-110 active:scale-100 transition-all duration-200'
  };

  // Size styles
  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-sm min-h-9',
    md: 'px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base min-h-11',
    lg: 'px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg min-h-12'
  };

  // Width style
  const widthStyle = fullWidth ? 'w-full' : '';

  // Combine all styles
  const combinedStyles = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${widthStyle}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      className={combinedStyles}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        children
      )}
    </button>
  );
}
