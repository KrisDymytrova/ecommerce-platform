import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config';

interface DecodedToken {
    userId: string;
    role: 'admin' | 'user';
}

declare global {
    namespace Express {
        interface Request {
            user?: DecodedToken;
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Немає доступу, потрібен токен' });
        return;
    }

    try {
        req.user = jwt.verify(token, JWT_SECRET) as DecodedToken;
        console.log('Authenticated user:', req.user);
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(403).json({ message: 'Недійсний токен' });
        return;
    }
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
        res.status(403).json({ message: 'Недійсний токен або відсутній користувач' });
        return;
    }

    console.log('User role:', req.user.role);

    if (req.user.role !== 'admin') {
        res.status(403).json({ message: 'Доступ заборонено' });
        return;
    }

    next();
};