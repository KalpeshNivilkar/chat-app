/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'whatsapp-green': '#25D366',
        'whatsapp-light-green': '#d1f5d3',
        'message-sent': '#dcf8c6',
        'message-received': '#ffffff',
      },
      animation: {
        'typing': 'typing 1.5s steps(20) infinite',
      },
      keyframes: {
        typing: {
          '0%, 90%, 100%': { backgroundSize: '0% 200%' },
          '50%': { backgroundSize: '100% 200%' },
        },
      },
    },
  },
  plugins: [],
}

