1. Архітектура застосунку

Проєкт буде мати класичну структуру client-server:

* Бекенд: REST API на Node.js (Express) з MongoDB.
* Фронтенд: React-застосунок з Redux Toolkit для управління станом.

2. Структура папок

Бекенд (Node.js, Express, MongoDB)

/server
│── /src
│   │── /config (конфігурації, підключення до БД)
│   │── /controllers (логіка обробки запитів)
│   │── /middlewares (JWT, перевірки доступу)
│   │── /models (Mongoose-схеми)
│   │── /routes (маршрути API)
│   │── /services (бізнес-логіка)
│   │── /utils (допоміжні функції)
│   └── server.ts (основний файл сервера)
│── package.json
│── tsconfig.json
│── .env


Фронтенд (React, Redux Toolkit, Tailwind)

/client
│── /src
│   │── /components (UI-компоненти)
│   │── /pages (Сторінки)
│   │── /features (Redux slices)
│   │── /services (API-запити)
│   │── /hooks (кастомні хуки)
│   │── /utils (допоміжні функції)
│   │── /styles (глобальні стилі Tailwind)
│   └── main.tsx (вхідний файл)
│── package.json
│── tsconfig.json
│── tailwind.config.js