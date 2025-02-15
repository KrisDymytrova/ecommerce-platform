import { Router } from 'express';
import { createUser, getAllUsers, updateUser, deleteUser } from '../../controllers/admin/userAdminController';

const router = Router();

router.post('/users', createUser);
router.get('/users', getAllUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
