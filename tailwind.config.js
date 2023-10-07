/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        '3xl': { min: '1800px' },
      },
    },
    colors: {
      gradientEnd: '#9092FF',
      gradinetInitial: 'rgba(144, 146, 255, 0)',
      borderPrimary: '#D9D9D9',
      charcoalGray: '#0A0A0A',
      dark: {
        primary: '#1F1F1F',
        border: '#242424',
        secondary: '#333',
        placeholder: '#B3B3B3',
        background: '#141414',
        fade: '#636363',
      },
      primary: {
        50: '#DADBFF',
        100: '#C4C5FF',
        200: '#ADAEFF',
        300: '#9092FF',
        400: '#6F72FB',
        500: '#6166F1',
        600: '#494DB6',
        700: '#383A78',
        800: '#272856',
        900: '#232438',
      },

      neutral: {
        50: '#F9F9FB',
        100: '#F3F3F6',
        200: '#E5E5EB',
        300: '#D1D1DB',
        400: '#9C9DAF',
        500: '#6B6C80',
        600: '#4B4C63',
        700: '#373851',
        800: '#1F2037',
        900: '#111227',
      },

      white: '#FFFFFF',

      black: '#000000',

      success: {
        50: '#F2FCF5',
        100: '#CCF2D5',
        200: '#98E4AB',
        300: '#72DA8C',
        400: '#4BD06D',
        500: '#34C759',
        600: '#2EAE4E',
        700: '#217C38',
        800: '#144B21',
        900: '#07190B',
      },

      warning: {
        50: '#FFFBEB',
        100: '#FEF3C7',
        200: '#FDE68A',
        300: '#FCD34D',
        400: '#FCD34D',
        500: '#F59E0B',
        600: '#D97706',
        700: '#B45309',
        800: '#92400E',
        900: '#78350F',
      },

      error: {
        50: '#FEF2F2',
        100: '#FEE2E2',
        200: '#FECACA',
        300: '#FCA5A5',
        400: '#FCA5A5',
        500: '#EF4444',
        600: '#DC2626',
        700: '#B91C1C',
        800: '#991B1B',
        900: '#7F1D1D',
      },
    },
  },
  plugins: [],
};
