import { Request, Response } from 'express';
import Order from '../../models/Order';
import Cart from '../../models/Cart';
import { getBranches } from '../../services/novaposhtaService';

const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            console.error('Необхідна авторизація для оформлення замовлення');
            res.status(401).json({ message: 'Необхідна авторизація для оформлення замовлення' });
            return;
        }

        const cart = await Cart.findOne({ user: userId });

        if (!cart || cart.items.length === 0) {
            console.error('Кошик порожній');
            res.status(400).json({ message: 'Кошик порожній' });
            return;
        }

        const totalPrice = await cart.calculateTotalPrice();
        const { branchRef, cityRef } = req.body;

        if (!branchRef || !cityRef) {
            console.error('Необхідно вибрати місто та відділення');
            res.status(400).json({ message: 'Необхідно вибрати місто та відділення' });
            return;
        }

        const branches = await getBranches(cityRef);

        if (!branches || branches.length === 0) {
            console.error('Відділення для вказаного міста не знайдені');
            res.status(404).json({ message: 'Відділення для вказаного міста не знайдені' });
            return;
        }

        const selectedBranch = branches.find((branch) => branch.Ref === branchRef);

        if (!selectedBranch) {
            console.error('Вибране відділення не знайдено');
            res.status(404).json({ message: 'Вибране відділення не знайдено' });
            return;
        }

        const order = new Order({
            user: userId,
            products: cart.items,
            totalPrice,
            status: 'pending',
            novaPoshtaBranch: branchRef,
            novaPoshtaBranchDetails: {
                branchRef: selectedBranch.Ref,
                description: selectedBranch.Description,
                cityRef: cityRef,
                cityName: selectedBranch.Description,
            },
        });

        await order.save();

        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(201).json({ message: 'Замовлення створене успішно', order });
    } catch (error) {
        console.error('Помилка при створенні замовлення:', error);
        res.status(500).json({ message: 'Помилка при створенні замовлення' });
    }
};

const getUserOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            res.status(401).json({ message: 'Необхідна авторизація для перегляду замовлень' });
            return;
        }

        const orders = await Order.find({ user: userId });
        res.status(200).json(orders);
    } catch (error) {
        console.error('Помилка при отриманні замовлень:', error);
        res.status(500).json({ message: 'Помилка при отриманні замовлень' });
    }
};

export { createOrder, getUserOrders };
