import { Request, Response } from 'express';
import Product from '../../models/Product';

const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, price, description, category, images } = req.body;
        const newProduct = new Product({ title, price, description, category, images });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Помилка при створенні товару' });
    }
};

const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Помилка при отриманні товарів' });
    }
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Помилка при оновленні товару' });
    }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: 'Товар видалений' });
    } catch (error) {
        res.status(500).json({ message: 'Помилка при видаленні товару' });
    }
};

export { createProduct, getProducts, updateProduct, deleteProduct };
