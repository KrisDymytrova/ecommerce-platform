import { Request, Response } from 'express';
import User from '../../models/User';

const getUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.user?.userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Помилка при отриманні профілю користувача' });
    }
};

const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user?.userId, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Помилка при оновленні профілю користувача' });
    }
};

export { getUserProfile, updateUserProfile };
