import { Request, Response } from 'express';
import Cart from '../../models/Cart';
import Product from '../../models/Product';

const addToCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user?.userId;

        if (!userId) {
            res.status(400).json({ message: 'Необхідна авторизація для додавання в кошик' });
            return;
        }

        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).json({ message: 'Товар не знайдений' });
            return;
        }

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [], totalPrice: 0 });
        }

        const existingProductIndex = cart.items.findIndex((item) => item.product.toString() === productId);
        if (existingProductIndex !== -1) {
            cart.items[existingProductIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        cart.totalPrice = await cart.calculateTotalPrice();

        await cart.save();
        res.status(200).json({ message: 'Товар додано до кошика' });
    } catch (error) {
        res.status(500).json({ message: 'Помилка при додаванні товару в кошик' });
    }
};

const removeFromCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId } = req.params;
        const userId = req.user?.userId;

        if (!userId) {
            res.status(400).json({ message: 'Необхідна авторизація для видалення з кошика' });
            return;
        }

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            res.status(404).json({ message: 'Кошик порожній' });
            return;
        }

        cart.items = cart.items.filter((item) => item.product.toString() !== productId);

        cart.totalPrice = await cart.calculateTotalPrice();

        await cart.save();
        res.status(200).json({ message: 'Товар видалено з кошика' });
    } catch (error) {
        res.status(500).json({ message: 'Помилка при видаленні товару з кошика' });
    }
};

const getCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            res.status(400).json({ message: 'Необхідна авторизація для перегляду кошика' });
            return;
        }

        const cart = await Cart.findOne({ user: userId }).populate('items.product'); // Популяция товаров с их полями, включая price
        if (!cart) {
            res.status(404).json({ message: 'Кошик порожній' });
            return;
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Помилка при отриманні кошика' });
    }
};

export { addToCart, removeFromCart, getCart };
