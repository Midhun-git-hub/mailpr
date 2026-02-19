/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                splash: {
                    '0%': { transform: 'scale(0.8)', opacity: '0.5' },
                    '50%': { transform: 'scale(1.4)', opacity: '1' },
                    '100%': { transform: 'scale(1)', opacity: '0' },
                },
                fadeIn: {
                    '0%': { opacity: 0, transform: 'translateY(10px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                }
            },
            animation: {
                splash: 'splash 0.4s ease-out',
                fadeIn: 'fadeIn 0.5s ease-out',
            },
        },
    },
    plugins: [],
}
