module.exports = {
  content: ['./public/index.html','./src/**/*.{js,jsx,ts,tsx,vue,html}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        'microbrew-3d': ['"Microbrew One 3D"', 'sans-serif'],
        'microbrew-inline': ['"Microbrew One Inline"', 'sans-serif'],
        'microbrew-regular': ['"Microbrew One Regular"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
