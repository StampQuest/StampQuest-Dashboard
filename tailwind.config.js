import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        stampquest: {
          extend: 'light',
          colors: {
            default: {
              50: '#f8f8f8',
              100: '#eaeaea',
              200: '#d8d8d8',
              300: '#bababa',
              400: '#aaaaaa',
              500: '#9b9b9b',
              600: '#666666',
              700: '#565656',
              800: '#474747',
              900: '#2d2d2d',
              1000: '#1e1e1e',
              1100: '#101010',
              DEFAULT: '#eaeaea',
            },
            primary: {
              50: '#f0faf5',
              100: '#d3f1e3',
              200: '#ace5ca',
              300: '#63ce9c',
              400: '#3cc083',
              500: '#37af77',
              600: '#24734e',
              700: '#1f6142',
              800: '#195137',
              900: '#103323',
              DEFAULT: '#37af77',
            },
            secondary: {
              50: '#fef9d8',
              100: '#fcec81',
              200: '#f7d705',
              300: '#d5b905',
              400: '#c3aa04',
              500: '#b29b04',
              600: '#756603',
              700: '#635602',
              800: '#524702',
              900: '#342d01',
              DEFAULT: '#d5b905',
            },
          },
        },
      },
    }),
  ],
};
