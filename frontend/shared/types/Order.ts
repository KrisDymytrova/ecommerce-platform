export interface ProductOrder {
    product: string;
    quantity: number;
}

export interface Order {
    _id: string;
    user: string;
    status: string;
    products: ProductOrder[];
    totalPrice: number;
    novaPoshtaBranch: string;
    createdAt: string;
}

export interface OrdersState {
    items: Order[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}