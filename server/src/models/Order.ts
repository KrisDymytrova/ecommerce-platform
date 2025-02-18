import { Schema, model, Document } from 'mongoose';

interface IOrderItem {
    product: Schema.Types.ObjectId;
    quantity: number;
}

interface IOrder extends Document {
    user: Schema.Types.ObjectId;
    products: IOrderItem[];
    totalPrice: number;
    novaPoshtaBranch: string;
    novaPoshtaBranchDetails: {
        branchRef: string;
        description: string;
        cityRef: string;
        cityName: string;
    };
    status: string;
}

const orderItemSchema = new Schema<IOrderItem>({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
});

const orderSchema = new Schema<IOrder>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [orderItemSchema],
    totalPrice: { type: Number, required: true, default: 0 },
    novaPoshtaBranch: { type: String, required: true },
    novaPoshtaBranchDetails: {
        branchRef: { type: String, required: true },
        description: { type: String, required: true },
        cityRef: { type: String, required: true },
        cityName: { type: String, required: true },
    },
    status: { type: String, required: true, default: 'new' },
}, { timestamps: true });

const Order = model<IOrder>('Order', orderSchema);
export default Order;
