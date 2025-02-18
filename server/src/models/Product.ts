import { Schema, model, Document } from 'mongoose';

interface IProduct extends Document {
    title: string;
    price: number;
    description: string;
    category: Schema.Types.ObjectId;
    images: string[];
}

const productSchema = new Schema<IProduct>({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    images: [{ type: String, required: true }]
}, { timestamps: true });

const Product = model<IProduct>('Product', productSchema);
export default Product;
