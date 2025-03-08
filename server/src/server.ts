import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import net from 'net';
import { MONGO_URI } from './config/config';
import appRoutes from './routes/appRoutes';

dotenv.config();

const app = express();

// 🛠 Настройки CORS
app.use(cors({
    origin: [
        "http://localhost:3000", // Фронтенд
        "http://localhost:3001", // Админ-панель
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// 🛠 Увеличенный лимит `body` для загрузки изображений
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

// 🔍 Лог запросов (для отладки)
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`, req.body);
    next();
});

// ✅ Обработка preflight-запросов CORS
app.options("*", cors());

// 🚀 Основные маршруты
app.use('/api', appRoutes);

// 🔍 Проверка занятого порта
function isPortInUse(port: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const server = net.createServer()
            .once('error', (err: any) => {
                if (err.code === 'EADDRINUSE') {
                    resolve(true); // Порт занят
                } else {
                    reject(err); // Другая ошибка
                }
            })
            .once('listening', () => {
                server.close();
                resolve(false); // Порт свободен
            })
            .listen(port);
    });
}

// 🔍 Поиск свободного порта
const preferredPorts = [
    Number(process.env.PORT) || 5001,
    5002,
    5003
];

async function choosePort(): Promise<number> {
    for (let port of preferredPorts) {
        try {
            if (!(await isPortInUse(port))) {
                process.env.PORT = String(port); // Сохраняем выбранный порт
                return port;
            }
        } catch (error) {
            console.error(`Ошибка проверки порта ${port}:`, error);
        }
    }
    throw new Error('❌ Все порты заняты!');
}

// 🔗 API Config (генерация URL API)
app.get('/api/config', (req, res) => {
    const API_URL = `${req.protocol}://${req.get('host')}/api`; // Динамический API URL
    res.json({ API_URL });
});

// ❌ Обработка 404 ошибок
app.use((req, res) => {
    res.status(404).json({ message: 'Ресурс не найден' });
});

// 🔥 Обработка серверных ошибок
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('❌ Внутренняя ошибка сервера:', err);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
});

// 🚀 Подключение к MongoDB и запуск сервера
mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('✅ MongoDB подключен');

        // Выбираем порт и запускаем сервер
        const port = await choosePort();
        app.listen(port, () => console.log(`🚀 Сервер работает на http://localhost:${port}`));
    })
    .catch(err => {
        console.error('❌ Ошибка подключения к MongoDB:', err);
        process.exit(1); // Завершаем процесс при ошибке подключения
    });
