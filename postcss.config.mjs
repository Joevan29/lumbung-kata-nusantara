const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;
// postcss.config.js
module.exports = {
  plugins: {
    // 'tailwindcss': {}, // Hapus jika Tailwind tidak lagi digunakan
    'autoprefixer': {},
  },
};