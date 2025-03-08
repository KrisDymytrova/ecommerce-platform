import * as React from 'react';
import Sidebar from '../components/UI/Sidebar';

interface BaseTemplateProps {
    children: React.ReactNode;
}

const BaseTemplate: React.FC<BaseTemplateProps> = ({ children }) => {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-4">
                {children}
            </main>
        </div>
    );
};

export default BaseTemplate;
