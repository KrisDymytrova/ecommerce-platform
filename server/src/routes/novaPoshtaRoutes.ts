import { Router, Request, Response } from 'express';
import { getCities, getBranches } from '../services/novaposhtaService';

const router = Router();

router.get('/cities', async (req: Request, res: Response) => {
    try {
        const { cityName } = req.query;
        const cities = await getCities(cityName as string);
        res.status(200).json(cities);
    } catch (error) {
        console.error('Помилка при отриманні міст:', error);
        res.status(500).json({ message: 'Помилка при отриманні міст Нова Пошта' });
    }
});

router.get('/branches', async (req: Request, res: Response) => {
    try {
        const { cityRef } = req.query;

        if (!cityRef || typeof cityRef !== 'string') {
            res.status(400).json({ message: 'Необхідно передати cityRef' });
            return;
        }

        const branches = await getBranches(cityRef);
        res.status(200).json(branches);
    } catch (error) {
        console.error('Помилка при отриманні відділень:', error);
        res.status(500).json({ message: 'Помилка при отриманні відділень Нова Пошта' });
    }
});

export default router;
