import express from 'express';
import { authMiddleware, adminMiddleware } from '../../middlewares/authMiddleware';
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../../controllers/admin/usersAdminController';

const router = express.Router();

router.post('/create-user', authMiddleware, adminMiddleware, createUser);
router.get('/', authMiddleware, adminMiddleware, getAllUsers);
router.get('/user/:id', authMiddleware, adminMiddleware, getUserById);
router.put('/user/:id', authMiddleware, adminMiddleware, updateUser);
router.delete('/user/:id', authMiddleware, adminMiddleware, deleteUser);

export default router;
