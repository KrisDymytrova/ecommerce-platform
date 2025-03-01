import * as React from 'react';
import { Link } from "react-router-dom";

const BottomHeader: React.FC = () => {
    return (
        <header className="relative top-18 w-full bg-white/90 backdrop-blur-md shadow-md">
            <nav className="container mx-auto flex justify-center py-4 space-x-8 text-lg font-semibold">
                <Link to="/" className="hover:text-gray-500">HOME</Link>
                <Link to="/new" className="hover:text-gray-500">NEW</Link>
                <Link to="/men" className="hover:text-gray-500">MEN</Link>
                <Link to="/women" className="hover:text-gray-500">WOMEN</Link>
                <Link to="/kids" className="hover:text-gray-500">KIDS</Link>
                <Link to="/outlet" className="hover:text-gray-500">OUTLET</Link>
            </nav>
        </header>
    );
};

export default BottomHeader;
