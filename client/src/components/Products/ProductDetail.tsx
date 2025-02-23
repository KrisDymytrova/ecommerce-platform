import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heart } from "lucide-react";
import QuantitySelector from "../UI/QuantitySelector";
import SizeSelector from "../UI/SizeSelector";
import CartPopup from "../ShoppingCart/CartPopup";

interface Product {
    _id: string;
    title: string;
    size: string;
    price: number;
    images: string[];
    description: string;
}

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5002/api/products/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Ошибка при загрузке данных о товаре:", error);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    if (!product) return <div>Загрузка...</div>;

    return (
        <div className="container mx-auto flex gap-12 p-10">
            <div className="w-[60%]">
                <img src={product.images[0]} alt={product.title} className="w-full" />
            </div>

            <div className="w-[40%] space-y-6">
                <h1 className="text-3xl font-semibold">{product.title}</h1>

                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                </div>

                <div>
                    <h2 className="text-sm text-gray-600 mb-3">Size</h2>
                    <SizeSelector />
                </div>

                <div>
                    <h2 className="text-sm text-gray-600 mb-3">Quantity</h2>
                    <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
                </div>

                <div className="flex gap-4">
                    <button className="button-dark" onClick={openPopup}>
                        ADD TO CART
                    </button>
                    <button className="button-light">
                        BUY IT NOW
                    </button>
                </div>

                <button
                    className="flex items-center gap-2 text-gray-600 hover:text-black pt-4"
                    onClick={() => setIsFavorite(!isFavorite)}
                >
                    <Heart size={20} className={isFavorite ? "fill-black" : "stroke-black"} />
                    ADD TO WISHLIST
                </button>

                <div className="border-t pt-6 text-gray-700 text-sm space-y-6">
                    <h2 className="text-lg font-semibold">Product Details</h2>
                    <div>
                        <p>{product.description}</p>
                    </div>
                </div>
            </div>

            {isPopupOpen && (
                <CartPopup
                    product={{
                        name: product.title,
                        size: product.size,
                        price: `$${product.price.toFixed(2)}`,
                        image: product.images[0],
                    }}
                    quantity={quantity}
                    onClose={closePopup}
                    showSize={true}
                />
            )}

        </div>
    );
};

export default ProductDetail;
