import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import logo from "../../../public/assets/logo.svg";

const TopFooter: React.FC = () => {
    return (
        <div className="footer bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between">
                <div className="flex items-center mb-4 md:mb-0 gap-10">
                    <img src={logo} alt="Logo" className="h-24 w-auto"/>
                    <span className="logo">the Elsho</span>
                </div>

                <div className="footer-links flex items-center space-x-8 mb-4 md:mb-0">
                    <Link to="/" className="footer-link">Main</Link>
                    <Link to="/shop" className="footer-link">Shop</Link>
                    <Link to="/about" className="footer-link">About Us</Link>
                    <Link to="/contact" className="footer-link">Contacts</Link>
                </div>

                <div className="contacts space-y-2">
                    <p>Tel: +38 063 000 00 00</p>
                    <p>Email: contact@store.com</p>

                    <div className="social-icons flex space-x-4 mt-2">
                        <a href="https://facebook.com" className="social-icon"><FaFacebook size={20} /></a>
                        <a href="https://twitter.com" className="social-icon"><FaTwitter size={20} /></a>
                        <a href="https://instagram.com" className="social-icon"><FaInstagram size={20} /></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopFooter;
