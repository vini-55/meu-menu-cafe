/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        // AQUI ESTÁ A MÁGICA: O Dourado e o Marrom do Café
        'luna-gold': '#C5A065', 
        'luna-dark': '#1C1917', // Um preto "café" bem profundo
      }
    },
  },
  plugins: [],
}