import { Schema, model, Document } from 'mongoose';

interface ICategory extends Document {
    name: string;
    description: string;
    createdBy: Schema.Types.ObjectId;
}

const categorySchema = new Schema<ICategory>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Category = model<ICategory>('Category', categorySchema);
export default Category;
