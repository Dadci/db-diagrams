/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
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
  ],


}

