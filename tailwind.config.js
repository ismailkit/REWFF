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
      colors: {
        'soft-secondary': "var(--soft-secondary)",
        'light': 'var(--text-light)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        success: 'var(--success)',
        danger: 'var(--danger)',
        text: 'var(--text)',
        lighborder: 'var(--light-border)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
