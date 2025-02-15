import { Request, Response } from 'express';
import Order from '../../models/Order';
import Cart from '../../models/Cart';

const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            res.status(400).json({ message: 'Необхідна авторизація для оформлення замовлення' });
            return;
        }

        const cart = await Cart.findOne({ user: userId });

        if (!cart || cart.items.length === 0) {
            res.status(400).json({ message: 'Кошик порожній' });
            return;
        }

        const order = new Order({
            user: userId,
            products: cart.items,
            status: 'pending',
        });

        await order.save();

        // Очищаем корзину после оформления заказа
        cart.items = [];
        await cart.save();

        res.status(201).json({ message: 'Замовлення створене успішно' });
    } catch (error) {
        res.status(500).json({ message: 'Помилка при створенні замовлення' });
    }
};

const getUserOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            res.status(400).json({ message: 'Необхідна авторизація для перегляду замовлень' });
            return;
        }

        const orders = await Order.find({ user: userId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Помилка при отриманні замовлень' });
    }
};

export { createOrder, getUserOrders };
