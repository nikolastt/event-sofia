/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-500": "#70963F",
        "text-gray": "#69737A",
      },
      backgroundImage: (theme) => ({
        "logo-back-img": "url('/images/logoGeaan.png')",
      }),
    },
  },
  plugins: [],
};
