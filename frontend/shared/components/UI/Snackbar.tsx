import * as React from 'react';
import { useEffect } from 'react';

interface SnackbarProps {
    message: string;
    onClose: () => void;
    open: boolean;
    type: 'success' | 'error';
}

const Snackbar: React.FC<SnackbarProps> = ({ message, onClose, open, type }) => {
    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [open, onClose]);

    return (
        <div className={`fixed bottom-4 right-4 w-80 p-4 rounded-lg shadow-lg text-white 
    ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} 
    ${open ? 'opacity-100 visible' : 'opacity-0 invisible hidden'} 
    transition-opacity duration-300`}>
            {message}
        </div>
    );
};

export default Snackbar;
