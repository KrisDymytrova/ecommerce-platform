import { Request, Response } from 'express';
import User from '../../models/User';

const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, name, role } = req.body;
        const newUser = new User({ email, password, name, role });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Помилка при створенні користувача' });
    }
};

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Помилка при отриманні користувачів' });
    }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Помилка при оновленні користувача' });
    }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'Користувач видалений' });
    } catch (error) {
        res.status(500).json({ message: 'Помилка при видаленні користувача' });
    }
};

export { createUser, getAllUsers, updateUser, deleteUser };
