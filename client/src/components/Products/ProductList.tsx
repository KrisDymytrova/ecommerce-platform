import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

interface Product {
    _id: string;
    images: string[];
    title: string;
    price: number;
    rating: number;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:5002/api/products");
                if (!response.ok) {
                    console.error("Ошибка при загрузке товаров");
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Загрузка товаров...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product._id}
                        images={product.images}
                        title={product.title}
                        price={product.price}
                        _id={product._id}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
