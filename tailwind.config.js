/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],

  safelist: [
    {
      pattern: /^bg-(purple|blue|green|red|yellow|pink|indigo|teal|orange|cyan)-(500|600)(\/10)?$/,
      variants: ['hover'],
    },
    {
      pattern: /^text-(purple|blue|green|red|yellow|pink|indigo|teal|orange|cyan)-(500|600)$/,
    },
    {
      pattern: /^border-(purple|blue|green|red|yellow|pink|indigo|teal|orange|cyan)-(500|600)(\/30)?$/,
    },
  ],


}

