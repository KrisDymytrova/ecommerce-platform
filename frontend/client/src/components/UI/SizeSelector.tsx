import * as React from 'react';
import { useState } from "react";

const sizes = ["38", "39", "40"];

const SizeSelector: React.FC = () => {
    const [selectedSize, setSelectedSize] = useState(sizes[0]);

    return (
        <div className="flex gap-2">
            {sizes.map((size) => (
                <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-full ${selectedSize === size ? "bg-black text-white" : "border-gray-400 text-gray-600"}`}
                >
                    {size}
                </button>
            ))}
        </div>
    );
};

export default SizeSelector;
