import mongoose, { Schema, Document } from 'mongoose';

interface ICategory extends Document {
    name: string;
    image: string;
    createdBy: string;
}

const categorySchema = new Schema<ICategory>({
    name: { type: String, required: true },
    image: { type: String, required: true },
    createdBy: { type: String, required: true },
}, {
    timestamps: true,
});

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;
