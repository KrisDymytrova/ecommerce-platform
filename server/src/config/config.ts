import dotenv from 'dotenv';

dotenv.config();

export const MONGO_URI = process.env.MONGO_URI as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const PORT = parseInt(process.env.PORT as string, 10) || 5001;

const NOVA_POSHTA_API_URL = process.env.NOVA_POSHTA_API_URL;
const API_KEY = process.env.API_KEY;

if (!NOVA_POSHTA_API_URL || !API_KEY) {
    throw new Error('Відсутні змінні оточення для API Нової Пошти.');
}
