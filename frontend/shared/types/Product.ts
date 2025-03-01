export interface Product {
    _id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    images: string[];
    createdAt: string;
    updatedAt: string;
}

export interface ProductsState {
    items: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}