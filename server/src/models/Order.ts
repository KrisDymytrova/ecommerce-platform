import { Schema, model, Document } from 'mongoose';

interface IOrderItem {
    product: Schema.Types.ObjectId;
    quantity: number;
    price: number;
}

interface IOrder extends Document {
    user: Schema.Types.ObjectId;
    items: IOrderItem[];
    totalPrice: number;
    shippingAddress: string;
    deliveryOffice: string;
    status: string;
}

const orderItemSchema = new Schema<IOrderItem>({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
});

const orderSchema = new Schema<IOrder>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    totalPrice: { type: Number, required: true, default: 0 },
    shippingAddress: { type: String, required: true },
    deliveryOffice: { type: String, required: true },
    status: { type: String, required: true, default: 'new' },
}, { timestamps: true });

const Order = model<IOrder>('Order', orderSchema);
export default Order;
