import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import routerConfig from './routerConfig';

const RouterMapping: React.FC = () => {
    return (
        <Routes>
            {routerConfig.map(({ path, component: Component }) => (
                <Route
                    key={path}
                    path={path}
                    element={<Component />}
                />
            ))}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default RouterMapping;
