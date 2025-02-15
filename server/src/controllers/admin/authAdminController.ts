import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET } from '../../config/database';
import User from '../../models/User';
import RefreshToken from '../../models/RefreshToken';
import { clientRefreshToken, clientLogout } from '../client/authClientController';

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}

const generateAccessToken = (userId: string): string => {
    return jwt.sign({ userId, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
};

const generateRefreshToken = async (userId: string): Promise<string> => {
    await RefreshToken.deleteMany({ user: userId });

    const refreshToken = jwt.sign({ userId, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });

    const newRefreshToken = new RefreshToken({
        token: refreshToken,
        user: userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await newRefreshToken.save();
    return refreshToken;
};

export const adminLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const admin = await User.findOne({ email, role: 'admin' });

        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            res.status(403).json({ message: 'Доступ заборонено' });
            return;
        }

        const accessToken = generateAccessToken(admin._id.toString());
        const refreshToken = await generateRefreshToken(admin._id.toString());

        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера', error: (error as Error).message });
    }
};

export const adminRefreshToken = clientRefreshToken;
export const adminLogout = clientLogout;
