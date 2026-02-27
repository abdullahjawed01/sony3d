/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'sony-black': '#050505',
        'sony-dark': '#0A0A0C',
        'sonic-blue': '#0050FF',
        'electric-cyan': '#00D6FF',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-sony': 'linear-gradient(135deg, #0050FF 0%, #00D6FF 100%)',
      },
    },
  },
  plugins: [],
}
