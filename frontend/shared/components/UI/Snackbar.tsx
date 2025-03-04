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
        if (!open) {
            return;
        }

        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [open, onClose]);


    return (
        <div
            className={`fixed bottom-4 right-4 w-70 p-4 rounded-lg shadow-lg text-white 
    ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} 
    ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'} 
    transition-opacity duration-500 ease-in-out`}
            style={{bottom: '16px', right: '16px'}}
        >
            {message}
        </div>
    );
};

export default Snackbar;
