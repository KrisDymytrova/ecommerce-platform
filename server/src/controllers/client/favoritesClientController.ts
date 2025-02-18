import { Request, Response } from 'express';
import Product from '../../models/Product';
import User from '../../models/User';

const addToFavorites = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId } = req.body;
        const userId = req.user?.userId;

        if (!userId) {
            res.status(400).json({ message: 'Необхідна авторизація для додавання в обране' });
            return;
        }

        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).json({ message: 'Товар не знайдений' });
            return;
        }

        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'Користувач не знайдений' });
            return;
        }

        if (user.favorites.includes(productId)) {
            res.status(400).json({ message: 'Товар вже в обраному' });
            return;
        }

        user.favorites.push(productId);
        await user.save();

        res.status(200).json({ message: 'Товар додано в обране' });
    } catch (error) {
        res.status(500).json({ message: 'Помилка при додаванні товару в обране' });
    }
};

const removeFromFavorites = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId } = req.params;
        const userId = req.user?.userId;

        if (!userId) {
            res.status(400).json({ message: 'Необхідна авторизація для видалення з обраного' });
            return;
        }

        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'Користувач не знайдений' });
            return;
        }

        user.favorites = user.favorites.filter((id) => id.toString() !== productId);
        await user.save();

        res.status(200).json({ message: 'Товар видалено з обраного' });
    } catch (error) {
        res.status(500).json({ message: 'Помилка при видаленні товару з обраного' });
    }
};

const getFavorites = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            res.status(400).json({ message: 'Необхідна авторизація для перегляду обраного' });
            return;
        }

        const user = await User.findById(userId).populate('favorites');  // Популяция избранных товаров
        if (!user) {
            res.status(404).json({ message: 'Користувач не знайдений' });
            return;
        }

        res.status(200).json(user.favorites);
    } catch (error) {
        res.status(500).json({ message: 'Помилка при отриманні обраного' });
    }
};

export { addToFavorites, removeFromFavorites, getFavorites };