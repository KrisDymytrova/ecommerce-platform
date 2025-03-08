import { Request, Response } from 'express';
import Product from '../../models/Product';
import Category from '../../models/Category';
import mongoose from "mongoose";

const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, price, description, categoryId, images } = req.body;

        if (!categoryId) {
            res.status(400).json({ message: 'ID категорії обовязковий' });
            return
        }

        const categoryExists = await Category.findById(categoryId);
        if (!categoryExists) {
            res.status(400).json({ message: 'Категорію не знайдено' });
            return
        }

        const newProduct = new Product({
            title,
            price: Number(price),
            description,
            category: new mongoose.Types.ObjectId(categoryId),
            images,
        });

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

const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            res.status(404).json({ message: 'Товар не знайдений' });
            return;
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Помилка при отриманні товару', error: (error as Error).message });
    }
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { categoryId, title, price, description, images } = req.body;

        const categoryExists = await Category.findById(categoryId);
        if (!categoryExists) {
             res.status(400).json({ message: 'Невірний ID категорії' });
            return
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { title, price, description, category: categoryId, images },
            { new: true }
        );

        if (!updatedProduct) {
             res.status(404).json({ message: 'Товар не знайдений' });
            return
        }

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

export { createProduct, getProducts, getProductById, updateProduct, deleteProduct };
