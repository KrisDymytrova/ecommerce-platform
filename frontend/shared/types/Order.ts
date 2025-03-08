export enum OrderStatus {
    Pending = "pending",
    Processing = "processing",
    Shipped = "shipped",
    Delivered = "delivered",
    Canceled = "canceled",
}

export interface ProductOrder {
    product: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
}

export interface Order {
    _id: string;
    user: string;
    status: OrderStatus;
    products: ProductOrder[];
    totalPrice: number;
    novaPoshtaBranch: string;
    createdAt: string;
    updatedAt?: string;
}

export interface OrdersState {
    items: Order[];
    totalOrders: number,
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    currentOrder: Order | null;
}