import * as React from 'react';
import { ReactNode } from 'react';

interface ContentContainerProps {
    children: ReactNode;
}

const ContentContainer: React.FC<ContentContainerProps> = ({ children }) => (
    <div className="p-4 mx-auto max-w-screen-xl">
        {children}
    </div>
);

export default ContentContainer;