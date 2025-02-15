import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET } from '../../config/database';
import User, { IUser } from '../../models/User';
import RefreshToken from '../../models/RefreshToken';

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}

const generateAccessToken = (userId: string): string => {
    return jwt.sign({ userId, role: 'user' }, JWT_SECRET, { expiresIn: '1h' });
};

const generateRefreshToken = async (userId: string): Promise<string> => {
    await RefreshToken.deleteMany({ user: userId });

    const refreshToken = jwt.sign({ userId, role: 'user' }, JWT_SECRET, { expiresIn: '7d' });

    const newRefreshToken = new RefreshToken({
        token: refreshToken,
        user: userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await newRefreshToken.save();
    return refreshToken;
};

export const clientRegister = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body;

        if (await User.findOne({ email })) {
            res.status(400).json({ message: 'Email вже використовується' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword, role: 'user' });
        await newUser.save();

        res.status(201).json({ message: 'Користувач створений успішно' });
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера', error: (error as Error).message });
    }
};

export const clientLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, role: 'user' });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(400).json({ message: 'Невірний email або пароль' });
            return;
        }

        const accessToken = generateAccessToken(user._id.toString());
        const refreshToken = await generateRefreshToken(user._id.toString());

        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера', error: (error as Error).message });
    }
};

export const clientRefreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
        const { token } = req.body;
        if (!token) {
            res.status(401).json({ message: 'Refresh token обов’язковий' });
            return;
        }

        const storedToken = await RefreshToken.findOne({ token });
        if (!storedToken) {
            res.status(403).json({ message: 'Недійсний refresh token' });
            return;
        }

        let decoded: { userId: string };
        try {
            decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        } catch {
            res.status(403).json({ message: 'Недійсний refresh token' });
            return;
        }

        await RefreshToken.findOneAndDelete({ token });

        res.status(200).json({
            accessToken: generateAccessToken(decoded.userId),
            refreshToken: await generateRefreshToken(decoded.userId)
        });
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера', error: (error as Error).message });
    }
};

export const clientLogout = async (req: Request, res: Response): Promise<void> => {
    try {
        const { token } = req.body;
        await RefreshToken.findOneAndDelete({ token });
        res.status(200).json({ message: 'Вихід успішний' });
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера', error: (error as Error).message });
    }
};
