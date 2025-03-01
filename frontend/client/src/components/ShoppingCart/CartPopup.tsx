import * as React from 'react';
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CartPopupProps {
    product: {
        name: string;
        size: string;
        price: string;
        image: string;
    };
    quantity?: number;
    onClose: () => void;
    showSize: boolean;
}

const CartPopup: React.FC<CartPopupProps> = ({ product, quantity = 1, onClose, showSize }) => {
    const navigate = useNavigate();

    const goToCart = () => {
        navigate('/cart');
        onClose();
    };

    const goToCheckout = () => {
        navigate('/checkout');
        onClose();
    };

    const continueShopping = () => {
        onClose();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 right-10 bg-white shadow-xl rounded-lg p-5 w-80 z-50"
        >
            <button className="absolute top-3 right-3 text-gray-500 hover:text-black" onClick={onClose}>
                <X size={20} />
            </button>

            <div className="flex items-center gap-4 border-b pb-4">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md"/>
                <div>
                    <h2 className="font-semibold">{product.name}</h2>
                    {showSize && <p className="text-gray-600 text-sm">Size: {product.size}</p>}
                    <p className="text-gray-600 text-sm">Price: {product.price}</p>
                    {quantity && <p className="text-gray-600 text-sm">Quantity: {quantity}</p>}
                </div>
            </div>

            <div className="mt-4 space-y-2">
                <button className="button-dark" onClick={goToCart}>
                    VIEW MY CART ({quantity})
                </button>
                <button className="button-light" onClick={goToCheckout}>
                    CHECK OUT
                </button>
                <button className="w-full pt-3 text-gray-600 text-sm font-medium" onClick={continueShopping}>
                    CONTINUE SHOPPING
                </button>
            </div>
        </motion.div>
    );
};

export default CartPopup;
