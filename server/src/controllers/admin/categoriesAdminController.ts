import { Request, Response } from 'express';
import Category from '../../models/Category';

// ✅ Створення категорії
const createCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('🔹 User from token:', req.user);

        const { name, image } = req.body;
        const userId = req.user?.userId;

        if (!userId) {
            res.status(400).json({ message: '❌ Не знайдено userId у запиті' });
            return;
        }

        if (!name || !image) {
            res.status(400).json({ message: '❌ Всі поля обовʼязкові' });
            return;
        }

        const category = new Category({
            name,
            image,
            createdBy: userId
        });

        console.log('✅ Creating category:', { name, createdBy: userId });

        await category.save();
        res.status(201).json(category);
    } catch (error) {
        console.error('❌ Error creating category:', error);
        res.status(500).json({ message: 'Помилка при створенні категорії', error: (error as Error).message });
    }
};

// ✅ Отримання всіх категорій
const getCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error('❌ Error fetching categories:', error);
        res.status(500).json({ message: 'Помилка при отриманні категорій', error: (error as Error).message });
    }
};

// ✅ Отримання категорії за ID
const getCategoryById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        if (!category) {
            res.status(404).json({ message: '❌ Категорія не знайдена' });
            return;
        }

        res.status(200).json(category);
    } catch (error) {
        console.error('❌ Error fetching category:', error);
        res.status(500).json({ message: 'Помилка при отриманні категорії', error: (error as Error).message });
    }
};

// ✅ Оновлення категорії
const updateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, image } = req.body;

        if (!name || !image) {
            res.status(400).json({ message: '❌ Всі поля обовʼязкові' });
            return;
        }

        const updatedCategory = await Category.findByIdAndUpdate(id, { name, image }, { new: true });

        if (!updatedCategory) {
            res.status(404).json({ message: '❌ Категорія не знайдена' });
            return;
        }

        res.status(200).json(updatedCategory);
    } catch (error) {
        console.error('❌ Error updating category:', error);
        res.status(500).json({ message: 'Помилка при оновленні категорії', error: (error as Error).message });
    }
};

// ✅ Видалення категорії
const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);
        if (!category) {
            res.status(404).json({ message: '❌ Категорія не знайдена' });
            return;
        }

        await Category.findByIdAndDelete(id);
        res.status(200).json({ message: '✅ Категорія видалена' });
    } catch (error) {
        console.error('❌ Error deleting category:', error);
        res.status(500).json({ message: 'Помилка при видаленні категорії', error: (error as Error).message });
    }
};

export { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory };
