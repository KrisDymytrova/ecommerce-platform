import { Eye, Heart, ShoppingBasket } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CartPopup from '../ShoppingCart/CartPopup';

interface ProductCardProps {
    images: string[];
    title: string;
    price: number;
    _id: string;
    hasSize?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
                                                     images,
                                                     title,
                                                     price,
                                                     _id,
                                                     hasSize = false,
                                                 }) => {
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const goToProductPage = () => {
        navigate(`/product/${_id}`);
    };

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 relative w-72">
            <div className="absolute top-6 right-2 flex flex-col space-y-3">
                <Eye className="icon-button" onClick={goToProductPage} />
                <Heart className="icon-button" />
                <ShoppingBasket className="icon-button" onClick={openPopup} />
            </div>

            <img
                src={images[0]}
                alt={title}
                className="w-full h-56 object-contain"
            />

            <h3 className="text-center p-3 font-semibold">{title}</h3>

            <div className="text-center mt-1">
                <span className="text-lg font-bold">${price.toFixed(2)}</span>
            </div>

            {isPopupOpen && (
                <CartPopup
                    product={{ name: title, size: "M", price: `$${price.toFixed(2)}`, image: images[0] }}
                    onClose={closePopup}
                    showSize={hasSize}
                />
            )}
        </div>
    );
};

export default ProductCard;
