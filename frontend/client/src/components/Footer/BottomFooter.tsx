import * as React from 'react';
import { FaCcVisa, FaCcMastercard, FaCcPaypal } from 'react-icons/fa';

const BottomFooter: React.FC = () => {
    return (
        <div className="bottom-footer bg-gray-900 text-white py-4">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <div>
                    <p>&copy; 2025, The Elsesho Demo Store. Powered by Shopify</p>
                </div>

                <div className="payment-icons flex space-x-4 mt-2 md:mt-0">
                    <FaCcVisa size={30} className="payment-icon" />
                    <FaCcMastercard size={30} className="payment-icon" />
                    <FaCcPaypal size={30} className="payment-icon" />
                </div>
            </div>
        </div>
    );
};

export default BottomFooter;
