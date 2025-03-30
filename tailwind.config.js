module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#3b82f6',
          600: '#2563eb'
        },
        purple: {
          500: '#8b5cf6',
          600: '#7c3aed'
        }
      }
    }
  },
  plugins: [],
}