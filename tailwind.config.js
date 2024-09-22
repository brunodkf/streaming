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
          before: '#212020A0'
        },
        cinza: {
          escuro: '#41494F',
          claro: '#6D7C83',
          transparente: '#6d7c837c'
        }
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        gotham: ['Gotham', "sans-serif"],
        gothamBold: ['Gotham-Bold', "sans-serif"]
      },
    },
  },
  plugins: [],
}