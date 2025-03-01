import * as React from 'react';

interface TableProps {
    children: React.ReactNode;
}

const Table: React.FC<TableProps> = ({ children }) => {
    return (
        <table className="w-full border-collapse text-center">{children}</table>
    );
};

export default Table;
