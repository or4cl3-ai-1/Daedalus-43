/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        daedalus: {
          bg: '#050505',
          accent: '#00f2ff',
          ink: '#e0e0e0',
        }
      }
    },
  },
  plugins: [],
}
