import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes';

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10) || 5001;
const MONGO_URI: string = process.env.MONGO_URI as string;

const app = express();

app.use(express.json());
app.use(cors());

mongoose
    .connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB підключено'))
    .catch((err) => console.error('❌ MongoDB помилка:', err));

app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`🚀 Сервер працює на http://localhost:${PORT}`));
