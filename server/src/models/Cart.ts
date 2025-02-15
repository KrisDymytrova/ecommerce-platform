import { Schema, model, Document } from 'mongoose';
import Product from './Product';

interface ICartItem {
    product: Schema.Types.ObjectId;
    quantity: number;
}

interface ICart extends Document {
    user: Schema.Types.ObjectId;
    items: ICartItem[];
    totalPrice: number;
    calculateTotalPrice: () => Promise<number>; // Добавляем тип для метода
}

const cartItemSchema = new Schema<ICartItem>({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
});

const cartSchema = new Schema<ICart>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [cartItemSchema],
    totalPrice: { type: Number, required: true, default: 0 },
}, { timestamps: true });

cartSchema.methods.calculateTotalPrice = async function (): Promise<number> {
    let total = 0;

    for (const item of this.items) {
        const product = await Product.findById(item.product).select('price');
        if (product) {
            total += product.price * item.quantity;
        }
    }
    return total;
};

const Cart = model<ICart>('Cart', cartSchema);
export default Cart;
