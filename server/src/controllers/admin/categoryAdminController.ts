import { Request, Response } from 'express';
import Category from '../../models/Category';

const createCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, image, description } = req.body;
        const userId = req.user?.userId;

        if (!userId) {
            res.status(400).json({ message: 'Не знайдено userId в запиті' });
            return;
        }

        const category = new Category({
            name,
            image,
            description,
            createdBy: userId
        });

        console.log('Creating category with createdBy:', userId);

        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Помилка при створенні категорії', error: (error as Error).message });
    }
};

const getCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Помилка при отриманні категорій', error: (error as Error).message });
    }
};

const updateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCategory) {
            res.status(404).json({ message: 'Категорія не знайдена' });
            return;
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: 'Помилка при оновленні категорії', error: (error as Error).message });
    }
};

const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            res.status(404).json({ message: 'Категорія не знайдена' });
            return;
        }
        res.status(200).json({ message: 'Категорія видалена' });
    } catch (error) {
        res.status(500).json({ message: 'Помилка при видаленні категорії', error: (error as Error).message });
    }
};

export { createCategory, getCategories, updateCategory, deleteCategory };
