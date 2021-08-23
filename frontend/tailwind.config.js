module.exports = {
  purge: ['./src/**/*.{js,jsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {},
		boxShadow: {
			bird:'0 20px 25px -5px rgba(52, 211, 153, 0.1), 0 10px 10px -5px rgba(52, 211, 153, 0.04)'
		}
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
