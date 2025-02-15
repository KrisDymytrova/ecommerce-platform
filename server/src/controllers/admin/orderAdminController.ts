import { Request, Response } from 'express';
import Order from '../../models/Order';

const getAllOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders = await Order.find().populate('user');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Помилка при отриманні замовлень' });
    }
};

const getOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId).populate('user');
        if (!order) {
            res.status(404).json({ message: 'Замовлення не знайдено' });
            return;
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Помилка при отриманні замовлення' });
    }
};

const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        if (!['pending', 'shipped', 'delivered', 'canceled'].includes(status)) {
            res.status(400).json({ message: 'Невірний статус' });
            return;
        }

        const order = await Order.findById(orderId);
        if (!order) {
            res.status(404).json({ message: 'Замовлення не знайдено' });
            return;
        }

        order.status = status;
        await order.save();

        res.status(200).json({ message: 'Статус замовлення оновлено' });
    } catch (error) {
        res.status(500).json({ message: 'Помилка при оновленні статусу замовлення' });
    }
};

export { getAllOrders, getOrderById, updateOrderStatus };
