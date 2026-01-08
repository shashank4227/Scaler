/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#2874f0',
                secondary: '#fb641b',
                'gray-text': '#878787',
                'light-gray': '#f1f3f6',
            },
            fontFamily: {
                sans: ['Roboto', 'Arial', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
