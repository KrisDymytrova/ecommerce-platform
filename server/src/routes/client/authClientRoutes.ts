import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import {
    clientLogin,
    clientRefreshToken,
    clientLogout,
    clientRegister
} from '../../controllers/client/authClientController';

const router = express.Router();

router.post('/register', clientRegister);
router.post('/login', clientLogin);
router.post('/refresh', clientRefreshToken);
router.post('/logout', authMiddleware, clientLogout);

export default router;
