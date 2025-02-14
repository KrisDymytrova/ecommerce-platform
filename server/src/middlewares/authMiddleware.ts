import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/database';

interface DecodedToken {
    userId: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: DecodedToken;
        }
    }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Немає доступу, потрібен токен' });
    }

    try {
        req.user = jwt.verify(token, JWT_SECRET) as DecodedToken;
        next();
    } catch {
        res.status(403).json({ message: 'Недійсний токен' });
    }
};

export default authMiddleware;
