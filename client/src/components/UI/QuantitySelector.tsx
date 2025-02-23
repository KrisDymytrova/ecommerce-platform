import React from "react";

interface QuantitySelectorProps {
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, setQuantity }) => {
    const increase = () => setQuantity(prev => prev + 1);
    const decrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    return (
        <div className="flex items-center gap-3">
            <button
                className={`w-8 h-8 flex items-center justify-center border rounded-md ${quantity === 1 ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-200'}`}
                onClick={decrease}
                disabled={quantity === 1}
            >
                -
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
                className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-200"
                onClick={increase}
            >
                +
            </button>
        </div>
    );
};

export default QuantitySelector;
