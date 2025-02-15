import { Request, Response } from 'express';
import Product from '../../models/Product';

const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await Product.find().populate('category');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Помилка при отриманні товарів' });
    }
};

const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId).populate('category');
        if (!product) {
            res.status(404).json({ message: 'Товар не знайдений' });
            return;
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Помилка при отриманні товару' });
    }
};

export { getAllProducts, getProductById };
