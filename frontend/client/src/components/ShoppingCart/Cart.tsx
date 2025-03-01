import { Trash } from "lucide-react";
import { useState } from "react";
import QuantitySelector from '../../../../shared/components/UI/QuantitySelector';

const Cart = () => {
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="container mx-auto p-10">
            <div className="grid grid-cols-5 items-center text-gray-500 uppercase text-sm pb-4 border-b">
                <span className="col-span-2">Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Total</span>
            </div>

            <div className="grid grid-cols-5 items-center py-6 border-b">
                <div className="col-span-2 flex items-center gap-4">
                    <img src="/frontend/client/src/assets/1095130.jpg" alt="Sneaker" className="w-16 h-16 object-cover" />
                    <div>
                        <h2 className="font-semibold">Style Black Sneakers</h2>
                        <p className="text-gray-500 text-sm">Size: 38</p>
                    </div>
                </div>

                <span className="text-gray-500 font-semibold">$100.00</span>

                <div className="flex items-center gap-4">
                    <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
                    <button className="bg-black text-white p-2 rounded-full">
                        <Trash size={16} />
                    </button>
                </div>

                <span className="text-gray-500 font-semibold">${(100 * quantity).toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center mt-6">
                <button className="button-dark w-[200px]">
                    CONTINUE SHOPPING
                </button>

                <div className="text-right">
                    <p className="text-gray-500 text-sm">Taxes and shipping calculated at checkout</p>
                    <p className="text-lg font-semibold mt-1">
                        Subtotal: <span className="text-black">${(100 * quantity).toFixed(2)}</span>
                    </p>
                    <button className="button-light w-[200px]">
                        CHECK OUT
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
