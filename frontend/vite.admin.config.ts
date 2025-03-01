import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    root: 'admin',
    plugins: [react()],
    server: {
        port: Number(process.env.VITE_PORT) || 3001,
    },
});
