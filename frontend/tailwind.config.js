module.exports = {
    content: [
        './client/**/*.{js,jsx,ts,tsx}',  // Путь для клиентской части
        './admin/**/*.{js,jsx,ts,tsx}',  // Путь для админской части
        './node_modules/tailwindcss/**/*.d.ts',
    ],
    safelist: [
        "opacity-0", "opacity-100",
        "bg-green-500", "bg-red-500"
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
