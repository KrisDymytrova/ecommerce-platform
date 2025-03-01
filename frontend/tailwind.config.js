module.exports = {
    content: [
        './client/**/*.{js,jsx,ts,tsx}',  // Путь для клиентской части
        './admin/**/*.{js,jsx,ts,tsx}',  // Путь для админской части
        './node_modules/tailwindcss/**/*.d.ts',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
