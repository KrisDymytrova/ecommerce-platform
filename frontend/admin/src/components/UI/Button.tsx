import * as React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'outline' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled = false, variant = 'primary', size = 'md' }) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg font-semibold focus:outline-none transition-all duration-300';

    const variantClasses = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        outline: 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
        danger: 'bg-red-600 text-white hover:bg-red-700',
    };

    const sizeClasses = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
        >
            {children}
        </button>
    );
};

export default Button;
