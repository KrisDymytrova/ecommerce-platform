import { Schema, model, Document } from 'mongoose';

interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    category: Schema.Types.ObjectId;
    stock: number;
    imageUrl: string;
}

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    stock: { type: Number, required: true, default: 0 },
    imageUrl: { type: String, required: true },
}, { timestamps: true });

const Product = model<IProduct>('Product', productSchema);
export default Product;
