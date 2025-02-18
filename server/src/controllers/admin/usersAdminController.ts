import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../../models/User';

const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, username, role } = req.body;

        console.log('Received data:', req.body);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'Користувач з таким email вже існує' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            role
        });

        await newUser.save();

        res.status(201).json(newUser);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error creating user:', error.message);
            res.status(500).json({ message: 'Помилка при створенні користувача', error: error.message });
        } else {
            console.error('Unknown error:', error);
            res.status(500).json({ message: 'Помилка при створенні користувача' });
        }
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

const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            res.status(404).json({ message: 'Користувача не знайдено' });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Помилка при отриманні користувача' });
    }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        let { password, ...updateData } = req.body;

        if (password) {
            password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(id, { ...updateData, password }, { new: true });

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

export { createUser, getAllUsers, getUserById, updateUser, deleteUser };
