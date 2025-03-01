import { Request, Response } from "express";
import Order from "../../models/Order";

const getAllOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const orders = await Order.find()
            .populate("user")
            .skip((+page - 1) * +limit)
            .limit(+limit);
        const totalOrders = await Order.countDocuments();

        res.status(200).json({
            totalOrders,
            orders: orders.map((order) => ({
                ...order.toObject(),
                novaPoshtaBranchDetails: order.novaPoshtaBranchDetails || {},
            })),
            page: +page,
            totalPages: Math.ceil(totalOrders / +limit),
        });
    } catch (error) {
        res.status(500).json({ message: "Помилка при отриманні замовлень" });
    }
};

const getOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId).populate("user");
        if (!order) {
            res.status(404).json({ message: "Замовлення не знайдено" });
            return;
        }

        res.status(200).json({
            ...order.toObject(),
            novaPoshtaBranchDetails: order.novaPoshtaBranchDetails || {},
        });
    } catch (error) {
        res.status(500).json({ message: "Помилка при отриманні замовлення" });
    }
};

// 📌 Оновлення статусу замовлення
const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        if (!["pending", "shipped", "delivered", "canceled"].includes(status)) {
            res.status(400).json({ message: "Невірний статус" });
            return;
        }

        const order = await Order.findById(orderId);
        if (!order) {
            res.status(404).json({ message: "Замовлення не знайдено" });
            return;
        }

        order.status = status;
        await order.save();

        res.status(200).json({ message: "Статус замовлення оновлено" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Помилка при оновленні статусу замовлення" });
    }
};

// 📌 Оновлення всього замовлення (редагування)
const updateOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { orderId } = req.params;
        const updatedData = req.body; // Отримуємо всі передані дані

        const order = await Order.findById(orderId);
        if (!order) {
            res.status(404).json({ message: "Замовлення не знайдено" });
            return;
        }

        Object.assign(order, updatedData);
        await order.save();

        res.status(200).json({ message: "Замовлення оновлено", order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Помилка при оновленні замовлення" });
    }
};

const deleteOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);

        if (!order) {
            res.status(404).json({ message: "Замовлення не знайдено" });
            return;
        }

        await Order.findByIdAndDelete(orderId);
        res.status(200).json({ message: "Замовлення видалено" });
    } catch (error) {
        res.status(500).json({ message: "Помилка при видаленні замовлення" });
    }
};

export { getAllOrders, getOrderById, updateOrderStatus, updateOrder, deleteOrder };
