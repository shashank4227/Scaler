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
            },
            keyframes: {
                swing: {
                    '0%, 100%': { transform: 'rotate(-5deg)' },
                    '50%': { transform: 'rotate(5deg)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                }
            },
            animation: {
                swing: 'swing 3s ease-in-out infinite',
                'swing-delayed': 'swing 3s ease-in-out infinite 1.5s',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-up': 'slideUp 0.5s ease-out forwards',
            }
        },
    },
    plugins: [],
}
