const plugin = require('tailwindcss/plugin');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vermelho: {
          claro: '#DB2D28',
          escuro: '#A41715',
          hover: '#40080A'
        },
        preto: {
          escuro: '#070B0D',
          claro: '#242424',
          before: '#212020A0',
          transparente: '#00000062',
          coverTrailer: '#00000021',
        },
        cinza: {
          escuro: '#41494F',
          claro: '#6D7C83',
          transparente: '#6d7c837c'
        }
      },
      screens: {
        'custom-tab': { 'raw': '(max-width: 1100px) and (min-height: 1000px)' },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        gotham: ['Gotham', "sans-serif"],
        gothamBold: ['Gotham-Bold', "sans-serif"]
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.mod-overlay': {
          position: 'relative',
        },

        '.mod-overlay::after': {
          content: '""',
          position: 'absolute',
          display: 'block',
          width: '100%',
          height: '100%',
          background: 'rgb(40,39,39)',
          background: 'radial-gradient(circle, #282727a3 56%, rgba(0, 0, 0, 1) 100%)',
        },




      };
      addUtilities(newUtilities, ['before']);
    }),
  ],
}