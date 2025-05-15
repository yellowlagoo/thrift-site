/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#FFF9EB',
          200: '#FFEDA6',
          300: '#FFE27D',
          400: '#FFD54D',
          500: '#FFCB1F', // Primary yellow
          600: '#E0B010',
          700: '#B08709',
          800: '#805C05',
          900: '#503602',
        },
        secondary: {
          100: '#F0F0F0',
          200: '#E0E0E0',
          300: '#C0C0C0',
          400: '#A0A0A0',
          500: '#808080',
          600: '#606060',
          700: '#404040',
          800: '#202020',
          900: '#101010',
        },
        pastel: {
          blue: '#B8E0F9',
          pink: '#FFCAD4',
          yellow: '#FFECB3',
          mint: '#B8F9D3'
        },
        retro: {
          blue: '#16A4D8',
          purple: '#9A4EAE',
          teal: '#60DBBF',
          grid: '#C7DFFF'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Comic Sans MS"', 'cursive'], // 90s-inspired playful font
      },
      backgroundImage: {
        'plaid-yellow': "repeating-linear-gradient(45deg, #FFCB1F 0px, #FFCB1F 20px, #FFD54D 20px, #FFD54D 40px, #FFE27D 40px, #FFE27D 60px)",
        'digital-grid': "linear-gradient(#C7DFFF 1px, transparent 1px), linear-gradient(90deg, #C7DFFF 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid-pattern': '20px 20px',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
    },
  },
  plugins: [],
}

