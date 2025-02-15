import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { MONGO_URI, PORT } from './config/database';
import appRoutes from './routes/appRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', appRoutes);

mongoose
    .connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB підключено'))
    .catch((err) => console.error('❌ MongoDB помилка:', err));

app.listen(PORT, () => console.log(`🚀 Сервер працює на http://localhost:${PORT}`));
